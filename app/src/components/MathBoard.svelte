<script lang="ts">
  import { currentPair, lastFeedback } from '../stores/gameStore';
  import { settings } from '../stores/settingsStore';
</script>

<div class="flex-1 flex flex-col items-center justify-center px-6 relative w-full overflow-hidden">
  
  <!-- Subtle background glow on feedback -->
  {#if $lastFeedback === 'wrong'}
    <div class="absolute inset-0 bg-error/10 transition-colors duration-200 pointer-events-none"></div>
  {/if}

  {#if $currentPair}
    <div class="absolute inset-0 flex items-center justify-center pointer-events-none">
      <div class="relative w-full max-w-xs flex items-center justify-center {$lastFeedback === 'wrong' ? 'animate-wrong' : ''}">
          
          {#if $settings.format === 'Vertikal'}
            <!-- Plus/Minus sign -->
            <span class="absolute left-2 top-1/2 -translate-y-1/2 text-[3rem] text-secondary font-black opacity-10 select-none">
              {$settings.operation === 'Penjumlahan' ? '+' : '-'}
            </span>

            <div class="flex flex-col items-center gap-0 w-full relative z-10">
              <!-- Top number (previous / faded) -->
              <span
                class="text-[4rem] font-black text-secondary leading-[0.8] tracking-tighter"
                style="font-family: var(--font-body);"
              >
                {$currentPair.top}
              </span>

              <!-- Divider line -->
              <div class="w-full max-w-[140px] h-2 bg-border my-8 rounded-full"></div>

              <!-- Bottom number (current / active) -->
              <span
                class="text-[5.5rem] font-black leading-[0.8] tracking-tighter drop-shadow-sm
                       {$lastFeedback === 'wrong' ? 'text-error' : 'text-primary'}"
                style="font-family: var(--font-body);"
              >
                {$currentPair.bottom}
              </span>
            </div>
          {:else}
            <!-- Horizontal Format -->
            <div class="flex items-center justify-center gap-5 w-full">
              <span
                class="text-6xl font-black text-secondary leading-none tracking-tighter"
                style="font-family: var(--font-body);"
              >
                {$currentPair.top}
              </span>
              <span class="text-5xl text-secondary font-black opacity-20 select-none">
                {$settings.operation === 'Penjumlahan' ? '+' : '-'}
              </span>
              <span
                class="text-6xl font-black leading-none tracking-tighter drop-shadow-sm {$lastFeedback === 'wrong' ? 'text-error' : 'text-primary'}"
                style="font-family: var(--font-body);"
              >
                {$currentPair.bottom}
              </span>
            </div>
          {/if}
        </div>
      </div>
  {/if}
</div>
