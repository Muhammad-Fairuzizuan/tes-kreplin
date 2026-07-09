<script lang="ts">
  import { screen } from './stores/gameStore.ts';
  import StartScreen from './components/StartScreen.svelte';
  import Countdown from './components/Countdown.svelte';
  import TopBar from './components/TopBar.svelte';
  import MathBoard from './components/MathBoard.svelte';
  import CustomNumpad from './components/CustomNumpad.svelte';
  import ResultScreen from './components/ResultScreen.svelte';
  import { settings } from './stores/settingsStore.ts';

  $: {
    if (typeof document !== 'undefined') {
      const isDark = $settings.theme === 'Gelap';
      const isLight = $settings.theme === 'Terang';
      document.documentElement.classList.toggle('dark', isDark);
      document.documentElement.classList.toggle('light', isLight);
    }
  }
</script>

<div class="h-full flex flex-col bg-bg relative overflow-hidden">
  {#if $screen === 'START' || $screen === 'SETTINGS' || $screen === 'HISTORY'}
    <StartScreen />
  {:else if $screen === 'COUNTDOWN'}
    <Countdown />
  {:else if $screen === 'PLAYING'}
    <TopBar />
    <MathBoard />
    <CustomNumpad />
  {:else if $screen === 'RESULT'}
    <ResultScreen />
  {/if}
</div>
