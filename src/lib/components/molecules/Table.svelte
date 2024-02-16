<script>
    import { Spinner } from "$lib/components/atoms";
    export let isLoading = true;
</script>

{#if isLoading}
  <div class="flex h-96 place-items-center justify-center"><Spinner /></div>
{:else}
  <table class="w-full table-auto text-base font-normal"><slot /></table>
{/if}
