<script>
  import Article from './Article.svelte';

  function filterContent(tracks) {
    return (item) => {
      return tracks.includes(item.track);
    }
  }

  export let program = {
    sessions: {},
    contents: [],
    tracks: [],
  };

  let selectedTracks = [...program.tracks];
  let showAbstract = false;

  $: selectedContents = program.contents.filter(filterContent(selectedTracks));
</script>

<button on:click={() => { showAbstract = !showAbstract; }}>Abstract</button>

{#each program.tracks as track}
  <label>
    <input type=checkbox bind:group={selectedTracks} value={track} />
    {track}
  </label>
{/each}

<section class="gallery-wall ctn wrap ctr">
  {#each selectedContents as content}
    <Article {content} {showAbstract} sessions={program.sessions} />
  {/each}
</section>
