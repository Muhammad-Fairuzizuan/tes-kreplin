<script lang="ts">
  import { submitAnswer } from '../stores/gameStore.js';
  import { settings } from '../stores/settingsStore.js';

  $: keys = $settings.keyboardLayout === '123' ? [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
    [null, 0, null],
  ] : [
    [7, 8, 9],
    [4, 5, 6],
    [1, 2, 3],
    [null, 0, null],
  ];

  function handlePress(digit: number | null) {
    if (digit === null) return;
    submitAnswer(digit);
  }

  function handleKeydown(e: KeyboardEvent) {
    // Only handle if it's a number key
    if (e.key >= '0' && e.key <= '9') {
      const digit = parseInt(e.key, 10);
      handlePress(digit);
    }
  }
</script>

<svelte:window on:keydown={handleKeydown} />

<div class="numpad-area w-full bg-surface-dim/50 border-t border-border/40 px-5 pt-5 pb-[max(env(safe-area-inset-bottom),2rem)]">
  <div class="grid grid-cols-3 gap-3 w-full max-w-sm mx-auto">
    {#each keys as row}
      {#each row as digit}
        {#if digit !== null}
          <button
            on:pointerdown|preventDefault={() => handlePress(digit)}
            aria-label={`Angka ${digit}`}
            class="numpad-key aspect-[4/3] flex items-center justify-center
                   bg-surface text-primary rounded-[1.25rem] text-[2.5rem] font-black
                   shadow-[0_4px_16px_rgba(0,0,0,0.03)] border border-border/30
                   active:bg-accent active:text-on-accent active:scale-[0.96]
                   transition-all duration-75 select-none cursor-pointer"
            style="font-family: var(--font-display);"
            tabindex="-1"
          >
            {digit}
          </button>
        {:else}
          <div class="pointer-events-none"></div>
        {/if}
      {/each}
    {/each}
  </div>
</div>
