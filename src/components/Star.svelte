<script>
  import { createEventDispatcher } from "svelte";

  export let starred = false;

  const dispatch = createEventDispatcher();

  function onStar() {
    dispatch("star", {});
  }
</script>

<label class="star-item">
  <input type="checkbox" bind:checked={starred} on:change={onStar} />
  <span class="star">&starf;</span>
</label>

<style>
  .star-item,
  .star {
    position: absolute;
    top: 0;
    right: 0;
  }

  .star-item {
    margin: var(--sigchi-star-margin);
    width: var(--sigchi-star-size);
    height: var(--sigchi-star-size);
  }

  .star {
    opacity: var(--sigchi-star-inactive-opacity);
    color: var(--sigchi-star-inactive);
    font-size: var(--sigchi-star-size);
  }

  .star-item input {
    opacity: 0;
  }

  .star-item input:checked + .star {
    opacity: 1;
    color: var(--sigchi-star-active);
  }
</style>
