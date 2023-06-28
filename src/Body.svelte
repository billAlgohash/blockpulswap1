<script>
  import { onMount } from 'svelte';
  import { createSupabaseClient } from '@supabase/supabase-js';
  import RAQ from './Body-mod/read-and-quote.svelte';
  import LAND from './Body-mod/landing_page.svelte';
  import CP from './Body-mod/client_portal.svelte';
  import Login from './Body-mod/login.svelte';

  const PUBLIC_SUPABASE_URL = 'https://amvtkeyfaduowfkbviyl.supabase.co';
  const PUBLIC_SUPABASE_ANON_KEY = 'YOUR_ANON_KEY'; // 替換為你自己的 Supabase 匿名金鑰

  let page = 1;
  let session = null;

  const supabase = createSupabaseClient(PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY);

  onMount(() => {
    const { data: initialSession } = supabase.auth.session();
    session = initialSession;

    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_IN') {
        session = session;
      } else if (event === 'SIGNED_OUT') {
        session = null;
      }
    });

    return () => {
      authListener.unsubscribe();
    };
  });
</script>

<div class="list">
  <p class:active={page === 1} on:click={() => { page = 1; }}>Home</p>
  <p class:active={page === 2} on:click={() => { page = 2; }}>Swap</p>
  <p class:active={page === 3} on:click={() => { page = 3; }}>Portal</p>
  <p class:active={page === 4} on:click={() => { page = 4; }}>Traders</p>
</div>
<h3>{session}</h3>
{#if page === 1 }
  <LAND session={session} />
{:else if page === 2 }
  <RAQ session={session} />
{:else if page === 3 }
  <CP session={session} />
{:else if page === 4 }
  <Login session={session} />
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
