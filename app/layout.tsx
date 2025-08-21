import type { Metadata } from 'next'
import './globals.css'
import Nav from '@/components/Nav'

export const metadata: Metadata = {
	title: { 
		template: '%s | אתר השעונים',
		default: 'אתר השעונים' 
	},
	description: 'אתר שעונים מקיף עם טיימר, סטופר, שעון מעורר ועוד',
	keywords: 'שעון, טיימר, סטופר, שעון מעורר, זמן עולמי, פומודורו',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="he" dir="rtl">
			<head>
				<link rel="preconnect" href="https://fonts.googleapis.com" />
				<link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
				<link
					href="https://fonts.googleapis.com/css2?family=Heebo:wght@300;400;500;600;700&display=swap"
					rel="stylesheet"
				/>
			</head>
			<body className="font-hebrew">
				<Nav />
				<main className="main-content">
					{children}
				</main>
			</body>
		</html>
	)
}
