<script>
  import Star from "./Star.svelte";
  import VidThumb from "./VidThumb.svelte";
  import stars from "../stars.js";

  export let content = {},
    sessions = {},
    mode = "list",
    starred = false;

  const session = sessions[content.session[0]].name;
  const links = Object.entries(content.links)
    .map(([name, href]) => `<a href="${href}">${name}</a>`)
    .join(" | ");

  const videos = (content.videos && Object.entries(content.videos)) || [];
  const images = (content.images && Object.entries(content.images)) || [];
</script>

<article>
  <Star {starred} on:star />

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
    {#if mode !== "list"}
      <div>
        {#each videos as [name, url]}
          <VidThumb {name} {url} on:watch />
        {/each}
        {#if videos.length === 0}
          {#each images as [name, url]}
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

  section,
  aside {
    flex: 1;
  }

  aside {
    border-top: var(--sigchi-article-border);
    height: var(--sigchi-abstract-height);
    overflow: scroll;
  }

  section h3,
  section p {
    text-align: center;
  }

  section h3:first-of-type {
    text-transform: uppercase;
    text-align: left;
  }

  img {
    max-width: var(--sigchi-article-thumbnail-width);
  }
</style>
