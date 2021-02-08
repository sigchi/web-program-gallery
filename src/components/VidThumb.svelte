<script>
  import { createEventDispatcher } from "svelte";

  export let url = undefined;
  export let name = "";

  const ytid = url && url.split("v=")[1];
  const thumbImg = ytid && `https://img.youtube.com/vi/${ytid}/mqdefault.jpg`;
  const dispatch = createEventDispatcher();

  function watch() {
    dispatch("watch", { ytid });
  }
</script>

{#if thumbImg !== undefined}
  <a
    href={url}
    on:click={(e) => {
      e.preventDefault();
      watch();
    }}><img alt={name} src={thumbImg} /></a
  >
{/if}

<style>
  a {
    display: inline-block;
    max-width: var(--sigchi-article-thumbnail-width);
  }
</style>
