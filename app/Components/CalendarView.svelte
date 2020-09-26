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
  let allowanceDays = [...new Array(daysInMonth)].map(() => {
    return { allowance: parseInt($totalAmount,10) /parseInt(daysInMonth,10), deductions: [], additions:[] };
  });
  monthlyBreakdown.set(allowanceDays)

  let totalDeduction = null;
  
  const launchModal = async (index) => {
    let day = allowanceDays[index];
    let result = await showModal({page: EditDay,props: {day: day, index:index}});
    console.log(result,'result');
    // monthlyBreakdown.edit(index,result)
  }
  
  const onItemTap = (event) => {
    launchModal(event.index);
    
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
      items={$monthlyBreakdown}
      backgroundColor="blue">
      <Template let:item >
        {console.log(parseFloat(item.allowance).toFixed(2),'value')}
        <label width="300" height='100' backgroundColor="limegreen" text={parseFloat(item.allowance).toFixed(2)}>
          <!-- <span text={parseFloat(item.allowance).toFixed(2)} /> -->
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
