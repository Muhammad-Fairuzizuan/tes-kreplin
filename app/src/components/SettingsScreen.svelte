<script lang="ts">
  import { settings } from '../stores/settingsStore';

  const timeOptions = [1, 2, 5, 11.5, 22.5, 30];
  const operations = ['Penjumlahan', 'Pengurangan'] as const;
  const questionTypes = ['Berurut', 'Acak'] as const;
  const formats = ['Horizontal', 'Vertikal'] as const;
  let customTime = false;
  let customTimeValue = 5;

  // Initialize custom time state
  if (!timeOptions.includes($settings.duration)) {
    customTime = true;
    customTimeValue = $settings.duration;
  }


  function handleTimeChange(val: number | 'custom') {
    if (val === 'custom') {
      customTime = true;
      $settings.duration = customTimeValue;
    } else {
      customTime = false;
      $settings.duration = val;
    }
  }

  function handleCustomTimeInput(e: Event) {
    const target = e.currentTarget as HTMLInputElement;
    const val = parseFloat(target.value);
    if (!isNaN(val) && val > 0) {
      $settings.duration = val;
    }
  }
</script>

<div class="flex-grow flex flex-col overflow-y-auto w-full relative z-10" style="font-family: var(--font-body);">

  <div class="p-4 flex flex-col gap-5 pb-[calc(3rem+env(safe-area-inset-bottom))]">


    <!-- Waktu -->
    <section class="bg-surface border border-border rounded-2xl p-4 shadow-sm flex flex-col gap-4">
      <div class="flex items-start gap-3">
        <div class="p-2 bg-accent/10 rounded-lg text-accent">
          <svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
        </div>
        <div class="flex-1 mt-0.5">
          <h2 class="text-xs font-bold text-secondary uppercase tracking-widest" style="font-family: var(--font-display);">Waktu Tes</h2>
          <p class="text-xs text-secondary/70 mt-1 leading-snug">Pilih durasi tes yang ingin Anda jalankan.</p>
        </div>
      </div>
      <div class="flex flex-wrap gap-2" role="radiogroup" aria-label="Pilih Waktu">
        {#each timeOptions as t}
          <button type="button" 
            role="radio" tabindex="0"
            aria-checked={!customTime && $settings.duration === t}
            on:click={() => handleTimeChange(t)}
            class="px-4 py-3 min-w-[3rem] min-h-[3rem] rounded-xl font-bold text-sm transition-all duration-200 cursor-pointer active:scale-95
                   {!customTime && $settings.duration === t ? 'bg-accent text-on-accent shadow-md' : 'bg-surface-dim text-secondary hover:bg-border/50'}"
          >
            {t}
          </button>
        {/each}
        <button type="button" 
          role="radio" tabindex="0"
          aria-checked={customTime}
          on:click={() => handleTimeChange('custom')}
          class="px-4 py-3 min-h-[3rem] rounded-xl font-bold text-sm transition-all duration-200 cursor-pointer active:scale-95
                 {customTime ? 'bg-accent text-on-accent shadow-md' : 'bg-surface-dim text-secondary hover:bg-border/50'}"
        >
          Kustom
        </button>
      </div>
      {#if customTime}
        <div class="flex items-center gap-3">
          <input 
            id="custom-time"
            aria-label="Waktu kustom (menit)"
            type="number" 
            inputmode="decimal"
            bind:value={customTimeValue}
            on:input={handleCustomTimeInput}
            class="w-full max-w-[120px] bg-surface-dim border border-border rounded-xl px-4 py-3 text-primary font-bold focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all"
            placeholder="Menit"
            min="0.1"
            step="0.1"
          />
          <span class="text-sm font-medium text-secondary">menit</span>
        </div>
      {/if}
    </section>

    <!-- Jenis perhitungan -->
    <section class="bg-surface border border-border rounded-2xl p-4 shadow-sm flex flex-col gap-4">
      <div class="flex items-start gap-3">
        <div class="p-2 bg-accent/10 rounded-lg text-accent">
          <svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="2" width="16" height="20" rx="2"/><line x1="8" y1="6" x2="16" y2="6"/><line x1="16" y1="14" x2="16" y2="18"/><path d="M16 10h.01"/><path d="M12 10h.01"/><path d="M8 10h.01"/><path d="M12 14h.01"/><path d="M8 14h.01"/><path d="M12 18h.01"/><path d="M8 18h.01"/></svg>
        </div>
        <div class="flex-1 mt-0.5">
          <h2 class="text-xs font-bold text-secondary uppercase tracking-widest" style="font-family: var(--font-display);">Jenis Perhitungan</h2>
          <p class="text-xs text-secondary/70 mt-1 leading-snug">Pilih operasi matematika yang akan diuji.</p>
        </div>
      </div>
      <div class="flex bg-surface-dim p-1 rounded-xl w-full" role="radiogroup" aria-label="Jenis Perhitungan">
        {#each operations as op}
          <button type="button" 
            role="radio" tabindex="0"
            aria-checked={$settings.operation === op}
            on:click={() => $settings.operation = op as 'Penjumlahan' | 'Pengurangan'}
            class="flex-1 py-3 rounded-lg font-bold text-sm transition-all duration-200 cursor-pointer
                   {$settings.operation === op ? 'bg-surface text-primary shadow-[0_2px_8px_rgba(0,0,0,0.08)]' : 'text-secondary hover:text-primary active:scale-95'}"
          >
            {op}
          </button>
        {/each}
      </div>
    </section>

    <!-- Tipe soal -->
    <section class="bg-surface border border-border rounded-2xl p-4 shadow-sm flex flex-col gap-4">
      <div class="flex items-start gap-3">
        <div class="p-2 bg-accent/10 rounded-lg text-accent">
          <svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="16 3 21 3 21 8"/><line x1="4" y1="20" x2="21" y2="3"/><polyline points="21 16 21 21 16 21"/><line x1="15" y1="15" x2="21" y2="21"/><line x1="4" y1="4" x2="9" y2="9"/></svg>
        </div>
        <div class="flex-1 mt-0.5">
          <h2 class="text-xs font-bold text-secondary uppercase tracking-widest" style="font-family: var(--font-display);">Tipe Soal</h2>
          <p class="text-xs text-secondary/70 mt-1 leading-snug">Tentukan urutan kemunculan angka.</p>
        </div>
      </div>
      <div class="flex bg-surface-dim p-1 rounded-xl w-full" role="radiogroup" aria-label="Tipe Soal">
        {#each questionTypes as op}
          <button type="button" 
            role="radio" tabindex="0"
            aria-checked={$settings.questionType === op}
            on:click={() => $settings.questionType = op as 'Berurut' | 'Acak'}
            class="flex-1 py-3 rounded-lg font-bold text-sm transition-all duration-200 cursor-pointer
                   {$settings.questionType === op ? 'bg-surface text-primary shadow-[0_2px_8px_rgba(0,0,0,0.08)]' : 'text-secondary hover:text-primary active:scale-95'}"
          >
            {op}
          </button>
        {/each}
      </div>
    </section>

    <!-- Format soal -->
    <section class="bg-surface border border-border rounded-2xl p-4 shadow-sm flex flex-col gap-4">
      <div class="flex items-start gap-3">
        <div class="p-2 bg-accent/10 rounded-lg text-accent">
          <svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><line x1="3" y1="9" x2="21" y2="9"/><line x1="9" y1="21" x2="9" y2="9"/></svg>
        </div>
        <div class="flex-1 mt-0.5">
          <h2 class="text-xs font-bold text-secondary uppercase tracking-widest" style="font-family: var(--font-display);">Format Tampilan</h2>
          <p class="text-xs text-secondary/70 mt-1 leading-snug">Pilih orientasi tampilan soal di layar.</p>
        </div>
      </div>
      <div class="flex bg-surface-dim p-1 rounded-xl w-full" role="radiogroup" aria-label="Format Soal">
        {#each formats as op}
          <button type="button" 
            role="radio" tabindex="0"
            aria-checked={$settings.format === op}
            on:click={() => $settings.format = op as 'Horizontal' | 'Vertikal'}
            class="flex-1 py-3 rounded-lg font-bold text-sm transition-all duration-200 cursor-pointer
                   {$settings.format === op ? 'bg-surface text-primary shadow-[0_2px_8px_rgba(0,0,0,0.08)]' : 'text-secondary hover:text-primary active:scale-95'}"
          >
            {op}
          </button>
        {/each}
      </div>
    </section>

    <!-- Layout Numpad -->
    <section class="bg-surface border border-border rounded-2xl p-4 shadow-sm flex flex-col gap-4">
      <div class="flex items-start gap-3">
        <div class="p-2 bg-accent/10 rounded-lg text-accent">
          <svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="4" width="20" height="16" rx="2" ry="2"/><path d="M6 8h.001"/><path d="M10 8h.001"/><path d="M14 8h.001"/><path d="M18 8h.001"/><path d="M8 12h.001"/><path d="M12 12h.001"/><path d="M16 12h.001"/><path d="M7 16h10"/></svg>
        </div>
        <div class="flex-1 mt-0.5">
          <h2 class="text-xs font-bold text-secondary uppercase tracking-widest" style="font-family: var(--font-display);">Layout Numpad</h2>
          <p class="text-xs text-secondary/70 mt-1 leading-snug">Pilih susunan tombol angka (mirip telepon vs kalkulator).</p>
        </div>
      </div>
      <div class="flex bg-surface-dim p-1 rounded-xl w-full" role="radiogroup" aria-label="Layout Numpad">
        <button type="button" 
          role="radio" tabindex="0"
          aria-checked={$settings.keyboardLayout === '123'}
          on:click={() => $settings.keyboardLayout = '123'}
          class="flex-1 py-3 rounded-lg font-bold text-sm transition-all duration-200 cursor-pointer flex flex-col items-center gap-0.5
                 {$settings.keyboardLayout === '123' ? 'bg-surface text-primary shadow-[0_2px_8px_rgba(0,0,0,0.08)]' : 'text-secondary hover:text-primary active:scale-95'}"
        >
          <span>Layout 123</span>
          <span class="text-[10px] opacity-70 font-normal" style="font-family: var(--font-display);">123 di atas</span>
        </button>
        <button type="button" 
          role="radio" tabindex="0"
          aria-checked={$settings.keyboardLayout === '789'}
          on:click={() => $settings.keyboardLayout = '789'}
          class="flex-1 py-3 rounded-lg font-bold text-sm transition-all duration-200 cursor-pointer flex flex-col items-center gap-0.5
                 {$settings.keyboardLayout === '789' ? 'bg-surface text-primary shadow-[0_2px_8px_rgba(0,0,0,0.08)]' : 'text-secondary hover:text-primary active:scale-95'}"
        >
          <span>Layout 789</span>
          <span class="text-[10px] opacity-70 font-normal" style="font-family: var(--font-display);">789 di atas</span>
        </button>
      </div>
    </section>

  </div>
</div>
