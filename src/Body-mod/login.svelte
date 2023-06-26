<script>
  import { supabase } from "../lib/supabaseClient";
  import { onMount } from "svelte";

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

    let { data: users, error } = await supabase
      .from('users')
      .select('USDT')

    

    if (error) {
      console.error('獲取帳戶數值出錯:', error.message);
    } else {
      console.log(data);
      accountData = JSON.stringify(data);
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
