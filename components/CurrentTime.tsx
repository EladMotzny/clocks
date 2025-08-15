"use client"

import { useEffect, useMemo, useState } from 'react'

function formatTime(date: Date, locale: string, timeZone?: string) {
	return new Intl.DateTimeFormat(locale, {
		hour: '2-digit', minute: '2-digit', second: '2-digit',
		hour12: false, timeZone,
	}).format(date)
}

function formatDate(date: Date, locale: string, timeZone?: string) {
	return new Intl.DateTimeFormat(locale, {
		year: 'numeric', month: 'long', day: '2-digit', weekday: 'long',
		timeZone,
	}).format(date)
}

export default function CurrentTime() {
	const [now, setNow] = useState(new Date())
	const userTimeZone = useMemo(() => Intl.DateTimeFormat().resolvedOptions().timeZone, [])
	const locale = 'he-IL'

	useEffect(() => {
		const id = setInterval(() => setNow(new Date()), 1000)
		return () => clearInterval(id)
	}, [])

	return (
		<div className="animate-fade-in">
			<div className="text-center">
				<div className="badge mb-4">אזור זמן: {userTimeZone}</div>
				<div className="clock-display" aria-live="polite" aria-atomic="true">
					{formatTime(now, locale, userTimeZone)}
				</div>
				<div className="text-secondary">{formatDate(now, locale, userTimeZone)}</div>
			</div>
		</div>
	)
}

