import { TimerPage } from "../ui/timer/timer";
import { Metadata } from "next";

export const metadata: Metadata = {
	title: 'טיימר'
} 

export default function Page() {
	return (
		<main>
			<TimerPage />
		</main>
	);
}