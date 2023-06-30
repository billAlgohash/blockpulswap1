<script lang="ts">
  import { currentUser, pb } from './pocketbase';
  import RAQ from '../Body-mod/read-and-quote.svelte';
  import { fade } from 'svelte/transition';

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

  main{
    margin-top:100px;
  }
  red{
    color: red;
  }
  .center {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    min-height: 300px;
    min-width: 400px;
  }

  .container {
    margin-bottom: 1em;
    margin-top: 0.5em;
    margin-right: 2.5em;
    align-items: center;
    justify-content: center;
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

</style>



<main>
<div class="big-container" in:fade><div class="center">
  {#if isLoading}
    <div class="loading-spinner" in:fade></div>
  {:else}
    {#if $currentUser}
      <div class="center" in:fade>
      <h3>Signed in as {$currentUser.username}.</h3>
      <p>USDT : {$currentUser.USDT}</p>
      <p>BTC : {$currentUser.BTC}</p>
      <p>ETH : {$currentUser.ETH}</p>
      <br><RAQ/>
      <br><button on:click={signOut}><red>Sign Out</red></button><br>
      </div>
    {:else}
        <div class="container" in:fade>
          <form on:submit|preventDefault>
            <input class="container" placeholder="Username" type="text" bind:value={username} />
            <input class="container" placeholder="Password" type="password" bind:value={password} />
            <button class="button" on:click={signUp}>Sign Up</button>
            <button class="button" on:click={login}>Login</button>
          </form>
        </div>
    {/if}
  {/if}
  
</div></div>
</main>
