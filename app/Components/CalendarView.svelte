<script>
  import { Template } from "svelte-native/components";
  import { totalAmount, monthlyBreakdown } from "../Stores/stores.js";
  // import debounce from 'lodash/debounce'
  import EditDay from './EditDay';
  import localStorage from 'nativescript-localstorage';

  import { showModal, closeModal, goBack } from "svelte-native";
  const getDaysInMonth = () => {
    const m = new Date().getMonth();
    const y = new Date().getFullYear();
    return new Date(y, m+1, 0).getDate();
  };
  const dayInMonth = new Date().getDate();
  const allowanceObject = {
    allowance: null,
    deductions: [],
    additions: [],
  };

  let daysInMonth = getDaysInMonth();
  const localBreakdown = localStorage.getItem('breakdown');
  let allowanceDays = [...new Array(daysInMonth)].map(() => {
    return { allowance: parseInt($totalAmount,10) /parseInt(daysInMonth,10), deductions: [], additions:[] };
  });
  localBreakdown ? monthlyBreakdown.set(JSON.parse(localBreakdown)):  monthlyBreakdown.set(allowanceDays)
  console.log(JSON.parse(localBreakdown));
  $: allowances = $monthlyBreakdown;
  let totalDeduction = null;

  const updateAllowancesFromTodays = (arr) => {
    const daysFromToday = arr.splice(dayInMonth);
    const daysUntilToday = arr.splice(0,dayInMonth);
    const sumOfPreviousAllowances = daysUntilToday.map(item => {
            return item.allowance || 0;
    }).reduce((acc,curr) => acc + curr);
    const sumOfFutureAllowances = daysFromToday.map(item => {
        return item.allowance || 0;
}).reduce((acc,curr) => acc + curr);
    const updatedAllowancesFromToday = daysFromToday.map(item => {
        const allowance = (sumOfPreviousAllowances+sumOfFutureAllowances)/daysFromToday.length
        return {...item, allowance }}); 
        const newBreakdown = [...daysUntilToday, ...updatedAllowancesFromToday];  
        // console.log('today', daysUntilToday);
        // console.log('update', updatedAllowancesFromToday);
        // console.log('new', newUpdate); 
return newBreakdown;
}

  const launchModal = async (index) => {
    let day = allowanceDays[index];
    let result = await showModal({page: EditDay,props: {day: day, index:index}});
    monthlyBreakdown.edit(index,result)
    const newBreakdown = updateAllowancesFromTodays(allowances);
    monthlyBreakdown.set(newBreakdown)
    localStorage.setItem('breakdown', JSON.stringify(newBreakdown))
    console.log(localStorage.getItem('breakdown'));
  }
  
  const onItemTap = (event) => {
    if ((event.index + 1) >= dayInMonth) {
      launchModal(event.index);
    }
  };
</script>

<style>

</style>

<page>
  <actionBar title="I Allow It" />
  <dockLayout backgroundColor="yellow">
    <scrollView dock="top" backgroundColor="goldenrod">
      <listView
      height="500"
      on:itemTap={onItemTap}
      items={allowances}
      backgroundColor="blue">
      <Template let:item >
        <label width="300" height='100' backgroundColor="limegreen" text={parseFloat(item.allowance).toFixed(2)}>
          <!-- {#if item.deductions.length} -->
            {#each item.deductions as deduction }
            <span text={`- ${deduction}`}/>
            {/each}
          <!-- {#if item.deductions.length}<span>additions</span>{/if} -->
        </label>
      </Template>
    </listView>
    </scrollView>
    <button dock="bottom" text="Back" on:tap={goBack} />
  </dockLayout>
</page>
