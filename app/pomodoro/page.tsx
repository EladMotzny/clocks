"use client"

import { useEffect, useMemo, useRef, useState } from 'react'
import { clampNumber, formatDuration } from '@/utils/time'
import { playBeep, playChime, vibrate } from '@/utils/audio'

type Phase = 'focus' | 'rest'

type Config = {
	focusMinutes: number
	restMinutes: number
	cycles: number
}

export default function PomodoroPage() {
	const [config, setConfig] = useState<Config>({ focusMinutes: 25, restMinutes: 5, cycles: 4 })
	const [currentCycle, setCurrentCycle] = useState(1)
	const [phase, setPhase] = useState<Phase>('focus')
	const [remainingMs, setRemainingMs] = useState(0)
	const [isRunning, setIsRunning] = useState(false)
	const endAtRef = useRef<number | null>(null)
	const rafRef = useRef<number | null>(null)

	const phaseMs = useMemo(() => (phase === 'focus' ? config.focusMinutes : config.restMinutes) * 60_000, [phase, config])

	useEffect(() => {
		if (!isRunning) return
		function tick() {
			if (!endAtRef.current) return
			const ms = Math.max(0, endAtRef.current - Date.now())
			setRemainingMs(ms)
			if (ms <= 0) {
				advance()
			}
			rafRef.current = requestAnimationFrame(tick)
		}
		rafRef.current = requestAnimationFrame(tick)
		return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current) }
	}, [isRunning])

	function advance() {
		if (phase === 'focus') {
			playBeep(880, 200)
			setPhase('rest')
			endAtRef.current = Date.now() + (config.restMinutes * 60_000)
			setRemainingMs(config.restMinutes * 60_000)
		} else {
			playChime()
			if (currentCycle >= config.cycles) {
				setIsRunning(false)
				vibrate([300, 100, 300, 100, 300])
				return
			}
			setCurrentCycle(currentCycle + 1)
			setPhase('focus')
			endAtRef.current = Date.now() + (config.focusMinutes * 60_000)
			setRemainingMs(config.focusMinutes * 60_000)
		}
	}

	function start() {
		if (isRunning) return
		endAtRef.current = Date.now() + phaseMs
		setRemainingMs(phaseMs)
		setIsRunning(true)
	}

	function pause() { setIsRunning(false) }

	function reset() {
		setIsRunning(false)
		setPhase('focus')
		setCurrentCycle(1)
		setRemainingMs(0)
		endAtRef.current = null
	}

	return (
		<div className="min-h-screen">
			<h1 className="text-3xl font-semibold mb-4">פומודורו</h1>
			<p className="text-secondary mb-6">ברירת המחדל: 25 דקות ריכוז ו-5 דקות הפסקה. ניתן לשנות.</p>

			<div className="card mb-6">
				<div className="form-row">
					<label className="form-col">
						<span>דקות ריכוז</span>
						<input className="input" type="number" min={1} max={120} value={config.focusMinutes}
							onChange={e => setConfig({ ...config, focusMinutes: clampNumber(parseInt(e.target.value || '1'), 1, 120) })} />
					</label>
					<label className="form-col">
						<span>דקות הפסקה</span>
						<input className="input" type="number" min={1} max={60} value={config.restMinutes}
							onChange={e => setConfig({ ...config, restMinutes: clampNumber(parseInt(e.target.value || '1'), 1, 60) })} />
					</label>
					<label className="form-col">
						<span>מספר מחזורים</span>
						<input className="input" type="number" min={1} max={12} value={config.cycles}
							onChange={e => setConfig({ ...config, cycles: clampNumber(parseInt(e.target.value || '1'), 1, 12) })} />
					</label>
				</div>
				<div className="flex gap-4 mt-4">
					<button className="btn btn-primary" onClick={start} disabled={isRunning}>התחל</button>
					<button className="btn btn-warning" onClick={pause} disabled={!isRunning}>השהה</button>
					<button className="btn btn-danger" onClick={reset}>איפוס</button>
				</div>
			</div>

			<div className="card">
				<div className="flex justify-between items-center mb-2">
					<h2 className="text-xl font-semibold">שלב: {phase === 'focus' ? 'ריכוז' : 'הפסקה'}</h2>
					<span className="badge">מחזור {currentCycle} מתוך {config.cycles}</span>
				</div>
				<div className="timer-display" aria-live="polite" aria-atomic="true">{formatDuration(remainingMs > 0 ? remainingMs : phaseMs)}</div>
			</div>
		</div>
	)
}

