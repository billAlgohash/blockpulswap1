<!-- src/routes/profile/+page.svelte -->
<script lang="ts">

  export let data;

  $: ({ supabase, session } = data);

  let loadedData = [];
  async function loadData() {
    const { data } = await supabase.from('users').select('*');
    loadedData = data;
  }

  $: if (session) {
    loadData();
  }
</script>

{#if session}
<p>client-side data fetching with RLS</p>
<pre>{JSON.stringify(loadedData, null, 2)}</pre>
{/if}