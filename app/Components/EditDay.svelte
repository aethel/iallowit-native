    <script>
        import { closeModal } from 'svelte-native';
    </script>

    <frame id="detail-page-frame">
        <page>
            <label text="Detailhhh Page" />
            <button text="closeg Modal" on:tap="{()=> closeModal()}" />
        </page>
    </frame>
