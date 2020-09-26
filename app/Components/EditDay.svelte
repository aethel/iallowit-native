<script>
  import { closeModal } from "svelte-native";
  import { monthlyBreakdown } from "../Stores/stores.js";
  import debounce from "lodash/debounce";
  import localStorage from "nativescript-localstorage";

  // export let day;
  export let index;
  let add = false;
  let tempDeduction = null;
  let day = $monthlyBreakdown[index] || null;
  const onAddDeduction = debounce((e) => {
    tempDeduction = !!e.object.text ? parseFloat(e.object.text) : 0;
  }, 2000);

  const onDeduct = () => {
    if(day) {
      day.allowance = +day.allowance - tempDeduction;
      day.deductions.push(+tempDeduction);
      // const newMonthlyBreakdown = $monthlyBreakdown.map((x, i) =>
        // i === index ? day : x
      // );
      // console.log(day,'day');
      // monthlyBreakdown.set([]);
      // monthlyBreakdown.set(newMonthlyBreakdown);
      tempDeduction = 0;
    }
  };
  const onCheckedChange = () => {
    add = !add;
    console.log(add);
  };
  const onClose = () => {
    // console.log('index',index);
    // console.log($monthlyBreakdown[index]);
      closeModal(day);
  };
  //     useLocalStorage(count, 'count');
  // let count_value;
  // 	const unsubscribe = count.subscribe(value => {
  // 		count_value = value;
  //         }
  //     );
</script>

<frame id="detail-page-frame">
  <page>
    <stackLayout>
      <switch bind:checked={add} on:checkedChange={onCheckedChange} />
      <label text={parseFloat(day.allowance).toFixed(2)} />
      <textField
        required
        editable="true"
        keyboardType={'number'}
        bind:text={tempDeduction}
        on:textChange={onAddDeduction}
        hint={'Subtract this'} />
      <button text="Deduct" isEnabled={!!tempDeduction} on:tap={onDeduct} />
      <button text="closeg Modal" on:tap={onClose} />
    </stackLayout>
  </page>
</frame>
