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
        <button class="button" on:click={signUp}>Sign Up</button>
        <button class="button" on:click={login}>Login</button>
      </form>
  </div></div>
{/if}
</div>

<style>  

.button{
  margin-left: 1.6em;
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
  filter: drop-shadow(0 0 1em #8CFFFBaa)
}
input:focus,
input:focus-visible {
  outline: 4px auto -webkit-focus-ring-color;
}
  </style>