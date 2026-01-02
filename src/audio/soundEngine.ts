let audioCtx: AudioContext | null = null;

function getCtx() {
  if (!audioCtx) {
    audioCtx = new AudioContext();
  }
  return audioCtx;
}

function playTone(
  freq: number,
  duration = 0.06,
  volume = 0.06,
  type: OscillatorType = "sine"
) {
  const ctx = getCtx();

  const osc = ctx.createOscillator();
  const gain = ctx.createGain();

  osc.type = type;
  osc.frequency.setValueAtTime(freq, ctx.currentTime);

  gain.gain.setValueAtTime(0, ctx.currentTime);
  gain.gain.linearRampToValueAtTime(volume, ctx.currentTime + 0.01);
  gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + duration);

  osc.connect(gain);
  gain.connect(ctx.destination);

  osc.start();
  osc.stop(ctx.currentTime + duration);
}

export const sounds = {
  compare: () => playTone(400, 0.05, 0.04, "sine"),
  active: () => playTone(600, 0.04, 0.035, "sine"),
  overwrite: () => playTone(520, 0.06, 0.05, "sine"),
  swap: () => playTone(700, 0.07, 0.07, "sine"),
  markSorted: () => playTone(1040, 0.12, 0.08, "sine"),
};

// let audioCtx: AudioContext | null = null;

// function getCtx() {
//   if (!audioCtx) {
//     audioCtx = new AudioContext();
//   }
//   return audioCtx;
// }

// function playTone(freq: number, duration = 0.05, volume = 0.05) {
//   const ctx = getCtx();

//   const osc = ctx.createOscillator();
//   const gain = ctx.createGain();

//   osc.frequency.value = freq;
//   osc.type = "sine";

//   gain.gain.value = volume;

//   osc.connect(gain);
//   gain.connect(ctx.destination);

//   osc.start();
//   osc.stop(ctx.currentTime + duration);
// }

// export const sounds = {
//   compare: () => playTone(400),
//   swap: () => playTone(700, 0.07),
//   overwrite: () => playTone(550, 0.06),
//   active: () => playTone(480, 0.03, 0.03),
//   markSorted: () => playTone(440, 0.1, 0.08),
//   // markSorted: () => playTone(900, 0.1, 0.08),
// };
