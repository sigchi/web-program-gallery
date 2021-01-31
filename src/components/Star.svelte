<script>
  import { createEventDispatcher } from 'svelte';

  export let starred = false;

  const dispatch = createEventDispatcher();

  function onStar() {
    dispatch('star', {});
  }
</script>

<div
  on:click={onStar} on:keydown={(ev) => { (ev.keyCode === 13) && onStar(); }}
  class:active={starred}
  class="star-box"
  aria-label="Star this item"
  tabindex="0">
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 260 245" aria-label="Star">
    <path class="star" d="m55,237 74-228 74,228L9,96h240"/>
  </svg>
</div>
