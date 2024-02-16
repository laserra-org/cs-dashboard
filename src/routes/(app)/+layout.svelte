<script>
    import { Navbar } from "$lib/components/molecules";
  
  </script>
  
  <div id="shell" class="flex flex-none flex-col h-screen w-screen">
    <Navbar />
    <div class="flex h-72 grow row"><slot>App Content</slot></div>
  </div>
  