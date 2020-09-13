<script>
  import { Template } from "svelte-native/components";
  import { totalAmount } from "../Stores/stores.js";
  // import debounce from 'lodash/debounce'
  import EditDay from './EditDay';
  import { showModal, closeModal, goBack } from "svelte-native";
  const getDaysInMonth = () => {
    const m = new Date().getMonth();
    const y = new Date().getFullYear();
    return new Date(y, m, 0).getDate();
  };
  const dayInMonth = new Date().getDate();
  const allowanceObject = {
    allowance: null,
    deductions: [],
    additions: [],
  };

  let daysInMonth = getDaysInMonth();
  let allowanceDays = [...new Array(daysInMonth)].map(() => {
    return { allowance: +$totalAmount / +daysInMonth, deductions: [], additions:[] };
  });
  let newAllowance = {...allowanceDays[1], deductions: [1,2,3]};
  let newAllowance1 = {...allowanceDays[1], deductions: [1,3]};
  let newAllowance2 = {...allowanceDays[1], deductions: [2,3]};
  allowanceDays = [newAllowance, ...allowanceDays ]
  allowanceDays = [newAllowance1, ...allowanceDays ]
  allowanceDays = [newAllowance2, ...allowanceDays ]
  let totalDeduction = null;
  console.log(allowanceDays);
  const onItemTap = (event) => {
    console.log("EVENT", event);
    console.log("EVENT", event.index);
    showModal({page: EditDay,pops: {msg:'kaka'}})
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
        items={allowanceDays}
        backgroundColor="blue">
        <Template let:item >
          <label width="300" height='100' backgroundColor="limegreen">
            <span text={parseFloat(item.allowance).toFixed(2)} />
            <!-- {#if item.deductions.length} -->
            {console.log(item.deductions)}
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
