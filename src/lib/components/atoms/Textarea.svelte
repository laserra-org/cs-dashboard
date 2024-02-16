<script>
    export let required = '';
    export let placeholder = 'Enter text';
    export let value;
</script>

<textarea
    {required}
    bind:value
    {...$$props}
    class="block w-full appearance-none border border-neutral-400 leading-tight text-neutral-700 rounded focus:ring-0 focus:outline-none focus:bg-white focus:border-blue-500"
    {placeholder} />
