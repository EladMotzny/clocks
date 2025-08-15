export function pad2(value: number): string {
	return value.toString().padStart(2, '0')
}

export function pad3(value: number): string {
	return value.toString().padStart(3, '0')
}

// Format duration in milliseconds to HH:MM:SS.mmm or HH:MM:SS
export function formatDuration(ms: number, withMillis: boolean = true): string {
	const totalSeconds = Math.max(0, Math.floor(ms / 1000))
	const hours = Math.floor(totalSeconds / 3600)
	const minutes = Math.floor((totalSeconds % 3600) / 60)
	const seconds = totalSeconds % 60
	const millis = Math.max(0, ms % 1000)
	const base = `${pad2(hours)}:${pad2(minutes)}:${pad2(seconds)}`
	return withMillis ? `${base}.${pad3(millis)}` : base
}

export function clampNumber(value: number, min: number, max: number): number {
	return Math.min(max, Math.max(min, value))
}

// Returns browser supported time zones
export function getSupportedTimeZones(): string[] {
	// Modern browsers support this
	// Fallback to common timezones if not supported
	// @ts-ignore
	if (Intl.supportedValuesOf) {
		// @ts-ignore
		return Intl.supportedValuesOf('timeZone') as string[]
	}
	return [
		'Africa/Cairo', 'Africa/Johannesburg',
		'America/Chicago', 'America/Los_Angeles', 'America/New_York', 'America/Sao_Paulo',
		'Asia/Dubai', 'Asia/Hong_Kong', 'Asia/Jerusalem', 'Asia/Kolkata', 'Asia/Singapore', 'Asia/Tokyo',
		'Australia/Sydney',
		'Europe/Amsterdam', 'Europe/Berlin', 'Europe/London', 'Europe/Madrid', 'Europe/Paris',
		'Pacific/Auckland'
	]
}

export function timeZoneToLabel(tz: string): string {
	const parts = tz.split('/')
	const city = parts[parts.length - 1].replace(/_/g, ' ')
	return city
}

