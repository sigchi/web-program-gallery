<script>
  import Article from './Article.svelte';
  import Typeahead from './Typeahead.svelte';
  import { shuffle } from '../util.js';

  export let program = {
    sessions: {},
    contents: [],
    authors: [],
    tracks: [],
  };

  const filters = ['title', 'session', 'abstract', 'author'];
  const modes = ['list', 'compact', 'detail'];
  const sessionEntries = Object.entries(program.sessions);

  let selectedTracks = [...program.tracks];
  let contentFilter = filters[0];
  let displayMode = modes[1];

  let shownCandidates = [];
  let orderedContents = shuffle(program.contents);
  let selectedContents = [];

  function sortNow() {
    const now = Date.now();

    orderedContents = [...program.contents].sort((p1, p2) => {
      const [t1, t2] = [p1, p2].map(e => {
        const end = Math.min(...e.session.map(id => {
          return program.sessions[id] ? program.sessions[id].end : Infinity;
        }));

        if(typeof(end) === 'number') {
          return now > end ? Infinity : end;
        } else {
          return Infinity;
        }
      });

      return (t1 - t2) || (p1.sequence - p2.sequence);
    });
  }

  function getSearchOptions(filter, contents, authors, sessions) {
    switch(filter) {
      case 'title':
        return {
          candidates: contents,
          key: 'title',
          results(selected) {
            return selected;
          },
        };
      case 'abstract':
        return {
          candidates: contents,
          key: 'abstract',
          results(selected) {
            return selected;
          },
        };
      case 'session':
        return {
          candidates: sessions,
          key: '1.name',
          results(selected) {
            const ids = selected.map((s) => Number(s[0]));
            return contents.filter((c) => ids.includes(c.session[0]));
          }
        };
      case 'author':
        return {
          candidates: authors,
          results(selected) {
            return contents.filter((c) => c.authors.some(a => selected.includes(a)));
          }
        };
    }
  }

  $: trackContents = orderedContents.filter(
    (c) => selectedTracks.includes(c.track)
  );
  $: searchOpts = getSearchOptions(
    contentFilter, trackContents, program.authors, sessionEntries
  );
  $: selectedContents = shownCandidates.length > 0 ? searchOpts.results(shownCandidates) : trackContents;
</script>

<!-- TODO Figure out why this is angry -->
<!-- <Typeahead candidates={searchOpts.candidates} key={searchOpts.key} bind:selected={shownCandidates} /> -->

<button on:click={() => { showAbstract = !showAbstract; }}>abstract</button>
<button on:click={() => { orderedContents = shuffle(orderedContents); }}>shuffle</button>
<button on:click={sortNow}>ending soon</button>

{#each modes as md}
  <label>
    <input type=radio bind:group={displayMode} value={md} />
    {md}
  </label>
{/each}

{#each program.tracks as track}
  <label>
    <input type=checkbox bind:group={selectedTracks} value={track} />
    {track}
  </label>
{/each}

{#each filters as flt}
  <label>
    <input type=radio bind:group={contentFilter} value={flt} />
    {flt}
  </label>
{/each}

<section class="gallery-wall ctn wrap ctr">
  {#each selectedContents as content}
    <Article
      {content}
      mode={displayMode}
      sessions={program.sessions} />
  {/each}
</section>
