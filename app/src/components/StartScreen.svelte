<script lang="ts">
  import { playerName, startCountdown, screen } from "../stores/gameStore";
  import { settings } from "../stores/settingsStore";
  import SettingsScreen from "./SettingsScreen.svelte";
  import HistoryScreen from "./HistoryScreen.svelte";

  interface HistoryRecord {
    duration: number;
    operation: string;
    questionType: string;
    totalCorrect: number;
    name: string;
  }

  let name = "";
  let history: HistoryRecord[] = [];

  $: if ($screen === 'START') {
    try {
      history = JSON.parse(localStorage.getItem('kraepelin_history') || '[]');
    } catch (e) {
      history = [];
    }
  }

  $: topScoreRecord = history
    .filter(r => r.duration === $settings.duration && r.operation === $settings.operation && r.questionType === $settings.questionType)
    .sort((a, b) => b.totalCorrect - a.totalCorrect)[0];

  function handleStart() {
    playerName.set(name.trim() || "Anonim");
    startCountdown();
  }

  /** @param {KeyboardEvent} e */
  function handleKeydown(e: KeyboardEvent) {
    if (e.key === "Enter" && name.trim()) {
      handleStart();
    }
  }

  function openSettings() {
    screen.set("SETTINGS");
  }

  function openHistory() {
    screen.set("HISTORY");
  }

  function goHome() {
    screen.set("START");
  }

  function toggleTheme() {
    $settings.theme = $settings.theme === 'Gelap' ? 'Terang' : 'Gelap';
  }
</script>

