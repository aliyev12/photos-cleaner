<script>
  import Main from "./components/main/mainComponent.svelte";
  // import Sidebar from "./components/sidebar/sidebarComponent.svelte";
</script>

<main>
  <Main />
</main>

<style global lang="postcss">
  /* only apply purgecss on utilities, per Tailwind docs */
  /* purgecss start ignore */
  @tailwind base;
  @tailwind components;
  /* purgecss end ignore */

  @tailwind utilities;
</style>
