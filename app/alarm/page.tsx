import {AlarmPage} from '@/app/ui/alarm/alarm'; 
import { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'שעון מעורר'
}

export default function Page() {

	return (
		<main>
			<AlarmPage />
		</main>
	);
}