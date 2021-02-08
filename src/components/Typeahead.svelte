<script>
  import Fuse from "fuse.js";
  import { getPath } from "../util.js";

  export let placeholder = "Search";
  export let candidates = [];
  export let key = "";
  export let results = (s) => s;
  export let selected = undefined;

  let query = "";
  let shown = undefined;

  const defaultOptions = {
    includeScore: true,
  };

  $: options = { ...defaultOptions, ...(key ? { keys: [key] } : {}) };
  $: fuzzy = new Fuse(candidates, options);

  $: if (query) {
    const searchResults = fuzzy.search(query, options);
    const exact = searchResults.filter((r) => r.score < 0.1).map((r) => r.item);

    shown = searchResults.map((r) => r.item);
    selected = exact.length > 0 ? results(exact) : results(shown);
  } else {
    shown = selected = undefined;
  }
</script>

<input
  type="text"
  aria-label={placeholder}
  {placeholder}
  bind:value={query}
  list="typeahead"
/>
<datalist id="typeahead">
  {#if shown !== undefined}
    {#each shown as it}
      <option value={key ? getPath(it, key) : it} />
    {/each}
  {/if}
</datalist>
