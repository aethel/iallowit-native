<script>
  import { Template, page } from "svelte-native/components";
  import { totalAmount } from "./Stores/stores.js";
  import debounce from "lodash/debounce";
  import { closeModal } from "svelte-native";
  import { navigate } from "svelte-native";
  import CalendarView from "./Components/CalendarView";
  import localStorage from "nativescript-localstorage";
import { onMount } from "svelte";

  let message = "Add your salary";
  let numberOfSubtractInputs = [];
  let salary = 0;
  let tempDeduction = null;
  let breakdownExists = localStorage.getItem('breakdown');

  const onResume = () => {
      if(breakdownExists) {
        navigate({ page: CalendarView, animated: true });      
      }
    }

    const onClear = () => {
      localStorage.clear();
    }

    
  const onAddDeduction = debounce((e) => {
    tempDeduction = !!e.object.text ? parseFloat(e.object.text) : 0;
  }, 2000);

  const onSetSalary = debounce((e) => {
    salary = parseFloat(e.object.text) || 0;
  }, 2000);

  const onItemTap = (event) => {
    console.log("event.index");
  };

  const onDeduct = () => {
    numberOfSubtractInputs = [...numberOfSubtractInputs, tempDeduction];
    salary -= tempDeduction;
    tempDeduction = 0;
  };
  const onRemove = (item) => {
    console.log(item);
    console.log(numberOfSubtractInputs);
    const newArr = numberOfSubtractInputs.filter((i) => i !== item);
    numberOfSubtractInputs = [...newArr];
    salary = parseFloat(+item + +salary);
    console.log(salary, "new salary");
  };
  function onSubmit() {
    totalAmount.set(salary);
    navigate({ page: CalendarView, animated: true });
  }
</script>

<style>
  .info .fas {
    color: #3a53ff;
  }
  .info {
    font-size: 20;
  }
</style>

<page>
  <actionBar title="I Allow It Latest" />
  <stackLayout>
    <label
      class="info"
      horizontalAlignment="center"
      verticalAlignment="center"
      textWrap="true">
      <span text=" {message}" />
    </label>
    <stackLayout>
      <label
        class="info"
        horizontalAlignment="center"
        verticalAlignment="center"
        textWrap="true">
        <span text="Add value after deductions" />
      </label>
      <textField
        editable="true"
        on:textChange={onSetSalary}
        keyboardType={'number'}
        hint={'Value after bills, etc.'} />
    </stackLayout>
    <stackLayout>
      <label
        class="info"
        horizontalAlignment="center"
        verticalAlignment="center"
        textWrap="true">
        <span text="Add value before deductions" />
      </label>
      <textField
        editable="true"
        keyboardType={'number'}
        on:textChange={onSetSalary}
        hint={'Salary'} />
      <!-- <textField editable="true" keyboardType={'number'} on:textChange={onAddDeduction} hint={'Subtract this'}/> -->

      <listView
        height="100"
        items={numberOfSubtractInputs}
        on:itemTap={onItemTap}
        row="1">
        <Template let:item>
          <label> <span text={item} /> </label>
          <button text="rem" on:tap={onRemove(item)} />
        </Template>
      </listView>
      <textField
        required
        editable="true"
        keyboardType={'number'}
        bind:text={tempDeduction}
        on:textChange={onAddDeduction}
        hint={'Subtract this'} />
      <button text="Deduct" isEnabled={!!tempDeduction} on:tap={onDeduct} />
    </stackLayout>
    <stackLayout>
      <button
      text="Start {salary.toLocaleString('de-DE', {
        style: 'currency',
        currency: 'EUR',
      })}"
      on:tap={() => onSubmit()} />
      <button
      text="Clear"
      disabled={breakdownExists}
      on:tap={() => onClear()} />
      <button
      text="Resume"
      disabled={!breakdownExists}
      on:tap={() => onResume()} />
    </stackLayout>
     

    
  </stackLayout>
</page>
