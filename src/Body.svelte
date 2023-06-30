<script>
  import { onMount } from 'svelte';
  import RAQ from './Body-mod/read-and-quote.svelte';
  import LAND from './Body-mod/landing_page.svelte';
  import CP from './Body-mod/client_portal.svelte';
  import Login from './lib/Login.svelte';
  

  let page = 1;
  let session = null;

</script>

<div class="list">
  <p class:active={page === 1} on:click={() => { page = 1; }}>首頁</p>
  <!-- <p class:active={page === 2} on:click={() => { page = 2; }}>Swap</p>
  <p class:active={page === 3} on:click={() => { page = 3; }}>Portal</p> -->
  <p class:active={page === 4} on:click={() => { page = 4; }}>會員帳戶系統</p>
</div>


{#if page === 1 }
  <LAND />
<!-- {:else if page === 2 }
  <RAQ /> -->
<!-- {:else if page === 3 }
  <CP /> -->
{:else if page === 4 }
  <Login />
{/if}

<style>
  .list {
    position: fixed;
    top: 68px;
    left: 40px;
    width: 100%;
    gap: 30px;
    z-index: 9999;
    display: flex;
  }

  .list p:hover {
    cursor: pointer;
    filter: drop-shadow(0 0 0.68em #8CFFFBaa);
  }

  .active {
    color: white;
  }
  p{
    font-size: 18px;
  }
</style>
