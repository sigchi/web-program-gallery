<script>
  import { fade, fly } from "svelte/transition";

  export let watchId = undefined;
</script>

<div class="modal-bg" transition:fade on:click>
  <div transition:fly={{ y: -200 }}>
    <iframe
      src="https://www.youtube.com/embed/{watchId}"
      frameborder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowfullscreen
    />
  </div>
</div>

<style>
  .modal-bg {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 999;

    display: flex;
    justify-content: center;
    align-items: center;

    width: 100vw;
    height: 100vh;
    background-color: var(--sigchi-video-bg);
  }

  .modal-bg div {
    width: 50%;
    height: 50%;
    background-color: black;
  }

  iframe {
    width: 100%;
    height: 100%;
  }
</style>
