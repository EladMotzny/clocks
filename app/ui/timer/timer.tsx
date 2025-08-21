"use client"

import { useEffect, useMemo, useRef, useState } from 'react'
import { clampNumber, formatDuration } from '@/utils/time'
import { playChime, vibrate } from '@/utils/audio'

function toMs(hours: number, minutes: number, seconds: number) {
	return hours * 3600_000 + minutes * 60_000 + seconds * 1000
}

export function TimerPage() {
	const [hours, setHours] = useState(0)
	const [minutes, setMinutes] = useState(0)
	const [seconds, setSeconds] = useState(0)
	const [remainingMs, setRemainingMs] = useState(0)
	const [isRunning, setIsRunning] = useState(false)
	const endAtRef = useRef<number | null>(null)
	const rafRef = useRef<number | null>(null)
	const totalMs = useMemo(() => toMs(hours, minutes, seconds), [hours, minutes, seconds])

	useEffect(() => {
		if (!isRunning) return
		function tick() {
			if (endAtRef.current != null) {
				const ms = Math.max(0, endAtRef.current - Date.now())
				setRemainingMs(ms)
				if (ms <= 0) {
					setIsRunning(false)
					playChime()
					vibrate([300, 150, 300])
				}
			}
			rafRef.current = requestAnimationFrame(tick)
		}
		rafRef.current = requestAnimationFrame(tick)
		return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current) }
	}, [isRunning])

	function handleStart() {
		if (totalMs <= 0) return
		endAtRef.current = Date.now() + (remainingMs > 0 ? remainingMs : totalMs)
		setIsRunning(true)
	}

	function handlePause() {
		setIsRunning(false)
	}

	function handleReset() {
		setIsRunning(false)
		setRemainingMs(0)
		endAtRef.current = null
	}

	function handleApply() {
		setRemainingMs(totalMs)
	}

	return (
		<div className="min-h-screen">
			<h1 className="text-3xl font-semibold mb-4">טיימר</h1>
			<p className="text-secondary mb-6">בחר משך זמן עד 24 שעות</p>

			<div className="card mb-6">
				<div className="form-row">
					<label className="form-col">
						<span>שעות</span>
						<input className="input" type="number" min={0} max={24} value={hours}
							onChange={e => setHours(clampNumber(parseInt(e.target.value || '0'), 0, 24))}
							aria-label="שעות" />
					</label>
					<label className="form-col">
						<span>דקות</span>
						<input className="input" type="number" min={0} max={59} value={minutes}
							onChange={e => setMinutes(clampNumber(parseInt(e.target.value || '0'), 0, 59))}
							aria-label="דקות" />
					</label>
					<label className="form-col">
						<span>שניות</span>
						<input className="input" type="number" min={0} max={59} value={seconds}
							onChange={e => setSeconds(clampNumber(parseInt(e.target.value || '0'), 0, 59))}
							aria-label="שניות" />
					</label>
				</div>
				<div className="flex gap-4 mt-4">
					<button className="btn btn-outline" onClick={handleApply}>עדכן משך</button>
					<button className="btn btn-primary" onClick={handleStart} disabled={isRunning || (remainingMs <= 0 && totalMs <= 0)}>התחל</button>
					<button className="btn btn-warning" onClick={handlePause} disabled={!isRunning}>השהה</button>
					<button className="btn btn-danger" onClick={handleReset}>איפוס</button>
				</div>
			</div>

			<div className="card">
				<h2 className="text-xl font-semibold mb-4">זמן שנותר</h2>
				<div className="timer-display" aria-live="polite" aria-atomic="true">
					{formatDuration(remainingMs > 0 ? remainingMs : totalMs, true)}
				</div>
			</div>
		</div>
	)
}