<div class="flex flex-col h-full bg-bg overflow-hidden text-primary relative" style="font-family: var(--font-body);">
  
  <!-- Decorative Background Glow (Optimized) -->
  <div class="absolute top-0 left-0 w-full h-96 bg-gradient-to-b from-accent/10 to-transparent pointer-events-none"></div>
  <div class="absolute -top-[20%] -right-[20%] w-[300px] h-[300px] bg-[radial-gradient(circle,var(--color-accent)_0%,transparent_60%)] opacity-15 pointer-events-none"></div>

  <!-- Topbar -->
  <header class="w-full flex justify-between items-center px-6 py-6 max-w-7xl mx-auto shrink-0 relative z-20 pt-[max(env(safe-area-inset-top),1.5rem)]">
    <button type="button" on:click={goHome} class="flex items-center gap-2 cursor-pointer active:scale-95 transition-all outline-none">
      <div class="w-8 h-8 rounded-lg bg-accent text-on-accent flex items-center justify-center font-black text-lg">K</div>
      <div class="text-xl font-bold text-primary tracking-tight">Kraepelin</div>
    </button>
    <div class="flex items-center gap-2">
      {#if $screen === 'START'}
        <button type="button"
          on:click={toggleTheme}
          aria-label="Ganti Tema"
          class="p-2.5 rounded-full bg-surface shadow-sm text-primary active:scale-95 cursor-pointer transition-all duration-200"
        >
          {#if $settings.theme === 'Gelap'}
            <svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>
          {:else}
            <svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>
          {/if}
        </button>
        <button type="button"
          on:click={openSettings}
          aria-label="Pengaturan"
          class="p-2.5 rounded-full bg-surface shadow-sm text-primary active:scale-95 cursor-pointer transition-all duration-200"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="12" cy="12" r="3"></circle>
            <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
          </svg>
        </button>
      {:else}
        <!-- Close (X) button -->
        <button type="button"
          on:click={goHome}
          aria-label="Tutup"
          class="p-2.5 rounded-full bg-surface shadow-sm text-secondary hover:text-primary active:scale-95 cursor-pointer transition-all duration-200"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
      {/if}
    </div>
  </header>

  {#if $screen === 'START'}
    <!-- Main Content -->
    <main class="flex-grow overflow-y-auto flex flex-col items-center justify-center px-6 py-8 relative z-10 w-full max-w-lg mx-auto">
      
      <!-- Hero Text OR Top Score Card -->
      {#if topScoreRecord}
        <div class="w-full bg-surface p-6 rounded-[2rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-border/50 mb-10 flex flex-col items-center justify-center relative overflow-hidden">
          <div class="absolute -top-10 -right-10 w-32 h-32 bg-accent/10 rounded-full blur-2xl pointer-events-none"></div>
          <div class="absolute -bottom-10 -left-10 w-32 h-32 bg-accent/10 rounded-full blur-2xl pointer-events-none"></div>
          
          <div class="relative z-10 text-center">
            <div class="flex items-center justify-center gap-2 mb-2">
              <span class="text-2xl">🏆</span>
              <span class="text-[10px] font-bold text-secondary uppercase tracking-widest" style="font-family: var(--font-display);">Personal Best</span>
            </div>
            <div class="text-[4rem] leading-[0.9] font-black text-primary tracking-tighter mb-2" style="font-family: var(--font-body);">
              {topScoreRecord.totalCorrect}
            </div>
            <div class="text-[10px] text-secondary/80 font-bold uppercase tracking-wider mb-4">
              Oleh <span class="text-accent">{topScoreRecord.name}</span>
            </div>
            
            <button type="button"
              on:click={openHistory}
              class="px-4 py-2 bg-accent/10 hover:bg-accent/20 rounded-xl text-xs font-bold text-accent uppercase tracking-widest active:scale-95 transition-all cursor-pointer shadow-sm border border-accent/20"
            >
              Lihat Riwayat ➔
            </button>
          </div>
        </div>
      {:else}
        <div class="text-center mb-10 w-full">
          <div class="inline-block px-3 py-1 mb-4 rounded-full bg-accent/10 text-accent text-[10px] font-bold uppercase tracking-widest border border-accent/20">Speed Test</div>
          <h1 class="text-4xl sm:text-5xl font-black text-primary mb-4 tracking-tight leading-tight">
            Pertajam Fokus<br>Kognitif Anda.
          </h1>
          <p class="text-base text-secondary max-w-[280px] mx-auto">
            Latih kecepatan dan ketahanan mental dengan metode Kraepelin.
          </p>
        </div>
      {/if}

      <!-- Input Card -->
      <div class="w-full bg-surface p-2 rounded-[2rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-border/50 mb-8">
        <div class="flex flex-col gap-2 relative">
          <div class="absolute left-6 top-[28px] -translate-y-1/2 text-secondary/50 pointer-events-none">
            <svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
          </div>
          <input
            type="text"
            bind:value={name}
            on:keydown={handleKeydown}
            aria-label="Nama Anda"
            placeholder="Masukkan nama Anda..."
            class="w-full pl-14 pr-6 py-4 rounded-[1.5rem] bg-surface-dim/50 border-none text-primary font-bold text-base placeholder:text-secondary/60 focus:outline-none focus:ring-2 focus:ring-accent/20 transition-all"
            autocomplete="off"
            spellcheck="false"
          />
          <button type="button"
            on:click={handleStart}
            class="w-full bg-accent text-on-accent font-black text-base uppercase tracking-wider py-4 rounded-[1.5rem]
                   shadow-[0_8px_20px_rgba(var(--color-accent-rgb),0.25)] hover:shadow-[0_10px_25px_rgba(var(--color-accent-rgb),0.35)] 
                   active:scale-[0.98] transition-all duration-200"
          >
            Mulai Latihan
          </button>
        </div>
      </div>

      <!-- Configuration Overview (Bento style mini) -->
      <div class="w-full flex gap-2">
        <div class="bg-surface/80 backdrop-blur-sm border border-border/50 rounded-2xl p-4 flex-1 flex flex-col items-center justify-center gap-1 shadow-sm">
          <svg class="w-4 h-4 text-accent/70 mb-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
          <div class="text-[9px] font-bold text-secondary uppercase tracking-widest" style="font-family: var(--font-display);">Waktu</div>
          <div class="text-sm font-black text-primary">{$settings.duration}m</div>
        </div>
        <div class="bg-surface/80 backdrop-blur-sm border border-border/50 rounded-2xl p-4 flex-1 flex flex-col items-center justify-center gap-1 shadow-sm">
          <svg class="w-4 h-4 text-accent/70 mb-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="2" width="16" height="20" rx="2"/><line x1="8" y1="10" x2="16" y2="10"/><line x1="12" y1="6" x2="12" y2="14"/></svg>
          <div class="text-[9px] font-bold text-secondary uppercase tracking-widest" style="font-family: var(--font-display);">Operasi</div>
          <div class="text-sm font-black text-primary">{$settings.operation === "Penjumlahan" ? "+" : "-"}</div>
        </div>
        <div class="bg-surface/80 backdrop-blur-sm border border-border/50 rounded-2xl p-4 flex-1 flex flex-col items-center justify-center gap-1 shadow-sm">
          <svg class="w-4 h-4 text-accent/70 mb-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="16 3 21 3 21 8"/><line x1="4" y1="20" x2="21" y2="3"/><polyline points="21 16 21 21 16 21"/><line x1="15" y1="15" x2="21" y2="21"/><line x1="4" y1="4" x2="9" y2="9"/></svg>
          <div class="text-[9px] font-bold text-secondary uppercase tracking-widest" style="font-family: var(--font-display);">Mode</div>
          <div class="text-sm font-black text-primary">{$settings.questionType}</div>
        </div>
      </div>

    </main>

    <footer class="w-full text-center py-6 mt-auto flex flex-col items-center gap-1">
      <span class="text-[10px] font-bold text-secondary/50 uppercase tracking-widest">
        © 2026 Kraepelin Speed
      </span>
      <span class="text-[9px] font-bold text-secondary/30 tracking-widest">
        v1.0.1
      </span>
    </footer>
  {:else if $screen === 'SETTINGS'}
    <SettingsScreen />
  {:else if $screen === 'HISTORY'}
    <HistoryScreen />
  {/if}
</div>
