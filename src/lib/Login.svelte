<script lang="ts">
  import { currentUser, pb } from './pocketbase';
  import RAQ from '../Body-mod/read-and-quote.svelte';
  import { fade } from 'svelte/transition';

  let log_sign = true;

  let username : string;
  let email    : string;
  let password : string;
  let otp      : int;
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
          "username": username,
          "email": email,
          "emailVisibility": false,
          "password": password,
          "passwordConfirm": password,
      };
      const createdUser = await pb.collection('trader').create(data);
      isLoading = false; // 關閉過渡畫面
      const otpUrl = `otpauth://totp/MyWebsite:${createdUser.username}?secret=${createdUser.otpKey}&issuer=MyWebsite`;
      // 在此处显示 QR Code 和 OTP Key
      showQRCodeAndOTP(otpUrl, createdUser.otpKey);
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

  p {
    margin: 1.4em;
    will-change: filter;
    transition: filter 300ms;
  }
  p:hover {
    color: white;
    filter: drop-shadow(0 0 1em gold);
  }

  h3 {
    color: white;
    will-change: filter;
    transition: filter 300ms;
  }
  h3:hover {
    color: #8CFFFB;
    filter: drop-shadow(0 0 1em gold);
  }

  main{
    margin-top:100px;
    max-width: 100vw;
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
    min-height: 290px;
    min-width: 290px;
  }

  .container {
    margin-bottom: 1em;
    margin-top: 0.5em;
    margin-right: 2.5em;
    align-items: center;
    justify-content: center;
  }
  .con {
    margin: 3%;
    width: 99%;
    border: 1px solid #8CFFFB;
    border-radius: 14px;
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
    margin-left: 2.6em;
  }

</style>



<main>
<div class="big-container" in:fade><div class="center">
  {#if isLoading}
    <div class="loading-spinner" in:fade></div>
  {:else}
    {#if $currentUser}
      <div class="center" in:fade>
      <div class="con"> 
      <h3>貴帳戶 {$currentUser.username} 已登陸</h3>
      <p>USDT : {$currentUser.USDT}</p>
      <p>BTC : {$currentUser.BTC}</p>
      <p>ETH : {$currentUser.ETH}</p>
      </div>
      <br><RAQ/>
      <br><button on:click={signOut}><red>Sign Out</red></button><br>
      </div>
    {:else}

        {#if log_sign == true}



        <h3>會員登陸</h3>
        <div class="container" in:fade>
          <form on:submit|preventDefault>
            <input class="container" placeholder="Username" type="text" bind:value={username} />
            <input class="container" placeholder="Password" type="password" bind:value={password} />
            <input class="container" placeholder="Authenticator OTP" type="password" bind:value={otp} />
            <br>
            <button class="button" on:click={login}> 登入</button>
          </form>
        </div>
        <p on:click={()=>{log_sign = false;}} cursor="pointer">sign up a new account</p>

        {:else}


        <h3>會員登陸</h3>
        <div class="container" in:fade>
          <form on:submit|preventDefault>
            <input class="container" placeholder="Username" type="text" bind:value={username} />
            <input class="container" placeholder="Password" type="password" bind:value={password} />
            <input class="container" placeholder="Email" type="password" bind:value={otp} />
            <br>
            <button class="button" on:click={signUp}>登記</button>
          </form>
        </div>
        <p  on:click={()=>{log_sign = true;}} cursor="pointer">sign in a exist account</p>


      {/if}
    {/if}
  {/if}
  
</div></div>
</main>
