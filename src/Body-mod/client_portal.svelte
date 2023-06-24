<script>
  import { onMount } from 'svelte';

  let clientList = [];
  let selectedClient = null;
  let new_UID;
  let new_name;
  let new_HKID;
  let new_BTC;
  let new_ETH;
  let new_USDT;
  

  async function getClientList() {
    try {
      const response = await fetch('https://bpdb616-default-rtdb.asia-southeast1.firebasedatabase.app/client_list.json');
      const data = await response.json();
      clientList = Object.values(data);
    } catch (error) {
      console.error('無法獲取客戶列表：', error);
    }
  }

  async function addClient() {
    try {
      const response = await fetch('https://bpdb616-default-rtdb.asia-southeast1.firebasedatabase.app/client_list.json', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          Name: new_name,
          HKID: new_HKID,
          UID:  new_UID,
          BTC:  new_BTC,
          ETH:  new_ETH,
          USDT: new_USDT,
          Txs: []
        })
      });
      const data = await response.json();
      // 根據回應處理結果，例如重新獲取客戶列表
      getClientList();
    } catch (error) {
      console.error('新增客戶失敗：', error);
    }
  }

  onMount(getClientList);

  // 選擇客戶並顯示詳細資料
  function selectClient(client) {
    selectedClient = client;
  }
</script>





<div class="big-wrapper">

{#if selectedClient}
  <h2>詳細資料</h2>
  <p>姓名：{selectedClient.Name}</p>
  <p>HKID：{selectedClient.HKID}</p>
  <p>UID：{selectedClient.UID}</p>
  <p>BTC：{selectedClient.BTC}</p>
  <p>ETH：{selectedClient.ETH}</p>
  <p>USDT：{selectedClient.USDT}</p>
  <p>Txs：{selectedClient.Txs}</p>
  <button on:click={()=>{selectedClient = null;}}>Back</button>
{:else}
    {#each clientList as client}
      <tr on:click={() => selectClient(client)}>
        <td><button>{client.Name}</button></td>
      </tr>
    {/each}
{/if}
</div>


<style>


</style>