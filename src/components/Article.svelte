<script>
  import Star from './Star.svelte';

  export let content = {}, sessions = {}, showAbstract = false;

  const id = `${content.track}-${content.sequence}`;
  const session = sessions[content.session[0]].name;
  const links = Object.entries(content.links)
        .map(([name, href]) => `<a href="${href}">${name}</a>`)
        .join(' | ');
</script>

<article {id} class="col ctn down">
  <Star />
  <section class="head col">
    <h3>{content.track} #{content.sequence}:</h3>
    <p>{session}</p>
  </section>
  <section class="auth col">
    <label for={id}><h3>{content.title}</h3></label>
    <p>{content.authors.join(', ')}</p>
    <p>{content.affiliations.join(' | ')}</p>
  </section>
  <section class="links col">
    <p>{@html links}</p>
  </section>
  {#if showAbstract}
    <section id={`${id}-abstract`} class="abstract col">
      <label for={`${id}-abstract`}>Abstract:</label>
      <p>{content.abstract}</p>
    </section>
  {/if}
</article>

<style>
</style>
