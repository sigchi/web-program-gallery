<script>
  export let url = undefined;
  export let name = '';

  const ytid = url && url.split('v=')[1];
  const thumbImg = ytid && `https://img.youtube.com/vi/${ytid}/mqdefault.jpg`;
</script>

{#if thumbImg !== undefined}
  <img class="thumb-img col" alt={name} src={thumbImg} />
{/if}
