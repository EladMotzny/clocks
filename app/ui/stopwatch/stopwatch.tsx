"use client"

import { useEffect, useRef, useState } from 'react'
import { formatDuration } from '@/utils/time'

export function StopwatchPage() {
	const [isRunning, setIsRunning] = useState(false)
	const [startAtMs, setStartAtMs] = useState<number | null>(null)
	const [accumulatedMs, setAccumulatedMs] = useState(0)
	const [displayMs, setDisplayMs] = useState(0)
	const [laps, setLaps] = useState<number[]>([])
	const rafRef = useRef<number | null>(null)

	useEffect(() => {
		function tick() {
			if (isRunning && startAtMs != null) {
				setDisplayMs(accumulatedMs + (Date.now() - startAtMs))
			}
			rafRef.current = requestAnimationFrame(tick)
		}
		rafRef.current = requestAnimationFrame(tick)
		return () => {
			if (rafRef.current) cancelAnimationFrame(rafRef.current)
		}
	}, [isRunning, startAtMs, accumulatedMs])

	function handleStart() {
		if (isRunning) return
		setStartAtMs(Date.now())
		setIsRunning(true)
	}

	function handleStop() {
		if (!isRunning || startAtMs == null) return
		const elapsed = Date.now() - startAtMs
		setAccumulatedMs(accumulatedMs + elapsed)
		setDisplayMs(accumulatedMs + elapsed)
		setIsRunning(false)
		setStartAtMs(null)
	}

	function handleReset() {
		setIsRunning(false)
		setAccumulatedMs(0)
		setDisplayMs(0)
		setLaps([])
		setStartAtMs(null)
	}

	function handleSplit() {
		setLaps(prev => [displayMs, ...prev])
	}

	return (
		<div className="min-h-screen">
			<h1 className="text-3xl font-semibold mb-4">סטופר</h1>
			<p className="text-secondary mb-6">התחל, עצור, שמור הקפה, ואתחל</p>

			<div className="card mb-6">
				<div className="timer-display" aria-live="polite" aria-atomic="true">
					{formatDuration(displayMs, true)}
				</div>
				<div className="flex gap-4 justify-center mt-4">
					<button className="btn btn-primary" onClick={handleStart} aria-label="התחל" disabled={isRunning}>התחל</button>
					<button className="btn btn-warning" onClick={handleStop} aria-label="עצור" disabled={!isRunning}>עצור</button>
					<button className="btn btn-secondary" onClick={handleSplit} aria-label="הקפה" disabled={!isRunning}>הקפה</button>
					<button className="btn btn-danger" onClick={handleReset} aria-label="איפוס">איפוס</button>
				</div>
			</div>

			<div className="card">
				<h2 className="text-xl font-semibold mb-4">הקפות</h2>
				{laps.length === 0 ? (
					<p className="text-secondary">אין הקפות עדיין</p>
				) : (
					<table className="table" aria-label="רשימת הקפות">
						<thead>
							<tr>
								<th>מס׳</th>
								<th>זמן</th>
							</tr>
						</thead>
						<tbody>
							{laps.map((lap, index) => (
								<tr key={lap + '-' + index}>
									<td>{laps.length - index}</td>
									<td>{formatDuration(lap)}</td>
								</tr>
							))}
						</tbody>
					</table>
				)}
			</div>
		</div>
	)
}
