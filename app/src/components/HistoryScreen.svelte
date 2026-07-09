<script lang="ts">

  import { onMount } from 'svelte';
  
  /** @type {any[]} */
  let history = [];
  
  onMount(() => {
    try {
      history = JSON.parse(localStorage.getItem('kraepelin_history') || '[]');
      // Sort history from newest to oldest
      history.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    } catch (e) {
      history = [];
    }
  });


  function clearHistory() {
    if (confirm('Apakah Anda yakin ingin menghapus semua riwayat tes?')) {
      localStorage.removeItem('kraepelin_history');
      history = [];
    }
  }

  /**
   * @param {string} isoString
   */
  function formatDate(isoString) {
    const date = new Date(isoString);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    const hours = date.getHours().toString().padStart(2, '0');
    const mins = date.getMinutes().toString().padStart(2, '0');
    return `${day}/${month}/${year} ${hours}:${mins}`;
  }

  /**
   * @param {{totalCorrect: number, totalWrong: number}} record
   */
  function getAccuracy(record) {
    const total = record.totalCorrect + record.totalWrong;
    if (total === 0) return '0.0';
    return ((record.totalCorrect / total) * 100).toFixed(1);
  }
</script>

<div class="flex-grow flex flex-col overflow-y-auto w-full relative z-10 text-primary">
  <!-- Content -->
  <main class="flex-grow overflow-y-auto px-5 py-6">
    {#if history.length === 0}
      <!-- Empty State -->
      <div class="flex flex-col items-center justify-center h-full text-center opacity-50 space-y-4">
        <div class="w-20 h-20 rounded-full bg-surface-dim flex items-center justify-center mb-2">
          <svg xmlns="http://www.w3.org/2000/svg" class="w-10 h-10 text-secondary" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
            <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
            <line x1="16" y1="2" x2="16" y2="6"></line>
            <line x1="8" y1="2" x2="8" y2="6"></line>
            <line x1="3" y1="10" x2="21" y2="10"></line>
          </svg>
        </div>
        <p class="text-sm font-bold tracking-wide text-secondary" style="font-family: var(--font-body);">Belum ada riwayat tes.</p>
        <p class="text-xs text-secondary/70">Mainkan satu sesi untuk melihat hasilnya di sini.</p>
      </div>
    {:else}
      <!-- Header Area (Title & Clear) -->
      <div class="flex justify-between items-end mb-6">
        <h2 class="text-xl font-black tracking-tight" style="font-family: var(--font-body);">Riwayat Tes</h2>
        <button
          on:pointerdown={clearHistory}
          class="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-error/10 text-error hover:bg-error/20 active:scale-95 transition-all"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="3 6 5 6 21 6"></polyline>
            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
          </svg>
          <span class="text-[10px] font-bold uppercase tracking-wider">Hapus</span>
        </button>
      </div>

      <!-- History List -->
      <div class="flex flex-col gap-4 pb-12">
        {#each history as record (record.date)}
          <div class="bg-surface rounded-2xl p-5 border border-border/50 shadow-sm flex flex-col gap-4 relative overflow-hidden">
            <!-- Header Card -->
            <div class="flex justify-between items-start">
              <div>
                <h3 class="text-base font-black text-primary truncate max-w-[150px]" style="font-family: var(--font-body);">
                  {record.name}
                </h3>
                <p class="text-[10px] font-bold text-secondary tracking-widest mt-0.5" style="font-family: var(--font-display);">
                  {formatDate(record.date)}
                </p>
              </div>
              
              <!-- Total Badge -->
              <div class="bg-accent/10 px-3 py-1.5 rounded-xl border border-accent/20 flex flex-col items-end">
                <span class="text-[9px] font-bold text-accent uppercase tracking-widest leading-none mb-1">Total Jawab</span>
                <span class="text-lg font-black text-accent leading-none" style="font-family: var(--font-display);">
                  {record.totalCorrect + record.totalWrong}
                </span>
              </div>
            </div>

            <!-- Stats Grid -->
            <div class="grid grid-cols-3 gap-2 pt-3 border-t border-border/30">
              <div class="flex flex-col">
                <span class="text-[9px] font-bold text-secondary uppercase tracking-widest mb-1">Akurasi</span>
                <span class="text-base font-black text-primary" style="font-family: var(--font-display);">{getAccuracy(record)}%</span>
              </div>
              <div class="flex flex-col">
                <span class="text-[9px] font-bold text-success uppercase tracking-widest mb-1">Benar</span>
                <span class="text-base font-black text-success" style="font-family: var(--font-display);">{record.totalCorrect}</span>
              </div>
              <div class="flex flex-col">
                <span class="text-[9px] font-bold text-error uppercase tracking-widest mb-1">Salah</span>
                <span class="text-base font-black text-error" style="font-family: var(--font-display);">{record.totalWrong}</span>
              </div>
            </div>
          </div>
        {/each}
      </div>
    {/if}
  </main>
</div>
