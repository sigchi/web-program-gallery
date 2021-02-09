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
        <svg
          aria-label={name}
          xmlns="http://www.w3.org/2000/svg"
          x="0px"
          y="0px"
          viewBox="-600 0 1800 600"
        >
          <polygon fill="#ffffff" points="0,0 0,600 600,300 " />
        </svg>
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

  figure img {
    width: 100%;
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

  figcaption svg {
    width: 35%;
    background-color: #00000088;
    border-radius: 15px;
    padding: 15px;
  }

  figcaption span {
    color: black;
    background-color: #ebebebbb;
  }
</style>
