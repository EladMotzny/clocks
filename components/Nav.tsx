"use client"

import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function Nav() {
	const pathname = usePathname()

	const links = [
		{ href: '/', label: 'שעון נוכחי' },
		{ href: '/stopwatch', label: 'סטופר' },
		{ href: '/timer', label: 'טיימר' },
		{ href: '/alarm', label: 'אזעקה' },
		{ href: '/world-time', label: 'זמן עולמי' },
		{ href: '/time-converter', label: 'ממיר זמן' },
		{ href: '/pomodoro', label: 'פומודורו' },
	]

	return (
		<nav className="nav">
			<div className="container">
				<ul className="nav-list">
					{links.map(link => (
						<li key={link.href}>
							<Link href={link.href} className={`nav-link ${pathname === link.href ? 'active' : ''}`}>
								{link.label}
							</Link>
						</li>
					))}
				</ul>
			</div>
		</nav>
	)
}

