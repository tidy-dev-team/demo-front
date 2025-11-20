import React, { useMemo, useState } from "react";

function startOfMonth(date: Date) {
	return new Date(date.getFullYear(), date.getMonth(), 1);
}

function endOfMonth(date: Date) {
	return new Date(date.getFullYear(), date.getMonth() + 1, 0);
}

function addMonths(date: Date, n: number) {
	return new Date(date.getFullYear(), date.getMonth() + n, 1);
}

function isSameDay(a: Date, b: Date) {
	return (
		a.getFullYear() === b.getFullYear() &&
		a.getMonth() === b.getMonth() &&
		a.getDate() === b.getDate()
	);
}

export default function Calendar(): React.ReactElement {
	const [cursor, setCursor] = useState<Date>(startOfMonth(new Date()));
	const [selected, setSelected] = useState<Date | null>(null);

	const weeks = useMemo(() => {
		const start = startOfMonth(cursor);
		const end = endOfMonth(cursor);

		const days: Date[] = [];

		// Find the day of week for the first (0 = Sunday)
		const startWeekday = start.getDay();

		// Fill previous month days to align first day
		for (let i = 0; i < startWeekday; i++) {
			const d = new Date(start);
			d.setDate(d.getDate() - (startWeekday - i));
			days.push(d);
		}

		// Current month days
		for (let d = 1; d <= end.getDate(); d++) {
			days.push(new Date(cursor.getFullYear(), cursor.getMonth(), d));
		}

		// Fill trailing days to complete weeks (7 columns)
		while (days.length % 7 !== 0) {
			const last = days[days.length - 1];
			const d = new Date(last);
			d.setDate(d.getDate() + 1);
			days.push(d);
		}

		// Split into weeks
		const weeks: Date[][] = [];
		for (let i = 0; i < days.length; i += 7) {
			weeks.push(days.slice(i, i + 7));
		}

		return weeks;
	}, [cursor]);

	const monthLabel = cursor.toLocaleString(undefined, { month: "long", year: "numeric" });
	const today = new Date();

	return (
		<div className="max-w-md mx-auto bg-white border border-gray-200 rounded-lg shadow-sm">
			<div className="flex items-center justify-between px-4 py-3 border-b">
				<div>
					<div className="text-sm text-gray-500">Calendar</div>
					<div className="text-lg font-semibold">{monthLabel}</div>
				</div>

				<div className="flex items-center gap-2">
					<button
						aria-label="Previous month"
						onClick={() => setCursor((s) => addMonths(s, -1))}
						className="p-2 rounded hover:bg-gray-100"
					>
						‹
					</button>
					<button
						aria-label="Next month"
						onClick={() => setCursor((s) => addMonths(s, 1))}
						className="p-2 rounded hover:bg-gray-100"
					>
						›
					</button>
				</div>
			</div>

			<div className="p-4">
				<div className="grid grid-cols-7 text-xs text-center text-gray-500">
					{['Sun','Mon','Tue','Wed','Thu','Fri','Sat'].map((d) => (
						<div key={d} className="py-1">{d}</div>
					))}
				</div>

				<div className="mt-2 grid grid-cols-7 gap-1 text-sm">
					{weeks.map((week, wi) => (
						<React.Fragment key={wi}>
							{week.map((day) => {
								const isCurrentMonth = day.getMonth() === cursor.getMonth();
								const isToday = isSameDay(day, today);
								const isSelected = selected ? isSameDay(day, selected) : false;

								const base =
									"w-full aspect-square flex items-center justify-center rounded";

								const classes = [base];

								if (!isCurrentMonth) classes.push("text-gray-400");
								if (isToday) classes.push("ring-1 ring-primary/30 bg-primary/5");
								if (isSelected) classes.push("bg-primary text-white");

								return (
									<button
										key={day.toISOString()}
										onClick={() => setSelected(new Date(day))}
										className={classes.join(" ")}
										aria-pressed={isSelected}
									>
										<span className="select-none">{day.getDate()}</span>
									</button>
								);
							})}
						</React.Fragment>
					))}
				</div>
			</div>
		</div>
	);
}

