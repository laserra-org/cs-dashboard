<script>
  export let deleted = false;
  let rowClasses = "";

  if (deleted) {
    rowClasses = "bg-neutral-100 text-neutral-400 border-b";
  } else {
    rowClasses = "hover:bg-orange-50 border-b";
  }
</script>

<tr class={rowClasses}><slot /></tr>
