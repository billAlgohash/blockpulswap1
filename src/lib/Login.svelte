<script>
  import { currentUser, pb } from './pocketbase';
  let username : string;
  let password : string;

  async function login(){
    await pb.collection('trader').authWithPassword(username,password);
  }
  async function signUp(){
    try{
      const data = {
        username,
        password,
        passwordConfirm: password,
      };
      const createdUser = await pb.collection('trader').create(data);
      await login();
    } catch (err) {
      console.error(err)
    }
  }
  function signOut(){
    pb.authStore.clear();
  }

</script>

{#if $currentUser}
  <p>Signed in as {$currentUser.username}</p>
  <button on:click={signOut}>Sign Out</button>
{:else}
  <form>
  <input placeholder="username" type="text" bind:value={username}/>
  <input placeholder="password" type="password" bind:value={password}/>
  <button on:click={signUp}>Sign Up</button>
  <button on:click={login}>Login</button>

  </form>
{/if}