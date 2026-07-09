<script lang="ts">
  import { totalScore, playerName, resetGame } from '../stores/gameStore.ts';
  import { settings } from '../stores/settingsStore.ts';

  $: total = $totalScore;
  $: accuracy = total.correct + total.wrong > 0
    ? ((total.correct / (total.correct + total.wrong)) * 100).toFixed(1)
    : '0.0';
</script>

<div class="flex flex-col h-full bg-bg overflow-y-auto overflow-x-hidden px-5 pt-6 pb-[max(env(safe-area-inset-bottom),2.5rem)] relative z-10">
  <!-- Header -->
  <div class="text-center mb-8 shrink-0">
    <div class="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-accent mb-4">
      <svg xmlns="http://www.w3.org/2000/svg" class="w-7 h-7 text-on-accent" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
        <path d="M5 12l5 5L20 7"></path>
      </svg>
    </div>
    <h2 class="text-3xl font-black text-primary uppercase tracking-tight" style="font-family: var(--font-body);">Latihan Selesai</h2>
    <p class="text-sm font-bold text-secondary mt-1 tracking-widest uppercase">Skor <span class="text-accent">{$playerName}</span></p>
  </div>

  <!-- Hero Card: Agregat -->
  <div class="bg-accent rounded-[2rem] p-8 text-center text-on-accent mb-4 relative overflow-hidden shadow-[0_12px_40px_rgba(var(--color-accent-rgb),0.3)] shrink-0">
    <!-- Dekorasi background -->
    <div class="absolute -top-10 -right-10 w-32 h-32 bg-white/20 rounded-full blur-2xl"></div>
    <div class="absolute -bottom-10 -left-10 w-32 h-32 bg-black/10 rounded-full blur-2xl"></div>
    
    <div class="relative z-10">
      <div class="text-[11px] font-bold uppercase tracking-widest opacity-90 mb-2" style="font-family: var(--font-display);">Total Jawaban (Agregat)</div>
      <div class="text-[6rem] leading-none font-black tracking-tighter drop-shadow-sm pb-1" style="font-family: var(--font-body);">
        {total.correct + total.wrong}
      </div>
    </div>
  </div>

  <!-- Bento Grid 2x2 -->
  <div class="grid grid-cols-2 gap-3 mb-8">
    
    <!-- Akurasi -->
    <div class="bg-surface border border-border rounded-3xl p-5 flex flex-col justify-between shadow-sm">
      <div class="flex items-center justify-between mb-4">
        <div class="text-[10px] font-bold text-secondary uppercase tracking-widest" style="font-family: var(--font-display);">Akurasi</div>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="w-4 h-4 text-primary opacity-30"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>
      </div>
      <div class="text-4xl font-black text-primary" style="font-family: var(--font-display);">{accuracy}%</div>
    </div>

    <!-- Waktu -->
    <div class="bg-surface border border-border rounded-3xl p-5 flex flex-col justify-between shadow-sm">
      <div class="flex items-center justify-between mb-4">
        <div class="text-[10px] font-bold text-secondary uppercase tracking-widest" style="font-family: var(--font-display);">Waktu</div>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="w-4 h-4 text-primary opacity-30"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
      </div>
      <div class="text-4xl font-black text-primary" style="font-family: var(--font-display);">
        {$settings.duration}<span class="text-base font-bold text-secondary ml-1">m</span>
      </div>
    </div>

    <!-- Benar -->
    <div class="bg-surface border border-success/20 rounded-3xl p-5 flex flex-col justify-between relative overflow-hidden shadow-sm">
      <div class="absolute -right-4 -bottom-4 w-20 h-20 bg-success/10 rounded-full blur-2xl"></div>
      <div class="text-[10px] font-bold text-success uppercase tracking-widest mb-4" style="font-family: var(--font-display);">Benar</div>
      <div class="text-4xl font-black text-success relative z-10" style="font-family: var(--font-display);">{total.correct}</div>
    </div>

    <!-- Salah -->
    <div class="bg-surface border border-error/20 rounded-3xl p-5 flex flex-col justify-between relative overflow-hidden shadow-sm">
      <div class="absolute -right-4 -bottom-4 w-20 h-20 bg-error/10 rounded-full blur-2xl"></div>
      <div class="text-[10px] font-bold text-error uppercase tracking-widest mb-4" style="font-family: var(--font-display);">Salah</div>
      <div class="text-4xl font-black text-error relative z-10" style="font-family: var(--font-display);">{total.wrong}</div>
    </div>

  </div>

  <div class="mt-auto">
    <!-- Reset Button -->
    <button
      on:pointerdown={resetGame}
      class="w-full py-4 rounded-xl bg-accent text-on-accent font-black text-lg uppercase tracking-wide
             shadow-[0_8px_24px_rgba(30,41,59,0.25)] hover:shadow-[0_12px_32px_rgba(30,41,59,0.35)] hover:scale-[1.02]
             active:scale-[0.98] active:shadow-none transition-all duration-200 numpad-area"
      style="font-family: var(--font-body);"
    >
      Latihan Lagi
    </button>
  </div>
</div>
