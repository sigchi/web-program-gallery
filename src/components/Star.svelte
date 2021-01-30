<script>
  export let starred = false;
</script>

<div on:click class:active={starred}  class="star-box">
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 260 245">
    <path class="star" d="m55,237 74-228 74,228L9,96h240"/>
  </svg>
</div>

