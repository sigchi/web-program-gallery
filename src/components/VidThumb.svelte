<script>
  import { createEventDispatcher } from "svelte";

  export let url = undefined;
  export let name = "";

  const ytid = url && url.split("v=")[1];
  const thumbImg = ytid && `https://img.youtube.com/vi/${ytid}/mqdefault.jpg`;
  const dispatch = createEventDispatcher();

  function watch() {
    dispatch("watch", { ytid });
  }
</script>

{#if thumbImg !== undefined}
  <a
    href={url}
    aria-label={name}
    on:click={(e) => {
      e.preventDefault();
      watch();
    }}
  >
    <figure>
      <img alt={name} src={thumbImg} />
      <figcaption>
        <h1>⏵</h1>
        <span>{name}</span>
      </figcaption>
    </figure>
  </a>
{/if}

<style>
  a {
    display: inline-block;
    max-width: var(--sigchi-article-thumbnail-width);
  }

  figure {
    position: relative;
    width: 100%;
    margin: 0;
  }

  figure * {
    margin: 0;
  }

  figcaption {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    position: absolute;

    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }

  figcaption * {
    color: black;
    background-color: #ebebebbb;
  }

  figcaption h1 {
    color: white;
    background-color: #00000088;
    text-align: center;
    width: 45%;
    border-radius: 15px;
  }
</style>
