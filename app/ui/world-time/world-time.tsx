"use client"

import { useEffect, useMemo, useState } from 'react'
import { getSupportedTimeZones, timeZoneToLabel, timeZoneToHebrew } from '@/utils/time'
import Select from 'react-select'

interface TimeZoneOption {
	value: string
	label: string
}

function ClockCard({ tz }: { tz: string }) {
	const [now, setNow] = useState<Date | null>(null)
	useEffect(() => { setNow(new Date()); const id = setInterval(() => setNow(new Date()), 1000); return () => clearInterval(id) }, [])
	const time = now ? new Intl.DateTimeFormat('he-IL', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false, timeZone: tz }).format(now) : '— — : — — : — —'
	const date = now ? new Intl.DateTimeFormat('he-IL', { year: 'numeric', month: 'long', day: '2-digit', weekday: 'long', timeZone: tz }).format(now) : ''
	return (
		<div className="card">
			<div className="flex justify-between items-center mb-2">
				<h3 className="text-xl font-semibold">{timeZoneToHebrew(tz)}</h3>
				<span className="badge">{tz}</span>
			</div>
			<div className="timer-display">{time}</div>
			<div className="text-secondary">{date}</div>
		</div>
	)
}

const STORAGE_KEY = 'world-time:tzs:v1'

export function WorldTimePage() {
	const [userTZ, setUserTZ] = useState('')
	const [timeZones, setTimeZones] = useState<string[]>([])
	const [allTZ, setAllTZ] = useState<string[]>([])
	const [newTZ, setNewTZ] = useState<TimeZoneOption | null>(null)

	useEffect(() => {
		setAllTZ(getSupportedTimeZones())
		setUserTZ(Intl.DateTimeFormat().resolvedOptions().timeZone)
	}, [])

	useEffect(() => {
		try {
			const raw = localStorage.getItem(STORAGE_KEY)
			if (raw) {
				setTimeZones(JSON.parse(raw))
				return
			}
		} catch {}
		if (userTZ) setTimeZones([userTZ, 'Europe/London', 'America/New_York', 'Asia/Tokyo'])
	}, [userTZ])

	useEffect(() => {
		localStorage.setItem(STORAGE_KEY, JSON.stringify(timeZones))
	}, [timeZones])

	function addTZ() {
		if (!newTZ || timeZones.includes(newTZ.value)) return
		setTimeZones([newTZ.value, ...timeZones])
		setNewTZ(null)
	}

	function removeTZ(tz: string) {
		setTimeZones(timeZones.filter(t => t !== tz))
	}

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
			<h1 className="text-3xl font-semibold mb-4">שעון עולמי</h1>
			<p className="text-secondary mb-6">הוסף שעונים ממדינות ואזורים שונים</p>

			<div className="card mb-6">
				<div className="form-row">
					<label className="form-col">
						<span>בחר אזור זמן</span>
						<Select
							value={newTZ}
							onChange={(selected) => setNewTZ(selected as TimeZoneOption)}
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
				<div className="mt-4">
					<button className="btn btn-primary" onClick={addTZ} disabled={!newTZ}>הוסף שעון</button>
				</div>
			</div>

			<div className="grid grid-cols-3 gap-6">
				{timeZones.map(tz => (
					<div key={tz}>
						<ClockCard tz={tz} />
						<div className="mt-2">
							<button className="btn btn-outline" onClick={() => removeTZ(tz)}>הסר</button>
						</div>
					</div>
				))}
			</div>
		</div>
	)
}

