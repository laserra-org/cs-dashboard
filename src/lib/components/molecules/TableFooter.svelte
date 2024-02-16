<script>
    import { Spinner, Icon, Button } from '$lib/components/atoms';
    export let total = 0;
    export let page = 1;
    export let size = 0;
    export let pages = 1;

    function nextPage() {
        page += 1;
    }

    function previousPage() {
        page -= 1;
    }
</script>

{#if pages > 1 }
<div class="flex w-full h-16 z-50 justify-between place-items-center">
    <div class="tablefooterstart">
        {size} of {total} results
    </div>
    <div class="flex tablefooter-middle place-items-center">
        <span class="inline-flex">

                <Button icon="true" type="ghost" disabled={(page == 1) ? true : false} on:click={previousPage}
                    ><Icon name="chevron-left" /></Button>

                <Button icon="true" type="ghost" disabled={(page == pages) ? true : false} on:click={nextPage}
                    ><Icon name="chevron-right" /></Button>
        </span>
    </div>
    <div class="tablefooter-end">Page {page} of {pages}</div>
</div>
{/if}