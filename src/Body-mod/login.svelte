<script>
  import { supabase } from "../lib/supabaseClient";

  let email = '';
  let password = '';
  let loginError = '';
  let loggedIn = false;

  const handleLogin = async () => {
    try {
      const { user, error } = await supabase.auth.signInWithOtp({
        email,
      });

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
</script>

{#if loggedIn}
  <p>登入成功，您已經登入</p>
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
      <!-- <label>
        密碼:
        <input type="password" bind:value={password} required />
      </label> -->
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
