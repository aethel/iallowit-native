<script>
  import { Template } from "svelte-native/components";
  import { totalAmount } from "../Stores/stores.js";
  // import debounce from 'lodash/debounce'
  import { closeModal, goBack } from "svelte-native";
  const getDaysInMonth = () => {
    const m = new Date().getMonth();
    const y = new Date().getFullYear();
    return new Date(y, m, 0).getDate();
  };

  let daysInMonth = getDaysInMonth();
  let allowanceDays = [...new Array(daysInMonth)].map(()=> +$totalAmount / +daysInMonth);
  console.log(allowanceDays);
</script>

<style>

</style>

<page>
  <actionBar title="I Allow It" />
  <dockLayout backgroundColor="yellow">
    <scrollView dock='top' backgroundColor="goldenrod">
      <listView height='500' items={allowanceDays} backgroundColor="blue">
        <Template let:item >
          <label
          width="60"
          backgroundColor="limegreen">
          <span text={parseFloat(item).toFixed(2)} />
        </label>
      </Template>
    </listView>
  </scrollView>
  <button dock='bottom' text="Back" on:tap={goBack} />
</dockLayout>
</page>
