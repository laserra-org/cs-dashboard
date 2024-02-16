<script>
    export let expanded = false;
    export let direction = "bottom-right";
</script>

<div class="boxlist absolute w-max bg-white rounded text-neutral-700 border border-neutral-400 border-opacity-50 py-2 {direction}" class:expanded this>
    <slot />
</div>

<style>

    .boxlist {
        visibility: hidden;
    }

    .boxlist.expanded {
        visibility: visible;
    }

    .boxlist.bottom-left {
        right: 0px;
    }

</style>