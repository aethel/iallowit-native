    <script>
        import { closeModal } from 'svelte-native';
        import { totalAmount } from "../Stores/stores.js";

export let day;
console.log(day, 'DAY');
console.log(day.allowance, 'DAY1');
console.log(day.deductions, 'DAY2');
</script>
    <frame id="detail-page-frame">
        <page>
            <label text={parseFloat(day.allowance).toFixed(2)} />
            <button text="closeg Modal" on:tap="{()=> closeModal()}" />
        </page>
    </frame>
