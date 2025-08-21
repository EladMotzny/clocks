import { TimeConverterPage } from "../ui/time-converter/time-converter";
import { Metadata } from "next";

export const metadata: Metadata = {
	title: 'ממיר זמן'
}

export default function Page() {
	return (
		<main>
			<TimeConverterPage />
		</main>
	);
}