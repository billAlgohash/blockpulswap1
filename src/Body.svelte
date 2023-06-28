<script>
  import RAQ from './Body-mod/read-and-quote.svelte'
  import LAND from './Body-mod/landing_page.svelte'
  import CP from './Body-mod/client_portal.svelte'
  import Login from './Body-mod/login.svelte'

 const load = async ({ locals: { getSession } }) => {
  return {
    session: await getSession(),
  }
}




  let page = 1;

</script>

<h3>{$$props.session}</h3>

<div class="list">
  <p class:active={page === 1} on:click={() => { page = 1; }}>Home</p>
  <p class:active={page === 2} on:click={() => { page = 2; }}>Swap</p>
  <p class:active={page === 3} on:click={() => { page = 3; }}>Portal</p>
  <p class:active={page === 4} on:click={() => { page = 4; }}>Traders</p>
</div>

<h3>{$$props.session}</h3>
{#if page===1 }
  <LAND/>
{:else if page===2 }
  <RAQ/>
{:else if page===3 }
  <CP/>
{:else if page===4 }
  <Login/>
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
    background-color: #242526;
  }

  .list p:hover {
    cursor: pointer;
    filter: drop-shadow(0 0 0.68em #8CFFFBaa);
  }

  .active {
    color: white;
  }
</style>
