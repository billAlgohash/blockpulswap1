<script lang="ts">
  import { currentUser, pb } from './pocketbase';

  let username: string;
  let password: string;
  let isLoading: boolean = false;

  async function login() {
    isLoading = true; // 啟用過渡畫面
    await pb.collection('trader').authWithPassword(username, password);
    isLoading = false; // 關閉過渡畫面
  }

  async function signUp() {
    try {
      isLoading = true; // 啟用過渡畫面
      const data = {
        username,
        password,
        passwordConfirm: password,
        name: 'hi mom!',
      };
      const createdUser = await pb.collection('trader').create(data);
      await login();
      isLoading = false; // 關閉過渡畫面
    } catch (err) {
      console.error(err);
      isLoading = false; // 關閉過渡畫面（若出現錯誤）
    }
  }

  function signOut() {
    pb.authStore.clear();
  }

</script>

<style>
  .center {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    height: 100vh;
  }

  .big-container {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .container {
    margin-bottom: 1em;
    margin-top: 0.5em;
  }

  input {
    text-align: center;
    border-radius: 8px;
    border: 1px solid #8CFFFB;
    padding: 0.6em 1.2em;
    gap: 1em;
    font-size: 1em;
    font-weight: 500;
    font-family: inherit;
    background-color: rgba(140, 255, 251, 0.1);
    cursor: pointer;
    transition: background-color 0.25s;
  }

  input:hover {
    color: #242526;
    background-color: rgba(140, 255, 251, 0.9);
    filter: drop-shadow(0 0 1em #8CFFFBaa);
  }

  input:focus,
  input:focus-visible {
    outline: 4px auto -webkit-focus-ring-color;
  }

  .button {
    margin-left: 1.6em;
  }

  .loading {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100vh;
    background-color: rgba(255, 255, 255, 0.8);
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 999;
  }
</style>

<div class="center">
  {#if isLoading}
    <div class="loading-spinner"></div>
  {:else}
    {#if $currentUser}
      <h3>Signed in as {$currentUser.username}.</h3>
      <p>USDT : {$currentUser.USDT}</p>
      <p>BTC : {$currentUser.BTC}</p>
      <p>ETH : {$currentUser.ETH}</p>
      <button on:click={signOut}>Sign Out</button>
    {:else}
      <div class="big-container">
        <div class="container">
          <form on:submit|preventDefault>
            <input class="container" placeholder="Username" type="text" bind:value={username} />
            <input class="container" placeholder="Password" type="password" bind:value={password} />
            <button class="button" on:click={signUp}>Sign Up</button>
            <button class="button" on:click={login}>Login</button>
          </form>
        </div>
      </div>
    {/if}
  {/if}
</div>
