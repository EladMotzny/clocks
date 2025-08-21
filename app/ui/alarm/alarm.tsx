"use client"

import { useEffect, useMemo, useState } from 'react'
import { playChime, vibrate } from '@/utils/audio'
//Since this is a client component I cant use Metadata here. I should move the functionality to a client component (?)
// import { Metadata } from 'next'

// export const metadata: Metadata = {
// 	title: 'שעון מעורר'
// }

type Alarm = {
    id: string
    time: string // HH:MM
    label: string
    enabled: boolean
    lastTriggeredOn?: string // YYYY-MM-DD
}

function todayKey(date = new Date()): string {
    return date.toISOString().slice(0, 10)
}

const STORAGE_KEY = 'alarms:v1'

export function AlarmPage() { //Remember to remove 'default'. Research why it works like that
    const [alarms, setAlarms] = useState<Alarm[]>([])
    const [time, setTime] = useState('07:00')
    const [label, setLabel] = useState('')

    // Load from storage
    useEffect(() => {
        try {
            const raw = localStorage.getItem(STORAGE_KEY)
            if (raw) setAlarms(JSON.parse(raw))
        } catch {}
    }, [])

    // Save to storage
    useEffect(() => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(alarms))
    }, [alarms])

    useEffect(() => {
        const id = setInterval(() => {
            const now = new Date()
            const key = todayKey(now)
            const hh = now.getHours().toString().padStart(2, '0')
            const mm = now.getMinutes().toString().padStart(2, '0')
            const current = `${hh}:${mm}`
            setAlarms(prev => prev.map(a => {
                if (a.enabled && a.time === current && a.lastTriggeredOn !== key) {
                    playChime()
                    vibrate([300, 150, 300, 150, 500])
                    return { ...a, lastTriggeredOn: key }
                }
                return a
            }))
        }, 1000)
        return () => clearInterval(id)
    }, [])

    function addAlarm() {
        const newAlarm: Alarm = {
            id: crypto.randomUUID(),
            time,
            label: label.trim(),
            enabled: true,
        }
        setAlarms([newAlarm, ...alarms])
        setLabel('')
    }

    function toggleAlarm(id: string) {
        setAlarms(alarms.map(a => a.id === id ? { ...a, enabled: !a.enabled } : a))
    }

    function removeAlarm(id: string) {
        setAlarms(alarms.filter(a => a.id !== id))
    }

    return (
        <div className="min-h-screen">
            <h1 className="text-3xl font-semibold mb-4">שעון מעורר</h1>
            <p className="text-secondary mb-6">הוסף התראות בשעות הרצויות</p>

            <div className="card mb-6">
                <div className="form-row">
                    <label className="form-col">
                        <span>שעה</span>
                        <input type="time" className="input" value={time} onChange={e => setTime(e.target.value)} aria-label="בחר שעה" />
                    </label>
                    <label className="form-col">
                        <span>תיאור (לא חובה)</span>
                        <input type="text" className="input" value={label} onChange={e => setLabel(e.target.value)} placeholder="לדוגמה: לקום לעבודה" />
                    </label>
                </div>
                <div className="mt-4">
                    <button className="btn btn-primary" onClick={addAlarm} aria-label="הוסף התראה">הוסף התראה</button>
                </div>
            </div>

            <div className="card">
                <h2 className="text-xl font-semibold mb-4">התראות</h2>
                {alarms.length === 0 ? (
                    <p className="text-secondary">אין התראות עדיין</p>
                ) : (
                    <table className="table" aria-label="רשימת התראות">
                        <thead>
                            <tr>
                                <th>שעה</th>
                                <th>תיאור</th>
                                <th>סטטוס</th>
                                <th>פעולות</th>
                            </tr>
                        </thead>
                        <tbody>
                            {alarms.map(a => (
                                <tr key={a.id}>
                                    <td><span className="badge">{a.time}</span></td>
                                    <td>{a.label || '-'}</td>
                                    <td>{a.enabled ? 'פעיל' : 'מושבת'}</td>
                                    <td className="flex gap-2">
                                        <button className="btn btn-outline" onClick={() => toggleAlarm(a.id)}>{a.enabled ? 'כבה' : 'הפעל'}</button>
                                        <button className="btn btn-danger" onClick={() => removeAlarm(a.id)}>מחיקה</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    )
}

