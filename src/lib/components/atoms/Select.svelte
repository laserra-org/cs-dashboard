<script>
    export let placeholder = "";
    export let items = [{name:"name", value:"due"}]
    export let value = "";
    export let required;
</script>

<select {...$$props} {required} class="block w-full font-normal appearance-none border border-neutral-400 leading-tight text-neutral-700 rounded focus:ring-0 focus:outline-none focus:bg-white focus:border-blue-500" {items} bind:value {placeholder} on:change>
    {#each items as item}
        <option value={item.value}>{item.name}</option>
    {/each}
</select>
