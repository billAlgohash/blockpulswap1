<script>
  import { supabase } from "../lib/supabaseClient";

  let username = '';
  let email = '';
  let password = '';
  let loginError = '';
  let registerError = '';
  let reg = false;
  let reged = false;
  let loggedIn = false;

  const handleLogin = async () => {
    try {
      const { user, error } = await supabase.auth.signIn({
        email,
        password
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

  const handleRegister = async () => {
    // 验证电子邮件地址的格式
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email)) {
      registerError = '電郵地址格式錯誤';
      return;
    }

    try {
      const { user, error } = await supabase.auth.signUp({
        email,
        password
      });

      if (error) {
        registerError = error.message;
      } else {
        reged = true;
        // 创建新用户记录到Supabase的"user"表中
        await supabase.from('users').insert([{ username, email, password }]);
      }
    } catch (error) {
      console.error('註冊錯誤:', error.message);
      registerError = '註冊錯誤';
    }
  };
</script>

{#if reg === false}
  {#if loggedIn}
    <p>登入成功，您已經登入</p>
  {/if}
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
      <label>
        密碼:
        <input type="password" bind:value={password} required />
      </label>
      <button type="submit">登入</button>
    </form>
    <p class="button" on:click={() => { reg = true; }}>註冊帳戶</p>
  </main>
{:else}
  {#if reged}
    <p>註冊成功，請檢查電郵</p>
  {/if}
  <main>
    <h3>會員註冊</h3>
    {#if registerError}
      <p>{registerError}</p>
    {/if}
    <form on:submit|preventDefault={handleRegister}>
      <label>
        用户名:
        <input type="text" bind:value={username} required />
      </label>
      <label>
        電郵:
        <input type="text" bind:value={email} required />
      </label>
      <label>
        密碼:
        <input type="password" bind:value={password} required />
      </label>
      <button type="submit">註冊</button>
    </form>
    <p class="button" on:click={() => { reg = false; }}>登陸帳戶</p>
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

  .button {
    padding: 10px;
    margin-top: 10px;
    cursor: pointer;
  }
</style>
