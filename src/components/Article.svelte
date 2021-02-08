<script>
  import Star from "./Star.svelte";
  import VidThumb from "./VidThumb.svelte";
  import stars from "../stars.js";

  export let content = {},
    sessions = {},
    mode = "list";

  const session = sessions[content.session[0]].name;
  const links = Object.entries(content.links)
    .map(([name, href]) => `<a href="${href}">${name}</a>`)
    .join(" | ");

  $: starred = $stars.includes(content.id);
</script>

<article>
  <Star
    {starred}
    on:change={() => {
      stars.toggle(content.id);
    }}
  />

  <section>
    <!-- Header -->
    <h3>{content.track} #{content.sequence}:</h3>
    <p>{session}</p>
    <h3>{content.title}</h3>

    <!-- Authors -->
    <p>{content.authors.join(", ")}</p>
    <p>{content.affiliations.join(" | ")}</p>

    <!-- Other Links -->
    <p>{@html links}</p>

    <!-- Videos/Images -->
    {#if mode !== "list" && content.images !== undefined && content.videos !== undefined}
      <div>
        {#each Object.entries(content.videos) as [name, url]}
          <VidThumb {name} {url} />
        {/each}
        {#if Object.keys(content.videos).length === 0}
          {#each Object.entries(content.images) as [name, url]}
            <img alt={name} src={url} />
          {/each}
        {/if}
      </div>
    {/if}
  </section>

  <!-- Abstract -->
  {#if mode === "detail"}
    <aside>
      <h4>Abstract</h4>
      <p>{content.abstract}</p>
    </aside>
  {/if}
</article>

<style>
  article,
  article div {
    display: flex;
    justify-content: center;
  }

  article div {
    flex-direction: row;
    flex-wrap: wrap;
  }

  article {
    flex: 1 0 auto;
    flex-direction: column;
    position: relative;
    width: var(--sigchi-gallery-col-width);
    margin: var(--sigchi-gallery-gutter);
    padding: var(--sigchi-article-padding);
    border: var(--sigchi-article-border);
  }

  article section,
  article aside {
    flex: 1;
  }

  article aside {
    overflow: scroll;
  }

  article section h3,
  article section p {
    text-align: center;
  }

  article section h3:first-of-type {
    text-transform: uppercase;
    text-align: left;
  }

  article aside {
    border-top: var(--sigchi-article-border);
    height: var(--sigchi-abstract-height);
  }

  :global(article img) {
    max-width: var(--sigchi-article-thumbnail-width);
  }
</style>
