<script>
  import { supabase } from "../lib/supabaseClient";
  import { onMount } from "svelte";
  import { createSupabaseServerClient } from '@supabase/auth-helpers-sveltekit';

  let email = '';
  let loginError = '';
  let loggedIn = false;
  let accountData;

  const handleLogin = async () => {
    try {
      const { data, error } = await supabase.auth.signInWithOtp({
    email: email,
    options: {
      emailRedirectTo: 'https://blockpulse-swap.vercel.app/',
    },
  })

      if (error) {
        loginError = error.message;
      } else {
        loggedIn = true;
      }
    } catch (error) {
      console.error('登入出錯:', error.message);
      loginError = '登入出錯，請檢查電郵和密碼';
    }
  };

  const fetchAccountData = async () => {
    try {
      const session = await supabase.auth.getSession();
      if (!session) {
        loggedIn = false;
        return;
      }

      const supabaseClient = createSupabaseServerClient({
        supabaseUrl: 'https://amvtkeyfaduowfkbviyl.supabase.co',
        supabaseKey: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFtdnRrZXlmYWR1b3dma2J2aXlsIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODc2MDEzMTUsImV4cCI6MjAwMzE3NzMxNX0.n6XWDgimQY161SzrgcC9nSOzTAhMYHnstACz8nGtOVE',
        session: session,
      });

      const { data: users, error } = await supabaseClient
        .from('users')
        .select('*');

      if (error) {
        console.error('獲取帳戶數值出錯:', error.message);
      } else {
        console.log(users);
        accountData = JSON.stringify(users);
      }
    } catch (error) {
      console.error('獲取帳戶數值出錯:', error.message);
    }
  };


fetchAccountData();




  onMount(() => {
    fetchAccountData();
  });
</script>

{#if loggedIn}
  <p>登入成功，您已經登入</p>
  <h4>帳戶數值結餘:</h4>
  <ul>
    <li>USDT: {accountData}</li>
    <!-- <li>ETH: {accountData.ETH}</li>
    <li>BTC: {accountData.BTC}</li> -->
  </ul>
{:else}
  {#if loginError}
    <p>{loginError}</p>
  {/if}
  <main>
    <h3>會員登入</h3>
    <form on:submit|preventDefault={handleLogin}>
      <label>
        電郵:
        <input type="text" bind:value={email} required />
      </label>
      <button type="submit">登入</button>
    </form>
  </main>
{/if}

<style>
  main {
    text-align: center;
    padding: 20px;
  }

  form {
    display: flex;
    flex-direction: column;
    max-width: 300px;
    margin: 0 auto;
  }

  label {
    margin-bottom: 10px;
  }

  input {
    padding: 5px;
    width: 100%;
  }
</style>
