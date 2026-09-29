/**
 * Web Audio API synthesizer for CyberGuard tactical audio effects.
 * 100% self-contained with no external asset dependencies.
 */

let audioCtx: AudioContext | null = null;
let soundEnabled = true;

function getAudioContext(): AudioContext | null {
  if (typeof window === 'undefined') return null;
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (AudioContextClass) {
      audioCtx = new AudioContextClass();
    }
  }
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
}

export function isSoundEnabled(): boolean {
  return soundEnabled;
}

export function toggleSound(): boolean {
  soundEnabled = !soundEnabled;
  if (soundEnabled) {
    playChime(660, 0.08, 'sine');
  }
  return soundEnabled;
}

function playTone(freq: number, duration: number, type: OscillatorType = 'sine', gainVal: number = 0.15) {
  if (!soundEnabled) return;
  try {
    const ctx = getAudioContext();
    if (!ctx) return;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = type;
    osc.frequency.setValueAtTime(freq, ctx.currentTime);

    gain.gain.setValueAtTime(gainVal, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + duration);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + duration);
  } catch {
    // Graceful fallback if audio is restricted by autoplay policies
  }
}

function playChime(freq: number, duration: number, type: OscillatorType = 'triangle') {
  playTone(freq, duration, type, 0.12);
}

export const soundEffects = {
  correct: () => {
    if (!soundEnabled) return;
    try {
      const ctx = getAudioContext();
      if (!ctx) return;
      const now = ctx.currentTime;
      [523.25, 659.25, 783.99, 1046.5].forEach((freq, i) => {
        setTimeout(() => {
          playTone(freq, 0.18, 'triangle', 0.12);
        }, i * 65);
      });
    } catch {
      // Ignored
    }
  },

  wrong: () => {
    if (!soundEnabled) return;
    try {
      const ctx = getAudioContext();
      if (!ctx) return;
      playTone(220, 0.22, 'sawtooth', 0.18);
      setTimeout(() => {
        playTone(174.61, 0.35, 'sawtooth', 0.2);
      }, 90);
    } catch {
      // Ignored
    }
  },

  hint: () => {
    if (!soundEnabled) return;
    playTone(880, 0.1, 'sine', 0.1);
    setTimeout(() => {
      playTone(1174.66, 0.15, 'sine', 0.1);
    }, 80);
  },

  shieldLoss: () => {
    if (!soundEnabled) return;
    playTone(130.81, 0.3, 'sawtooth', 0.22);
  },

  badgeUnlock: () => {
    if (!soundEnabled) return;
    const notes = [440, 554.37, 659.25, 880];
    notes.forEach((freq, idx) => {
      setTimeout(() => playTone(freq, 0.25, 'triangle', 0.15), idx * 80);
    });
  },

  victory: () => {
    if (!soundEnabled) return;
    const notes = [523.25, 659.25, 783.99, 1046.5, 1318.5];
    notes.forEach((freq, idx) => {
      setTimeout(() => playTone(freq, 0.3, 'triangle', 0.16), idx * 100);
    });
  },

  click: () => {
    playTone(600, 0.04, 'sine', 0.05);
  },
};
