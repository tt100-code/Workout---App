export function playBell() {
  try {
    const ctx = new (window.AudioContext || window.webkitAudioContext)()
    const play = (time, freq, duration = 0.18) => {
      const osc  = ctx.createOscillator()
      const gain = ctx.createGain()
      osc.connect(gain)
      gain.connect(ctx.destination)
      osc.type = 'sine'
      osc.frequency.value = freq
      gain.gain.setValueAtTime(0.35, time)
      gain.gain.exponentialRampToValueAtTime(0.001, time + duration)
      osc.start(time)
      osc.stop(time + duration + 0.05)
    }
    play(ctx.currentTime,       880)
    play(ctx.currentTime + 0.22, 1100)
  } catch {}
}

export function vibrate() {
  try { navigator.vibrate?.([150, 80, 150]) } catch {}
}
