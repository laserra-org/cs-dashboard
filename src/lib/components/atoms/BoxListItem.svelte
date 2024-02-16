<script>
    export let href = "";
</script>

<div
    class="block px-4 py-1 hover:bg-neutral-200 cursor-pointer"
    on:click
    on:keypress
    role="link"
    tabindex="0"
>
    <a {href}><slot /></a>
</div>
