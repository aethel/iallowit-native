<script>
  import { closeModal } from "svelte-native";
  import debounce from "lodash/debounce";

  // export let day;
  export let index;
  export let day;
  let add = false;
  let tempDeduction = null;

  const onAddDeduction = debounce((e) => {
    tempDeduction = !!e.object.text ? parseFloat(e.object.text) : 0;
  }, 2000);

  const onDeduct = () => {
    if(day) {
      day.allowance = +day.allowance - tempDeduction;
      day.deductions.push(+tempDeduction);
      tempDeduction = 0;
    }
  };
  const onCheckedChange = () => {
    add = !add;
    console.log(add);
  };
  const onClose = () => {
      closeModal(day);
  };
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
