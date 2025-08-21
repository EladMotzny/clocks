"use client"

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'

export default function Nav() {
	const pathname = usePathname()
	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

	const links = [
		{ href: '/', label: 'שעון מקומי', icon: '🕐' },
		{ href: '/stopwatch', label: 'סטופר', icon: '⏱️' },
		{ href: '/timer', label: 'טיימר', icon: '⏰' },
		{ href: '/alarm', label: 'אזעקה', icon: '🔔' },
		{ href: '/world-time', label: 'שעון עולמי', icon: '🌍' },
		{ href: '/time-converter', label: 'ממיר זמן', icon: '🔄' },
		{ href: '/pomodoro', label: 'פומודורו', icon: '🍅' },
	]

	function toggleMobileMenu() {
		setIsMobileMenuOpen(!isMobileMenuOpen)
	}

	function closeMobileMenu() {
		setIsMobileMenuOpen(false)
	}

	return (
		<>
			{/* Mobile menu toggle button */}
			<button 
				className="mobile-menu-toggle" 
				onClick={toggleMobileMenu}
				aria-label="פתח תפריט"
			>
				{isMobileMenuOpen ? '✕' : '☰'}
			</button>

			{/* Sidebar */}
			<aside className={`sidebar ${isMobileMenuOpen ? 'open' : ''}`}>
				<div className="sidebar-header">
					<h1 className="sidebar-title">שעונים</h1>
					<p className="sidebar-subtitle">אתר שעונים מקיף</p>
				</div>
				
				<nav className="sidebar-nav">
					<ul className="sidebar-nav-list">
						{links.map(link => (
							<li key={link.href}>
								<Link 
									href={link.href} 
									className={`sidebar-nav-link ${pathname === link.href ? 'active' : ''}`}
									onClick={closeMobileMenu}
								>
									<span style={{ marginLeft: '0.5rem' }}>{link.icon}</span>
									{link.label}
								</Link>
							</li>
						))}
					</ul>
				</nav>
			</aside>

			{/* Mobile overlay */}
			{isMobileMenuOpen && (
				<div 
					className="mobile-overlay" 
					onClick={closeMobileMenu}
					style={{
						position: 'fixed',
						top: 0,
						left: 0,
						right: 0,
						bottom: 0,
						background: 'rgba(0, 0, 0, 0.5)',
						zIndex: 999,
					}}
				/>
			)}
		</>
	)
}

