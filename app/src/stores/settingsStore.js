import { writable } from 'svelte/store';

const defaultSettings = {
  duration: 5, // Total time in minutes
  operation: 'Penjumlahan', // 'Penjumlahan' | 'Pengurangan'
  questionType: 'Acak', // 'Berurut' | 'Acak'
  format: 'Vertikal', // 'Horizontal' | 'Vertikal'
  keyboardLayout: '123', // '123' | '789'
  theme: 'Terang' // 'Terang' | 'Gelap'
};

// Try to load from localStorage
let initialSettings = { ...defaultSettings };

if (typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
  initialSettings.theme = 'Gelap';
}

try {
  const saved = localStorage.getItem('kraepelin_settings');
  if (saved) {
    initialSettings = { ...initialSettings, ...JSON.parse(saved) };
  }
} catch (e) {
  // Silent fail
}

export const settings = writable(initialSettings);

// Auto-save on change
settings.subscribe(val => {
  try {
    localStorage.setItem('kraepelin_settings', JSON.stringify(val));
  } catch (e) {
    // Silent fail
  }
});
