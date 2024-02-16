<script>
    export let value = '';
</script>

<input {...$$props} bind:value on:input on:change type="date" />