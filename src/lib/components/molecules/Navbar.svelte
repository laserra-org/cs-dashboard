<script>
  import {
    Icon,
    Button,
    BoxList,
    BoxListItem,
    Spinner,
    Select,
  } from "$lib/components/atoms";
  import { appModules } from "$lib/config.js";
  import { appModuleName, navbarMenu } from "$lib/stores";
  import { onMount } from "svelte";
  import { getDomainList } from "$lib/api/domains";
  import { isAuthenticated } from "$lib/auth";

  let isModuleDropdownOpen = false; // default state (dropdown close)
  let isAccountDropdownOpen = false; // default state (dropdown close)

  const toggleModuleDropdown = () => {
    isModuleDropdownOpen = !isModuleDropdownOpen; // togle state on click
  };

  const toggleAccountDropdown = () => {
    isAccountDropdownOpen = !isAccountDropdownOpen; // togle state on click
  };

  function onWindowClick(e) {
    if (
      document.getElementById("module-dropdown").contains(e.target) == false
    ) {
      isModuleDropdownOpen = false;
    }
    if (
      document.getElementById("account-dropdown").contains(e.target) == false
    ) {
      isAccountDropdownOpen = false;
    }
  }

  let currentPageName = "";

  appModuleName.subscribe((value) => {
    currentPageName = value;
  });

  let currentMenuItems = "";
  let token = isAuthenticated();
  let domains = [];

  navbarMenu.subscribe((value) => {
    currentMenuItems = value;
  });

  export let activeDomain = null;

  function handleDomainChange(event) {
    activeDomain = event.target.value;
    localStorage.setItem("activeDomain", activeDomain);
    location.reload();
    console.log(
      "Domain in localStorage is now: " + localStorage.getItem("activeDomain")
    );
  }

  onMount(async () => {
    const savedDomain = localStorage.getItem("activeDomain");
    if (savedDomain) {
      activeDomain = savedDomain;
    }
      const params = {
        includeDeleted: false
            };
      const response = await getDomainList({token: token}, params);
      const res = await response.json(); // Parse the response data
      domains = res.items;
  });
</script>

<svelte:window on:click={onWindowClick} />

<navbar
    id="navbar"
    class="flex-none h-12 bg-emerald-600 text-neutral-50 overflow-visible z-50"
    >
<div id="navbar-content" class="flex flex-row h-full justify-between px-2">
  <div id="navbar-start" class="flex flex-row items-center gap-4">
    <Button type="ghost" icon
      ><a href="/"><Icon name="home" color="fill-neutral-50" size="32" /></a
      ></Button
    >
    <div id="module-dropdown" class="block relative">
      <Button type="ghost" icon on:click={toggleModuleDropdown}
        ><Icon name="menu" color="fill-neutral-50" size="32" /></Button
      >
      <BoxList expanded={isModuleDropdownOpen}>
        {#each appModules as item (item.id)}
          <BoxListItem href={item.link} on:click={toggleModuleDropdown}
            ><div class="flex gap-4 text-2xl font-normal items-center"><Icon name={item.icon} size=32 color="fill-neutral-700" />{item.label}</div></BoxListItem
          >
        {/each}
      </BoxList>
    </div>
    <div class="text-2xl">
      <a class="font-normal" href={currentPageName.link}>{currentPageName.label}</a>
    </div>
    <div class="flex text-lg place-items-center gap-8 px-6">
      {#each currentMenuItems as item (item.id)}
        <span><a class="font-light" href={item.link}>{item.label}</a></span>
      {/each}
    </div>
  </div>

  <div id="navbar-end" class="flex flex-row items-center gap-4 relative">
    <div>
      {#if domains}
        <Select
          items={domains.map((item) => ({ value: item.id, name: item.label }))}
          bind:value={activeDomain}
          on:change={handleDomainChange}
          placeholder=""
        />
      {:else}
        <Spinner />
      {/if}
    </div>
    <div id="account-dropdown">
      <Button type="ghost" icon on:click={toggleAccountDropdown}
        ><Icon name="account" color="fill-neutral-50" size="32" /></Button
      ><BoxList direction="bottom-left" expanded={isAccountDropdownOpen}>
        <BoxListItem href="/logout" on:click={toggleAccountDropdown}
          >Logout</BoxListItem
        >
      </BoxList>
    </div>
  </div>
</div>
</navbar>
