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
            <textField  editable="true"  on:textChange={onSetSalary} keyboardType={'number'} hint={'Value after bills, etc.'}/>
    </stackLayout>
        <stackLayout >
            <label class="info" horizontalAlignment="center" verticalAlignment="center" textWrap="true">
                <span text="Add value before deductions" />
        </label>
            <textField editable="true" keyboardType={'number'} on:textChange={onSetSalary} hint={'Salary'}/>
            <!-- <textField editable="true" keyboardType={'number'} on:textChange={onAddDeduction} hint={'Subtract this'}/> -->
            
            <listView height='150' items="{numberOfSubtractInputs}" on:itemTap={onItemTap} row='1'> 
                <Template let:item> 
                <label>
                    <span text={item} />
                </label>
                <button text="rem" on:tap="{onRemove(item)}" />
                </Template>
            </listView>
            <textField required editable="true" keyboardType={'number'} bind:text="{tempDeduction}" on:textChange={onAddDeduction} hint={'Subtract this'}/>
            <button text="Deduct" isEnabled={!!tempDeduction} on:tap="{onDeduct}" />
        </stackLayout>
        <button text="Start {parseFloat(salary).toFixed(2)}" on:tap="{onSubmit}" />
        </stackLayout>
</page>

<script>
import { Template } from 'svelte-native/components'
import { totalAmount } from './Stores/stores.js'
import debounce from 'lodash/debounce'
import { closeModal } from 'svelte-native';

    let message = "Add your salary"
    let numberOfSubtractInputs = [] 
    let salary = 0;
    let tempDeduction = null;

const onAddDeduction = debounce(e => {
        console.log('e.addded', e.object.text)
        tempDeduction = !!e.object.text ? parseFloat(e.object.text).toFixed(2) : 0;
        console.log(tempDeduction, 'df')
  }, 2000)
        
    const onSetSalary = debounce(e => {
        salary = parseFloat(e.object.text).toFixed(2);
    },2000)

    const onItemTap = (event) => {console.log('event.index')}

    const onDeduct = () => {
        numberOfSubtractInputs = [...numberOfSubtractInputs,tempDeduction]
        salary -= tempDeduction;
        tempDeduction = 0;
    }
    const onRemove = (item) => {
        console.log(item)
        const value = parseFloat(item).toFixed(2);
        // numberOfSubtractInputs.findIndex()
        // console.log('salary,value', salary,value)
        // salary += value;
        // console.log('last salary', salary)
        // const last = numberOfSubtractInputs.pop();
        // console.log('object', object)
        // numberOfSubtractInputs = numberOfSubtractInputs.length > 0 ? [...numberOfSubtractInputs] : [];
    
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
