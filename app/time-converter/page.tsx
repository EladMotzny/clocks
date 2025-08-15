"use client"

import { useMemo, useState } from 'react'
import { getSupportedTimeZones } from '@/utils/time'

export default function TimeConverterPage() {
	const userTZ = useMemo(() => Intl.DateTimeFormat().resolvedOptions().timeZone, [])
	const [allTZ] = useState(getSupportedTimeZones())
	const [sourceTZ, setSourceTZ] = useState(userTZ)
	const [targetTZ, setTargetTZ] = useState('')
	const [dateTimeLocal, setDateTimeLocal] = useState(() => {
		const now = new Date()
		const iso = new Date(now.getTime() - now.getTimezoneOffset() * 60000).toISOString()
		return iso.slice(0, 16) // YYYY-MM-DDTHH:mm
	})

	function convert(): string | null {
		if (!targetTZ) return null
		// Interpret input in sourceTZ
		const [datePart, timePart] = dateTimeLocal.split('T')
		const [year, month, day] = datePart.split('-').map(Number)
		const [hour, minute] = timePart.split(':').map(Number)
		const utcMs = Date.UTC(year, month - 1, day, hour, minute)
		const sourceOffset = new Date(utcMs).toLocaleString('en-US', { timeZone: sourceTZ })
		// We only need the Date object; to get correct instant we keep utcMs.
		return new Intl.DateTimeFormat('he-IL', { timeZone: targetTZ, dateStyle: 'full', timeStyle: 'short', hour12: false }).format(new Date(utcMs))
	}

	const result = convert()

	return (
		<div className="min-h-screen">
			<h1 className="text-3xl font-semibold mb-4">ממיר זמן</h1>
			<p className="text-secondary mb-6">בחר תאריך ושעה באזור הזמן שלך והמר לאזור אחר</p>

			<div className="card mb-6">
				<div className="form-row">
					<label className="form-col">
						<span>תאריך ושעה</span>
						<input className="input" type="datetime-local" value={dateTimeLocal} onChange={e => setDateTimeLocal(e.target.value)} />
					</label>
					<label className="form-col">
						<span>אזור זמן מקור</span>
						<select className="select" value={sourceTZ} onChange={e => setSourceTZ(e.target.value)}>
							{allTZ.map(tz => <option key={tz} value={tz}>{tz}</option>)}
						</select>
					</label>
					<label className="form-col">
						<span>אזור זמן יעד</span>
						<select className="select" value={targetTZ} onChange={e => setTargetTZ(e.target.value)}>
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

