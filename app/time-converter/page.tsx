"use client"

import { useEffect, useState } from 'react'
import { getSupportedTimeZones } from '@/utils/time'

export default function TimeConverterPage() {
	const [allTZ, setAllTZ] = useState<string[]>([])
	const [sourceTZ, setSourceTZ] = useState('')
	const [targetTZ, setTargetTZ] = useState('')
	const [dateTimeLocal, setDateTimeLocal] = useState('')

	// Client-only initialization
	useEffect(() => {
		setAllTZ(getSupportedTimeZones())
		const tz = Intl.DateTimeFormat().resolvedOptions().timeZone
		setSourceTZ(tz)
		const now = new Date()
		const localIso = new Date(now.getTime() - now.getTimezoneOffset() * 60000).toISOString().slice(0, 16)
		setDateTimeLocal(localIso)
	}, [])

	function convert(): string | null {
		if (!targetTZ || !sourceTZ || !dateTimeLocal) return null
		const [datePart, timePart] = dateTimeLocal.split('T')
		const [year, month, day] = datePart.split('-').map(Number)
		const [hour, minute] = timePart.split(':').map(Number)
		const utcMs = Date.UTC(year, month - 1, day, hour, minute)
		return new Intl.DateTimeFormat('he-IL', { timeZone: targetTZ, dateStyle: 'full', timeStyle: 'short', hour12: false }).format(new Date(utcMs))
	}

	const result = convert()
	const ready = allTZ.length > 0 && !!sourceTZ && !!dateTimeLocal

	return (
		<div className="min-h-screen">
			<h1 className="text-3xl font-semibold mb-4">ממיר זמן</h1>
			<p className="text-secondary mb-6">בחר תאריך ושעה באזור הזמן שלך והמר לאזור אחר</p>

			<div className="card mb-6">
				<div className="form-row">
					<label className="form-col">
						<span>תאריך ושעה</span>
						<input className="input" type="datetime-local" value={dateTimeLocal} onChange={e => setDateTimeLocal(e.target.value)} placeholder="" />
					</label>
					<label className="form-col">
						<span>אזור זמן מקור</span>
						<select className="select" value={sourceTZ} onChange={e => setSourceTZ(e.target.value)} disabled={!ready}>
							{ready ? allTZ.map(tz => <option key={tz} value={tz}>{tz}</option>) : <option value="">טוען...</option>}
						</select>
					</label>
					<label className="form-col">
						<span>אזור זמן יעד</span>
						<select className="select" value={targetTZ} onChange={e => setTargetTZ(e.target.value)} disabled={allTZ.length === 0}>
							<option value="">בחר...</option>
							{allTZ.map(tz => <option key={tz} value={tz}>{tz}</option>)}
						</select>
					</label>
				</div>
			</div>

			<div className="card">
				<h2 className="text-xl font-semibold mb-2">תוצאה</h2>
				{result ? <p>{result}</p> : <p className="text-secondary">בחר אזור זמן יעד להצגת התוצאה</p>}
			</div>
		</div>
	)
}

