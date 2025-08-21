import { WorldTimePage } from "../ui/world-time/world-time";
import { Metadata } from "next";

export const metadata: Metadata = {
	title: 'שעון עולמי'
}

export default function Page() {
	return (
		<main>
			<WorldTimePage />
		</main>
	);
}