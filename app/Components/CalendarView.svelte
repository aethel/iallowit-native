<page>
    <actionBar title="I Allow It" />
    <stackLayout>
            <!-- <listView height='150' items="{numberOfSubtractInputs}" on:itemTap={onItemTap} row='1'> 
                <Template let:item> 
                <label>
                    <span text={item} />
                </label>
                <button text="rem" on:tap="{onRemove(item)}" />
                </Template>
            </listView>
            <textField required editable="true" keyboardType={'number'} bind:text="{tempDeduction}" on:textChange={onAddDeduction} hint={'Subtract this'}/>
            <button text="Deduct" isEnabled={!!tempDeduction} on:tap="{onDeduct}" />
        </stackLayout> -->
        <button text="Back" on:tap="{goBack}" />
        <button text="is cal view {daysInMonth} {$totalAmount}" />
</page>

<script>
import { Template } from 'svelte-native/components'
import { totalAmount } from '../Stores/stores.js'
// import debounce from 'lodash/debounce'
import { closeModal, goBack } from 'svelte-native';
const getDaysInMonth = () => {
   const m = new Date().getMonth();
    const y = new Date().getFullYear();
    return new Date(y,m,0).getDate();
  };

    let daysInMonth = getDaysInMonth();
//     let numberOfSubtractInputs = [] 
//     let salary = 0;
//     let tempDeduction = null;

        
 </script>

<style>
   
</style>
