<script>
  import { createEventDispatcher } from 'svelte';

  export let starred = false;

  const dispatch = createEventDispatcher();

  function onStar() {
    dispatch('star', {});
  }
</script>

<label class="star-item">
  <input
    type=checkbox
    bind:checked={starred}
    on:change={onStar} />
  <span class="star">&starf;</span>
</label>

