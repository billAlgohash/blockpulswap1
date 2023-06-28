<script>
  import { currentUser, pb } from './pocketbase';
  let username : string;
  let password : string;
  
</script>

{#if $currentUser}
  <p>Signed in as {$currentUser.username}</p>
{/if}