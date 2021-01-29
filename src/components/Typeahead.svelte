<script>
  import Fuse from 'fuse.js';
  import { getPath } from '../util.js';

  export let candidates = [];
  export let key = '';
  export let selected = [];

  let query = '';

  $: options = key ? { keys: [key] } : {}
  $: fuzzy = new Fuse(candidates, options);
  $: query && (selected = fuzzy.search(query, options).map(r => r.item));
  $: console.log(selected.length);
</script>

<input type=text bind:value={query} list="typeahead" />
<datalist id="typeahead">
  {#each selected as it}
    <option value={key ? getPath(it, key) : it} />
  {/each}
</datalist>

