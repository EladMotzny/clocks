'use client'

import Link from 'next/link'
import CurrentTime from '@/components/CurrentTime'

export default function Home() {
	return (
		<div className="min-h-screen">
			<div className="text-center mb-8">
				<h1 className="text-4xl font-bold mb-4">שעון נוכחי</h1>
				<p className="text-lg text-secondary">השעה הנוכחית לפי המיקום שלך</p>
			</div>

			<div className="card max-w-2xl mx-auto">
				<CurrentTime />
			</div>

			<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-12">
				<Link href="/stopwatch" className="card text-center transition-transform hover-scale">
					<h3 className="text-xl font-semibold mb-2">סטופר</h3>
					<p className="text-sm text-secondary">מדידת זמן מדויקת</p>
				</Link>
				<Link href="/timer" className="card text-center transition-transform hover-scale">
					<h3 className="text-xl font-semibold mb-2">טיימר</h3>
					<p className="text-sm text-secondary">הגדרת זמן מונה לאחור</p>
				</Link>
				<Link href="/alarm" className="card text-center transition-transform hover-scale">
					<h3 className="text-xl font-semibold mb-2">אזעקה</h3>
					<p className="text-sm text-secondary">הגדרת התראה</p>
				</Link>
				<Link href="/world-time" className="card text-center transition-transform hover-scale">
					<h3 className="text-xl font-semibold mb-2">זמן עולמי</h3>
					<p className="text-sm text-secondary">שעונים מכל העולם</p>
				</Link>
				<Link href="/time-converter" className="card text-center transition-transform hover-scale">
					<h3 className="text-xl font-semibold mb-2">ממיר זמן</h3>
					<p className="text-sm text-secondary">המרת זמן בין אזורים</p>
				</Link>
				<Link href="/pomodoro" className="card text-center transition-transform hover-scale">
					<h3 className="text-xl font-semibold mb-2">פומודורו</h3>
					<p className="text-sm text-secondary">טכניקת ניהול זמן</p>
				</Link>
			</div>
		</div>
	)
}
