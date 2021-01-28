<script>
  import Article from './Article.svelte';

  export let program = {
    sessions: {},
    contents: [],
    tracks: [],
  };

  let showAbstract = false;
</script>

<button on:click={() => { showAbstract = !showAbstract; }}>Abstract</button>

<section class="gallery-wall ctn wrap">
  {#each program.contents as content}
    <Article {content} {showAbstract} sessions={program.sessions} />
  {/each}
</section>
