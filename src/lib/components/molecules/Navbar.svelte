<script>
  import {
    Icon,
    Button,
    BoxList,
    BoxListItem,
    Spinner,
    Select,
  } from "$lib/components/atoms";

</script>


<navbar
    id="navbar"
    class="flex-none h-12 bg-emerald-600 text-neutral-50 overflow-visible z-50"
    >
<div id="navbar-content" class="flex flex-row h-full justify-between px-2">
  <div id="navbar-start" class="flex flex-row items-center gap-4">
    <div class="text-2xl">
      <a class="font-normal" href="/">CS Dashboard</a>
    </div>
    <div class="flex text-lg place-items-center gap-8 px-6">

          <a class="font-light" href="/">Bookings</a>
          <a class="font-light" href="/">Services</a>
          <a class="font-light" href="/">Resources</a>
          <a class="font-light" href="/">Schedules</a>

    </div>
  </div>

  <div id="navbar-end" class="flex flex-row items-center gap-4 relative">

  </div>
</div>
</navbar>
