"use client"

import { useEffect, useState } from 'react'
import { getSupportedTimeZones, timeZoneToHebrew } from '@/utils/time'
import Select from 'react-select'

interface TimeZoneOption {
	value: string
	label: string
}

export function TimeConverterPage() {
	const [allTZ, setAllTZ] = useState<string[]>([])
	const [sourceTZ, setSourceTZ] = useState<TimeZoneOption | null>(null)
	const [targetTZ, setTargetTZ] = useState<TimeZoneOption | null>(null)
	const [dateTimeLocal, setDateTimeLocal] = useState('')

	// Client-only initialization
	useEffect(() => {
		const timezones = getSupportedTimeZones()
		setAllTZ(timezones)
		const tz = Intl.DateTimeFormat().resolvedOptions().timeZone
		setSourceTZ({ value: tz, label: timeZoneToHebrew(tz) })
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
		return new Intl.DateTimeFormat('he-IL', { timeZone: targetTZ.value, dateStyle: 'full', timeStyle: 'short', hour12: false }).format(new Date(utcMs))
	}

	const result = convert()
	const ready = allTZ.length > 0 && !!sourceTZ && !!dateTimeLocal

	const timezoneOptions: TimeZoneOption[] = allTZ.map(tz => ({
		value: tz,
		label: timeZoneToHebrew(tz)
	}))

	const customStyles = {
		control: (provided: any) => ({
			...provided,
			backgroundColor: 'var(--background-primary)',
			borderColor: 'var(--border-color)',
			'&:hover': {
				borderColor: 'var(--border-color)',
			},
		}),
		menu: (provided: any) => ({
			...provided,
			backgroundColor: 'var(--background-primary)',
			direction: 'rtl',
		}),
		option: (provided: any, state: any) => ({
			...provided,
			backgroundColor: state.isFocused ? 'var(--background-tertiary)' : 'transparent',
			color: 'var(--text-primary)',
			direction: 'rtl',
			textAlign: 'right',
		}),
		singleValue: (provided: any) => ({
			...provided,
			color: 'var(--text-primary)',
		}),
		input: (provided: any) => ({
			...provided,
			color: 'var(--text-primary)',
		}),
	}

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
						<Select
							value={sourceTZ}
							onChange={(selected) => setSourceTZ(selected as TimeZoneOption)}
							options={timezoneOptions}
							isSearchable={true}
							isDisabled={!ready}
							placeholder="טוען..."
							styles={customStyles}
							className="react-select-container"
							classNamePrefix="react-select"
						/>
					</label>
					<label className="form-col">
						<span>אזור זמן יעד</span>
						<Select
							value={targetTZ}
							onChange={(selected) => setTargetTZ(selected as TimeZoneOption)}
							options={timezoneOptions}
							isSearchable={true}
							isDisabled={allTZ.length === 0}
							placeholder="בחר..."
							styles={customStyles}
							className="react-select-container"
							classNamePrefix="react-select"
						/>
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

