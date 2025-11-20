import React from "react";
import Calendar from "./Calendar";
import { Button } from "@/components/ui/button";

export default function Calendars(): React.ReactElement {
	const calendars = [
		{ id: "1", name: "Work", color: "bg-blue-500", checked: true },
		{ id: "2", name: "Personal", color: "bg-green-500", checked: true },
		{ id: "3", name: "Holidays", color: "bg-rose-400", checked: false },
	];

	return (
		<div className="min-h-screen bg-gray-50 p-6">
			<div className="max-w-7xl mx-auto grid grid-cols-12 gap-6">
				<main className="col-span-8">
					<div className="flex items-start justify-between gap-4 mb-6">
						<div>
							<h1 className="text-2xl font-semibold">Calendars</h1>
							<p className="text-sm text-gray-500">View and manage your calendars</p>
						</div>

						<div className="flex items-center gap-3">
							<input
								aria-label="Search calendars"
								placeholder="Search calendars or events"
								className="border rounded-md px-3 py-2 text-sm w-64"
							/>
							<Button variant="secondary" size="sm">New event</Button>
						</div>
					</div>

					<section className="bg-white border border-gray-200 rounded-lg p-4">
						<div className="mb-4 flex items-center justify-between">
							<h2 className="text-lg font-medium">Month view</h2>
							<div className="text-sm text-gray-500">Showing this month</div>
						</div>

						<Calendar />
					</section>
				</main>

				<aside className="col-span-4">
					<div className="bg-white border border-gray-200 rounded-lg p-4 mb-4">
						<div className="flex items-center justify-between">
							<div>
								<div className="text-sm text-gray-500">My Calendars</div>
								<div className="text-lg font-medium">Visible calendars</div>
							</div>
							<Button size="sm" variant="outline">Add</Button>
						</div>

						<div className="mt-4 space-y-3">
							{calendars.map((c) => (
								<label key={c.id} className="flex items-center gap-3">
									<input type="checkbox" defaultChecked={c.checked} />
									<span className={`inline-block w-3 h-3 rounded ${c.color}`} />
									<span className="text-sm">{c.name}</span>
								</label>
							))}
						</div>
					</div>

					<div className="bg-white border border-gray-200 rounded-lg p-4">
						<div className="text-sm text-gray-500">Quick actions</div>
						<div className="mt-3 flex flex-col gap-2">
							<Button variant="ghost" size="sm">Import calendar</Button>
							<Button variant="ghost" size="sm">Export</Button>
						</div>
					</div>
				</aside>
			</div>
		</div>
	);
}
