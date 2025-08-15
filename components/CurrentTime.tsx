"use client"

import { useEffect, useState } from 'react'

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
	const [now, setNow] = useState<Date | null>(null)
	const [userTimeZone, setUserTimeZone] = useState<string>('')
	const locale = 'he-IL'

	useEffect(() => {
		setUserTimeZone(Intl.DateTimeFormat().resolvedOptions().timeZone)
		setNow(new Date())
		const id = setInterval(() => setNow(new Date()), 1000)
		return () => clearInterval(id)
	}, [])

	return (
		<div className="animate-fade-in">
			<div className="text-center">
				{userTimeZone && <div className="badge mb-4">אזור זמן: {userTimeZone}</div>}
				<div className="clock-display" aria-live="polite" aria-atomic="true">
					{now ? formatTime(now, locale, userTimeZone || undefined) : '— — : — — : — —'}
				</div>
				<div className="text-secondary">
					{now ? formatDate(now, locale, userTimeZone || undefined) : ''}
				</div>
			</div>
		</div>
	)
}

