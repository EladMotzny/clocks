import type { Metadata } from 'next'
import './globals.css'
import Nav from '@/components/Nav'

export const metadata: Metadata = {
	title: 'שעונים - Clock Website',
	description: 'אתר שעונים מקיף עם טיימר, סטופר, אזעקה ועוד',
	keywords: 'שעון, טיימר, סטופר, אזעקה, זמן עולמי',
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
