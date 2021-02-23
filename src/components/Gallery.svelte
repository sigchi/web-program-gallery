<script>
  import Article from "./Article.svelte";
  import Typeahead from "./Typeahead.svelte";
  import VidModal from "./VidModal.svelte";
  import { shuffle } from "../util.js";
  import stars from "../stars.js";

  export let program = {
    sessions: {},
    contents: [],
    authors: [],
    tracks: [],
  };

  const filters = ["title", "session", "abstract", "author"];
  const modes = ["list", "compact", "detail"];
  const sessionEntries = Object.entries(program.sessions);

  let starredOnly = false;
  let selectedTracks = [...program.tracks];
  let contentFilter = filters[0];
  let displayMode = modes[1];

  let shownCandidates = undefined;
  let orderedContents = shuffle(program.contents);
  let selectedContents = [];

  let watchId = undefined;

  function sortNow() {
    const now = Date.now();

    orderedContents = [...program.contents].sort((p1, p2) => {
      const [t1, t2] = [p1, p2].map((e) => {
        const end = Math.min(
          ...e.session.map((id) => {
            return program.sessions[id] ? program.sessions[id].end : Infinity;
          })
        );

        if (typeof end === "number") {
          return now > end ? Infinity : end;
        } else {
          return Infinity;
        }
      });

      return t1 - t2 || p1.id - p2.id;
    });
  }

  function getSearchOptions(filter, contents, authors, sessions) {
    switch (filter) {
      case "title":
        return {
          candidates: contents,
          key: "title",
          results(selected) {
            return selected;
          },
        };
      case "abstract":
        return {
          candidates: contents,
          key: "abstract",
          results(selected) {
            return selected;
          },
        };
      case "session":
        return {
          candidates: sessions,
          key: "1.name",
          results(selected) {
            const ids = selected.map((s) => Number(s[0]));
            return contents.filter((c) => ids.includes(c.session[0]));
          },
        };
      case "author":
        return {
          candidates: authors,
          results(selected) {
            return contents.filter((c) =>
              c.authors.some((a) => selected.includes(a))
            );
          },
        };
    }
  }

  $: trackContents = starredOnly
    ? orderedContents.filter(
        (c) => $stars.includes(c.id) && selectedTracks.includes(c.track)
      )
    : orderedContents.filter((c) => selectedTracks.includes(c.track));

  $: searchOpts = getSearchOptions(
    contentFilter,
    trackContents,
    program.authors,
    sessionEntries
  );

  $: selectedContents = shownCandidates || trackContents;
</script>

<form
  on:submit={(e) => {
    e.preventDefault();
  }}
>
  <fieldset>
    <legend>Categories</legend>
    <label>
      <input type="checkbox" bind:checked={starredOnly} />
      Starred
    </label>

    {#each program.tracks as track}
      <label>
        <input type="checkbox" bind:group={selectedTracks} value={track} />
        {track}
      </label>
    {/each}
  </fieldset>

  <fieldset>
    <legend>Filtering</legend>
    <Typeahead bind:selected={shownCandidates} {...searchOpts} />

    {#each filters as flt}
      <label>
        <input type="radio" bind:group={contentFilter} value={flt} />
        {flt}
      </label>
    {/each}
  </fieldset>

  <fieldset>
    <legend>View</legend>
    <button
      on:click={() => {
        orderedContents = shuffle(orderedContents);
      }}>shuffle</button
    >
    <button on:click={sortNow}>ending soon</button>

    {#each modes as md}
      <label>
        <input type="radio" bind:group={displayMode} value={md} />
        {md}
      </label>
    {/each}
  </fieldset>
</form>

<div class="sigchi-gallery-root">
  {#each selectedContents as content (content.id)}
    <Article
      {content}
      mode={displayMode}
      sessions={program.sessions}
      starred={$stars.includes(content.id)}
      on:star={() => stars.toggle(content.id)}
      on:watch={(e) => {
        watchId = e.detail.ytid;
      }}
    />
  {/each}
</div>

{#if watchId}
  <VidModal
    {watchId}
    on:click={() => {
      watchId = undefined;
    }}
  />
{/if}

<style>
  form {
    display: flex;
    flex-direction: row;
  }

  fieldset {
    flex: 1;
  }
</style>
