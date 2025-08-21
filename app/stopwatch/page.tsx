import { StopwatchPage } from "../ui/stopwatch/stopwatch";
import { Metadata } from "next";

export const metadata: Metadata = {
	title: 'סטופר'
} 

export default function Page() {
	return (
		<main>
			<StopwatchPage />
		</main>
	);
}