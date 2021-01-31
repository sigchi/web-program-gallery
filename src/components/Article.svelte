<script>
  import Star from './Star.svelte';
  import VidThumb from './VidThumb.svelte';
  import stars from '../stars.js';

  export let content = {}, sessions = {}, mode = 'list';

  const id = content.id;
  const session = sessions[content.session[0]].name;
  const links = Object.entries(content.links)
        .map(([name, href]) => `<a href="${href}">${name}</a>`)
        .join(' | ');

  $: starred = $stars.includes(content.id);
</script>

<article {id} class="col ctn down">
  <Star {starred} on:star={() => { stars.toggle(content.id); }} />

  <!-- Header -->
  <section class="head col">
    <h3>{content.track} #{content.sequence}:</h3>
    <p>{session}</p>
  </section>

  <!-- Authors -->
  <section class="auth col">
    <label for={id}><h3>{content.title}</h3></label>
    <p>{content.authors.join(', ')}</p>
    <p>{content.affiliations.join(' | ')}</p>
  </section>

  <!-- Videos/Images -->
  {#if mode !== 'list' && content.images !== undefined && content.videos !== undefined}
    <section class="imgs col ctn ctr wrap">
      {#each Object.entries(content.videos) as [name, url]}
        <VidThumb {name} {url} />
      {/each}
      {#if Object.keys(content.videos).length === 0}
        {#each Object.entries(content.images) as [name, url]}
          <img class="thumb-img col" alt={name} src={url} />
        {/each}
      {/if}
    </section>
  {/if}

  <!-- Other Links -->
  <section class="links col">
    <p>{@html links}</p>
  </section>

  <!-- Abstract -->
  {#if mode === 'detail'}
    <section id={`${id}-abstract`} class="abstract col">
      <label for={`${id}-abstract`}>Abstract:</label>
      <p>{content.abstract}</p>
    </section>
  {/if}
</article>
