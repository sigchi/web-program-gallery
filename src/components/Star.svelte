<script>
  import { createEventDispatcher } from "svelte";

  export let starred = false;

  const dispatch = createEventDispatcher();

  function star() {
    dispatch("star", {});
  }
</script>

<label class="star-item">
  <input type="checkbox" bind:checked={starred} on:change={star} />
  <svg
    class="star-img"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 260 245"
    aria-label="Star this item"
  >
    <path class="star" d="m55,237 74-228 74,228L9,96h240" />
  </svg>
</label>

<style>
  .star-item,
  .star-img {
    position: absolute;
    top: 0;
    right: 0;
  }

  .star-item {
    margin: var(--sigchi-star-margin);
    width: var(--sigchi-star-size);
    height: var(--sigchi-star-size);
  }

  .star-item input {
    opacity: 0;
  }

  .star {
    fill: var(--sigchi-star-inactive);
  }

  .star-item input:checked + svg .star {
    fill: var(--sigchi-star-active);
  }
</style>
