import React, { type JSX } from "react";
import { Button } from "@/components/ui/button"

interface StatCardProps {
    title: string;
    value: string | number;
    subtitle?: string;
}

interface ComponentCardProps {
    name: string;
    desc?: string;
}

const Sidebar: React.FC = () => (
    <aside className="w-64 bg-white border-r border-gray-200 p-4 flex flex-col gap-6">
        <div className="text-xl font-semibold">Project</div>
        <nav className="flex-1">
            <ul className="space-y-2">
                <li className="px-3 py-2 rounded-md bg-gray-50 font-medium">Overview</li>
                <li className="px-3 py-2 rounded-md hover:bg-gray-50">Library</li>
                <li className="px-3 py-2 rounded-md hover:bg-gray-50">Components</li>
                <li className="px-3 py-2 rounded-md hover:bg-gray-50">Tokens</li>
            </ul>
        </nav>
        <div className="text-sm text-gray-500">Figma MCP • shadcn kit</div>
    </aside>
);

const Header: React.FC = () => (
    <header className="flex items-center justify-between px-6 py-4 border-b border-gray-200 bg-white">
        <div className="flex items-center gap-4">
            <h1 className="text-lg font-semibold">Dashboard</h1>
            <div className="relative">
                <input
                    type="search"
                    placeholder="Search components, pages..."
                    className="w-72 px-3 py-2 rounded-md border border-gray-200 focus:outline-none"
                />
            </div>
        </div>
        <div className="flex items-center gap-4">
            <Button>New</Button>
            <div className="w-8 h-8 rounded-full bg-gray-300" title="User" />
        </div>
    </header>
);

const StatCard: React.FC<StatCardProps> = ({ title, value, subtitle }) => (
    <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
        <div className="text-sm text-gray-500">{title}</div>
        <div className="mt-2 text-2xl font-bold">{value}</div>
        {subtitle && <div className="text-xs text-gray-400 mt-1">{subtitle}</div>}
    </div>
);

const ComponentCard: React.FC<ComponentCardProps> = ({ name, desc }) => (
    <div className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition">
        <div className="flex items-start justify-between">
            <div>
                <div className="font-medium">{name}</div>
                <div className="text-sm text-gray-500 mt-1">{desc}</div>
            </div>
            <div className="ml-4 w-10 h-10 rounded bg-gray-100" />
        </div>
        <div className="mt-3 flex gap-2">
            <Button>Open</Button>
            <Button>Preview</Button>
        </div>
    </div>
);

export default function Dashboard(): JSX.Element {
    const components: ComponentCardProps[] = [
        { name: "Button", desc: "Primary, secondary, ghost" },
        { name: "Card", desc: "Layouts & variants" },
        { name: "Avatar", desc: "User avatar component" },
        { name: "Modal", desc: "Dialog primitives" },
        { name: "Form", desc: "Form fields & validation" },
        { name: "Tabs", desc: "Navigation tabs" },
    ];

    return (
        <div className="min-h-screen bg-gray-50 flex">
            <Sidebar />
            <div className="flex-1 flex flex-col">
                <Header />
                <main className="p-6 grid grid-cols-12 gap-6">
                    <section className="col-span-8">
                        <div className="grid grid-cols-3 gap-4 mb-6">
                            <StatCard title="Files" value="18" subtitle="Updated today" />
                            <StatCard title="Components" value="62" subtitle="Shared across lib" />
                            <StatCard title="Tokens" value="24" subtitle="Color & Typography" />
                        </div>

                        <div className="bg-transparent">
                            <div className="mb-4 flex items-center justify-between">
                                <h2 className="text-lg font-semibold">Components</h2>
                                <div className="text-sm text-gray-500">Showing {components.length}</div>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                {components.map((c) => (
                                    <ComponentCard key={c.name} name={c.name} desc={c.desc} />
                                ))}
                            </div>
                        </div>
                    </section>

                    <aside className="col-span-4">
                        <div className="bg-white border border-gray-200 rounded-lg p-4 mb-4">
                            <div className="text-sm text-gray-500">Selected</div>
                            <div className="mt-3">
                                <div className="font-medium">Button — Primary</div>
                                <div className="text-xs text-gray-400 mt-1">Variant, size, tokens</div>
                            </div>
                            <div className="mt-4 space-y-2">
                                <label className="block text-xs text-gray-600">Variant</label>
                                <select className="w-full border rounded px-2 py-1">
                                    <option>Primary</option>
                                    <option>Secondary</option>
                                    <option>Ghost</option>
                                </select>
                                <label className="block text-xs text-gray-600 mt-2">Size</label>
                                <select className="w-full border rounded px-2 py-1">
                                    <option>md</option>
                                    <option>sm</option>
                                    <option>lg</option>
                                </select>
                            </div>
                        </div>

                        <div className="bg-white border border-gray-200 rounded-lg p-4">
                            <div className="text-sm text-gray-500">Figma Preview</div>
                            <div className="mt-3 h-40 bg-gray-50 border rounded flex items-center justify-center text-sm text-gray-400">
                                Embedded frame / preview
                            </div>
                            <div className="mt-3 flex gap-2">
                                <Button>Open in Figma</Button>
                                <Button>Sync</Button>
                            </div>
                        </div>
                    </aside>
                </main>
            </div>
        </div>
    );
}