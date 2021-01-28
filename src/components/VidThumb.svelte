<script>
  export let url = undefined;

  const ytid = url && url.split('v=')[1];
  const thumbImg = ytid && `https://img.youtube.com/vi/${ytid}/mqdefault.jpg`;
</script>

{#if thumbImg !== undefined}
  <img class="thumb-img col" src={thumbImg} />
{/if}
