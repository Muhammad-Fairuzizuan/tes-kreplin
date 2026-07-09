<script lang="ts">
  import { countdownValue } from '../stores/gameStore';
</script>

<div class="flex items-center justify-center h-full bg-bg relative overflow-hidden">
  <div class="text-center relative z-10">
    <span
      class="text-8xl font-black text-accent leading-none drop-shadow-md"
      style="font-family: var(--font-display);"
    >
      {$countdownValue}
    </span>
  </div>
</div>
