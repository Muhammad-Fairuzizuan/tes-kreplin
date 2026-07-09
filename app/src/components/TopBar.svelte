<script>
  import { totalScore, timeLeft, timeProgress, resetGame } from '../stores/gameStore.js';

  // Format mm:ss
  $: minutes = Math.floor($timeLeft / 60);
  $: seconds = $timeLeft % 60;
  $: formattedTime = minutes > 0 
    ? `${minutes}:${seconds.toString().padStart(2, '0')}` 
    : `${seconds}s`;
</script>

<!-- Progress bar at very top (hugging the status bar area) -->
<div class="absolute top-0 left-0 right-0 h-1.5 bg-surface-dim/30 z-50 overflow-hidden">
  <div
    class="w-full h-full bg-accent transition-transform duration-1000 ease-linear origin-left shadow-[0_4px_12px_rgba(var(--color-accent-rgb),0.3)]"
    style="transform: scaleX({$timeProgress})"
  ></div>
</div>

<header class="flex items-center justify-between px-5 pt-[max(env(safe-area-inset-top,1.5rem),1.5rem)] pb-3 bg-bg/70 backdrop-blur-md relative z-40 border-b border-border/20">
  <!-- Back Button -->
  <button 
    on:pointerdown={resetGame}
    class="flex items-center gap-1.5 px-3 py-2 -ml-3 rounded-full hover:bg-surface-dim/50 active:bg-surface-dim transition-colors cursor-pointer group"
    aria-label="Kembali ke beranda"
  >
    <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 text-secondary group-active:text-primary transition-colors" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M15 18l-6-6 6-6" />
    </svg>
    <span class="text-[10px] font-black text-secondary group-active:text-primary tracking-widest uppercase transition-colors" style="font-family: var(--font-body);">
      Kembali
    </span>
  </button>

  <!-- Stats Chips -->
  <div class="flex items-center gap-2">
    <!-- Score chip -->
    <div class="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-border/40 bg-surface shadow-sm text-[13px] font-black tracking-wide" style="font-family: var(--font-display);">
      <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 text-secondary/70" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
        <line x1="18" y1="20" x2="18" y2="10"></line>
        <line x1="12" y1="20" x2="12" y2="4"></line>
        <line x1="6" y1="20" x2="6" y2="14"></line>
      </svg>
      <span class="text-primary">{$totalScore.correct}</span>
    </div>

    <!-- Timer chip -->
    <div class="flex items-center gap-1.5 px-3 py-1.5 rounded-full border shadow-sm text-[13px] font-black tracking-wide {$timeLeft <= 5 ? 'bg-error/10 border-error/30 text-error animate-pulse' : 'bg-surface border-border/40 text-primary'} transition-colors duration-300" style="font-family: var(--font-display);">
      <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 {$timeLeft <= 5 ? 'text-error' : 'text-accent'}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
        <circle cx="12" cy="12" r="10"></circle>
        <polyline points="12 6 12 12 16 14"></polyline>
      </svg>
      <span>{formattedTime}</span>
    </div>
  </div>
</header>
