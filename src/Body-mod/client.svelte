<script>
  import { onMount } from 'svelte';
  import { supabase } from "../lib/supabase";

  let user;
  let balances = {};

  // 在組件掛載後，從 Supabase 加載用戶和帳戶餘額數據
  onMount(async () => {
    const { data, error } = await supabase.auth.user();

    if (error) {
      console.error(error);
      return;
    }

    user = data;

    await loadBalances();
  });

  // 從 "user" 表中加載用戶的帳戶餘額數據
  async function loadBalances() {
    const { data, error } = await supabase
      .from('user')
      .select('USDT, ETH, BTC')
      .eq('id', user.id)
      .single();

    if (error) {
      console.error(error);
      return;
    }

    balances = data;
  }

  // 提交表單，更新用戶的帳戶數值
  async function handleSubmit(event) {
    event.preventDefault();

    const formData = new FormData(event.target);
    const updatedBalances = {
      USDT: formData.get('USDT'),
      ETH: formData.get('ETH'),
      BTC: formData.get('BTC')
    };

    await supabase.from('user').update(updatedBalances).eq('id', user.id);

    await loadBalances();
  }
</script>

<main>
  <h1>歡迎登陸後台</h1>

  {#if user}
    <h2>用戶：{user.email}</h2>

    <form on:submit="{handleSubmit}">
      <label>
        USDT:
        <input type="number" name="USDT" step="0.01" bind:value="{balances.USDT}" />
      </label>
      <br />

      <label>
        ETH:
        <input type="number" name="ETH" step="0.01" bind:value="{balances.ETH}" />
      </label>
      <br />

      <label>
        BTC:
        <input type="number" name="BTC" step="0.000001" bind:value="{balances.BTC}" />
      </label>
      <br />

      <button type="submit">更新帳戶數值</button>
    </form>

    <h3>帳戶餘額：</h3>
    <p>USDT: {balances.USDT}</p>
    <p>ETH: {balances.ETH}</p>
    <p>BTC: {balances.BTC}</p>
  {:else}
    <p>請先登錄</p>
  {/if}
</main>
