<script lang="ts">

  import Header from './Header.svelte'
  import Body from './Body.svelte'
  import { supabase } from './lib/supabaseClient.js'
  // import { Auth } from '@supabase/auth-ui-react'

  // const App = () => <Auth supabaseClient={supabase} />

</script>


<main>

  <Body/><Header/>

</main>


<style>

</style>
