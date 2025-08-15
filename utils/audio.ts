export async function playBeep(frequency: number = 880, durationMs: number = 300) {
	try {
		const AudioContextClass = (window as any).AudioContext || (window as any).webkitAudioContext
		const ctx = new AudioContextClass()
		const oscillator = ctx.createOscillator()
		const gain = ctx.createGain()
		oscillator.type = 'sine'
		oscillator.frequency.value = frequency
		oscillator.connect(gain)
		gain.connect(ctx.destination)
		gain.gain.setValueAtTime(0.001, ctx.currentTime)
		gain.gain.exponentialRampToValueAtTime(0.2, ctx.currentTime + 0.01)
		oscillator.start()
		await new Promise(r => setTimeout(r, durationMs))
		gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.05)
		oscillator.stop(ctx.currentTime + 0.06)
		setTimeout(() => ctx.close(), 100)
	} catch (e) {
		// ignore
	}
}

export async function playChime() {
	await playBeep(587, 180)
	await playBeep(880, 180)
	await playBeep(1175, 200)
}

export function vibrate(pattern: number | number[] = [200, 100, 200]) {
	if (navigator.vibrate) {
		navigator.vibrate(pattern)
	}
}

