import { PomodoroPage } from "../ui/pomodoro/pomodoro";
import { Metadata } from "next";

export const metadata: Metadata = {
	title: 'שעון פומודורו'
}

export default function Page() {
	return(
		<main>
			<PomodoroPage />
		</main>
	);
}