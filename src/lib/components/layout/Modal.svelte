<script>
    import { Icon } from '$lib/components/atoms';
    export let modalContent;

</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-static-element-interactions -->
<div
    class="modal absolute flex top-0 left-0 flex flex-col justify-center items-center w-screen h-screen bg-black bg-opacity-60 z-50">
    <div class="m-24 px-8 py-4 w-fit bg-white rounded shadow-lg overflow-auto">
        <svelte:component this={modalContent} on:click />
    </div>
</div>
