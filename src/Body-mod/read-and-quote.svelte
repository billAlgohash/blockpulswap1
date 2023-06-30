<script>
  import { onMount } from 'svelte';

  let act =  ['買入', '賣出'];
  let fiat = ['HKD', 'USD', 'JPY', 'KRW'];
  let crypto = ['BTC', 'ETH', 'USDT'];

  let actOption = act[0];  
  let fiatOption = fiat[0];
  let cryptoOption = crypto[0];
  let inputValue = '';
  let outputValue = '';
  let sys = 0; 
  let loading = false;

  let showNewContainer = false;
  let countdown = 30; 
  let countdownInterval;

  function startCountdown() {
    countdown = 30;
    if (countdownInterval) {
      clearInterval(countdownInterval);
    }
    countdownInterval = setInterval(() => {
      countdown--;
      if (countdown < 0) {
        clearInterval(countdownInterval);
        showNewContainer = false;
        countdown = 0;  
      }
    }, 1000);
  }

  async function fetchData() {
    if (!inputValue) {
      return;
    }

    loading = true; 

    const response = await fetch('https://hook.us1.make.com/qjqhcgfau9aqj1vaevr2k7e013chp2lu', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        fiatOption: fiatOption.toLowerCase(),
        coinType: cryptoOption.toLowerCase(),
        tradeSide: actOption.toLowerCase(),
        amount: parseFloat(inputValue)
      }),
    });

    const data = await response.json();
    if (data.retCode === 0) {
      sys = parseFloat(data.result).toLocaleString('en-US', { minimumFractionDigits: 3 }); 
      createNewContainer(); 
    }

    loading = false; 
  }

  function createNewContainer() {
    if (actOption && fiatOption && cryptoOption && inputValue) {
      startCountdown();
      showNewContainer = true;
    }
  }

  async function executeOrder() {
    if (countdown > 0 && inputValue) { 
      const response = await fetch('https://hook.us1.make.com/vwakksy3vr2o2suvmu7nw30sc8kavwu1', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          fiatOption: fiatOption.toLowerCase(),
          coinType: cryptoOption.toLowerCase(),
          tradeSide: actOption.toLowerCase(),
          amount: parseFloat(inputValue)
        }),
      });
      const data = await response.json();
    }
  }

  onMount(fetchData);
</script>




<style>

.content {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.select {
  flex: 1;
  max-width: 300px;
  height: 1.6em;
  padding: 0.1em;
  text-align: center;
}

.select select {
  width: 100%;
  height: 100%;
  padding: 4px;
  background-color: rgba(140, 255, 251, 0.1);
  border-radius: 4px;
  border: 1px solid #444444;
  color: white;
  transition: background-color 0.25s;
  text-align: center;
}
select:hover {
  font-weight: bold;
  color: #242526;
  background-color: rgba(140, 255, 251, 0.9);
  filter: drop-shadow(0 0 1em #8CFFFBaa)
}
.input {
  flex: 1;
  width: 39px;
  height: 1.6em;
  background-color: rgba(140, 255, 251, 0.1);
  border-radius: 4px;
  border: 1px solid #444444;
  color: white;
  text-align: center;
  transition: background-color 0.25s;
}
input:hover {
  font-weight: bold;
  color: #242526;
  background-color: rgba(140, 255, 251, 0.9);
  filter: drop-shadow(0 0 1em #8CFFFBaa)
}
.grey {
  color: #444444;
}
.white {
  color: #ffffff;
  filter: drop-shadow(0 0 1em #ffffffaa)
}
.big-container {
  right: 3%;
  width: 94%;
  border: 1px solid #8CFFFB;
  border-radius: 14px;
}

button{
  margin-bottom: 1em;
}


@keyframes fade {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

/* 進度條 */
.progress-bar {
  width: 100%;
  border-radius: 4px;
  overflow: hidden;
}

.progress-bar-inner {
  height: 6px;
  background-color: #8CFFFB;
  transition: width 1s linear;
  filter: drop-shadow(0 0 1em #8CFFFBaa)
}
</style>

<div class="container-wrapper">
  {#if loading}
    <div class="loading-spinner"></div>
  {:else}
    <div class="big-container">
      <div class="container">
        <div class="select">
          <select bind:value={actOption} disabled={showNewContainer}>
            {#each act as option}
              <option value={option}>{option}</option>
            {/each}
          </select>
        </div>
        <input class="input" type="number" bind:value={inputValue} disabled={showNewContainer}/>
        <div class="select">
          <select bind:value={cryptoOption} disabled={showNewContainer}> 
            {#each crypto as option}
              <option value={option}>{option}</option>
            {/each}
          </select>
        </div>
      </div>
      <div class="container">
      {#if actOption === '買入'}
        <p class="white">使用</p>
      {:else}
        <p class="white">獲得</p>
      {/if}
        <div class="select">
          <select bind:value={fiatOption} disabled={showNewContainer}> 
            {#each fiat as option}
              <option value={option}>{option}</option>
            {/each}
          </select>
        </div>

      </div>
      {#if showNewContainer}
      <div class="content">
        <div class="progress-bar">
          <div class="progress-bar-inner" style="width: {countdown*3}%;"/>
          <p> 此報價尚餘：{countdown} 秒</p>
          {#if actOption === '買入'}
            <p style="margin: 30px 33px;">使用 ${sys} {fiatOption}</p>
            <h4 class="white" style="margin: 30px 33px;">{actOption} {inputValue} 個 {cryptoOption}</h4>
          {:else}
            <p style="margin: 30px 33px;">{actOption} {inputValue} 個 {cryptoOption}</p>
            <h4 class="white" style="margin: 30px 33px;">獲得 ${sys} {fiatOption}</h4>
          {/if}
          <button  style="margin: 15px 33px;" class="execute-button" on:click={() => {showNewContainer = false;}}>取消</button>
          <button style="margin: 15px 33px;" class="execute-button" on:click={() => {executeOrder(); createNewContainer();}}>執行</button>
          <div style="display: flex; justify-content: space-between; width: 100%;">
          </div>
        </div>
      </div>

      {:else}
        <button on:click={fetchData}>報價</button>
      {/if}
    </div><br>
  {/if} 
</div>


