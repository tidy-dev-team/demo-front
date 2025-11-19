import React, { useEffect } from "react";
import { Button } from "@/components/ui/button";

export type PopupProps = {
	open: boolean;
	onClose: () => void;
	title?: string;
	children?: React.ReactNode;
	primaryLabel?: string;
	onPrimary?: () => void;
	secondaryLabel?: string;
	onSecondary?: () => void;
};

export function Popup({
	open,
	onClose,
	title,
	children,
	primaryLabel = "Save",
	onPrimary,
	secondaryLabel = "Cancel",
	onSecondary,
}: PopupProps) {
	useEffect(() => {
		function onKey(e: KeyboardEvent) {
			if (e.key === "Escape") onClose();
		}

		if (open) {
			window.addEventListener("keydown", onKey);
			// prevent background scroll while modal is open
			const prev = document.body.style.overflow;
			document.body.style.overflow = "hidden";
			return () => {
				window.removeEventListener("keydown", onKey);
				document.body.style.overflow = prev;
			};
		}

		return () => {};
	}, [open, onClose]);

	if (!open) return null;

	return (
		<div className="fixed inset-0 z-50 flex items-center justify-center">
			<div
				className="fixed inset-0 bg-black/40"
				onClick={onClose}
				aria-hidden
			/>

			<div
				role="dialog"
				aria-modal="true"
				className="relative z-10 w-full max-w-lg mx-4 bg-white rounded-lg shadow-lg ring-1 ring-black/5"
			>
				<div className="px-6 py-4 border-b">
					<div className="flex items-center justify-between">
						<h3 className="text-lg font-semibold">{title ?? "Modal title"}</h3>
						<button
							aria-label="Close"
							onClick={onClose}
							className="text-gray-500 hover:text-gray-700"
						>
							✕
						</button>
					</div>
				</div>

				<div className="p-6">{children}</div>

				<div className="px-6 py-4 border-t flex gap-2 justify-end">
					<Button
						variant="outline"
						onClick={() => {
							onSecondary?.();
							onClose();
						}}
					>
						{secondaryLabel}
					</Button>

					<Button
						onClick={() => {
							onPrimary?.();
							onClose();
						}}
					>
						{primaryLabel}
					</Button>
				</div>
			</div>
		</div>
	);
}

export default Popup;

