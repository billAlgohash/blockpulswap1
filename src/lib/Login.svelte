<script lang="ts">
  import { currentUser, pb } from './pocketbase';

  let username: string;
  let password: string;

  async function login() {
    await pb.collection('trader').authWithPassword(username, password);
  }

  async function signUp() {
    try {
      const data = {
        username,
        password,
        passwordConfirm: password,
        name: 'hi mom!',
      };
      const createdUser = await pb.collection('trader').create(data);
      await login();
    } catch (err) {
      console.error(err)
    }
  }

  function signOut() {
    pb.authStore.clear();
  }

</script>


<div class="center">
{#if $currentUser}
    <h3>Signed in as {$currentUser.username}.</h3>
    <p>USDT : {$currentUser.USDT}</p>
    <p>BTC : {$currentUser.BTC}</p>
    <p>ETH : {$currentUser.ETH}</p>
    <button on:click={signOut}>Sign Out</button>
{:else}
  <div class="big-container"><div class="container">
      <form on:submit|preventDefault>
        <input class="container"
          placeholder="Username"
          type="text"
          bind:value={username}
        />

        <input class="container"
          placeholder="Password" 
          type="password" 
          bind:value={password} 
        />
        <button on:click={signUp}>Sign Up</button>
        <button on:click={login}>Login</button>
      </form>
  </div></div>
{/if}
</div>

<style>  
.center {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  height: 100vh;
}

/* 設定元素間距 */
.container {
  margin-bottom: 1em;
  margin-top: 0.5em;
}
  </style>