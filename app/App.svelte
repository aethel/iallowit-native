<page>
    <actionBar title="I Allow It" />
    <stackLayout>
        <label class="info" horizontalAlignment="center" verticalAlignment="center" textWrap="true">
                <span text=" {message}" />
        </label>
        <stackLayout>
            <label  class="info" horizontalAlignment="center" verticalAlignment="center" textWrap="true">
                <span text="Add value after deductions" />
        </label>
            <textField  editable="true"  bind:text={salary} keyboardType={'number'} hint={'Value after bills, etc.'}/>
    </stackLayout>
        <stackLayout >
            <label class="info" horizontalAlignment="center" verticalAlignment="center" textWrap="true">
                <span text="Add value before deductions" />
        </label>
            <textField editable="true" keyboardType={'number'} bind:value={salary} hint={'Salary'}/>
            <textField editable="true" keyboardType={'number'} on:textChange={onInputChangeDebounced} hint={'Subtract this'}/>
            {#if !!numberOfSubtractInputs.length}
            <listView height='150' items={numberOfSubtractInputs} row='1'>
                <Template let:item>
                    <textField editable="true" keyboardType={'number'} on:textChange={onInputChangeDebounced} hint={'Subtract this'}/>
                    <button text="rem" on:tap="{onRemoveAnother}" />
                </Template>
            </listView>
            {/if}
            <button text="Another" on:tap="{onAddAnother}" />
        </stackLayout>
        <button text="Start {salary}" on:tap="{onSubmit}" />
        </stackLayout>
</page>

<script>
import { Template } from 'svelte-native/components'
import { totalAmount } from './Stores/stores.js'
import debounce from 'lodash/debounce'

    let message = "Add your salary"
    let numberOfSubtractInputs = [] 
    let salary = 0;
let dupa = 0;
    function onInputChange(e) { 
        console.log('e.target.value', e.target)
    }
    console.log('dupa', dupa)
    const onInputChangeDebounced = debounce(e => {
        console.log('e.targeerrt.value', e.object.text)
  }, 3000)
    
    function onAddAnother(){
        numberOfSubtractInputs = [...numberOfSubtractInputs,'x']
    }
    function onRemoveAnother(){
        numberOfSubtractInputs.pop();

        numberOfSubtractInputs = numberOfSubtractInputs.length > 0 ? [...numberOfSubtractInputs] : [];
    
    }
    function onTemplateSelect(item,index,items){
        console.log('item', item)
        console.log('index', index)
    }
    function onSubmit() {
        totalAmount.set(salary)
        console.log('totalAmoddunt', $totalAmount)
    }
</script>

<style>
    .info .fas {
        color: #3A53FF;
    }
    .info {
        font-size: 20;
    }
</style>
