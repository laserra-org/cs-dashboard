<div class="flex flex-col grow">
    <header
      id="page-header"
      class="flex flex-row h-16 bg-neutral-50 text-neutral-700 px-16 text-4xl z-40 font-medium shadow-md justify-between items-center"
    >
      <slot name="header">Page Title</slot>
    </header>
  <div class="flex flex-1 flex-row overflow-auto">
    {#if $$slots.sidebarLeft}
      <aside
        id="sidebar-left"
        class="flex-none w-96 p-6 bg-neutral-50 text-neutral-700 z-20 shadow-lg overflow-auto"
      >
        <slot name="sidebarLeft">Left Sidebar</slot>
      </aside>
      {/if}
    <main
      id="main-content"
      class="w-96 grow bg-neutral-100 text-neutral-700 z-0 overflow-auto"
    >
      <div class="flex flex-col place-items-center py-8">
        <slot name="main" />
      </div>
    </main>
    {#if $$slots.sidebarRight}
      <aside
        id="sidebar-right"
        class="flex-none w-96 bg-neutral-50 text-neutral-700 z-20 shadow-lg p-6 overflow-auto"
      >
        <slot name="sidebarRight"></slot>
      </aside>
      {/if}
  </div>
</div>