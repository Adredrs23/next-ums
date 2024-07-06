'use client';

import { usePathname } from 'next/navigation';

import Link from 'next/link';
import { Package2, Settings, Users2 } from 'lucide-react';

import {
	Tooltip,
	TooltipContent,
	TooltipTrigger,
	TooltipProvider,
} from '@/components/Atoms';

export const NavLinks = [
	{ name: 'Users', path: '/users', icon: <Users2 className="h-5 w-5" /> },
];

export const SidePanel = () => {
	const pathname = usePathname();
	const isActive = (path: string) => path === pathname;

	return (
		<TooltipProvider>
			<aside className="fixed inset-y-0 left-0 z-10 hidden w-14 flex-col border-r bg-background sm:flex">
				<nav className="flex flex-col items-center gap-4 px-2 sm:py-5">
					<Link
						href="/"
						className="group flex h-9 w-9 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:h-8 md:w-8 md:text-base"
					>
						<Package2 className="h-4 w-4 transition-all group-hover:scale-110" />
						<span className="sr-only">Acme Inc</span>
					</Link>

					{NavLinks.map((link) => (
						<Tooltip key={link.name}>
							<TooltipTrigger asChild>
								<Link
									href={link.path}
									className={`flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8 ${
										isActive(link.path) ? 'bg-secondary' : ''
									}`}
								>
									{link.icon}
									<span className="sr-only">{link.name}</span>
								</Link>
							</TooltipTrigger>
							<TooltipContent side="right">{link.name}</TooltipContent>
						</Tooltip>
					))}
				</nav>

				<nav className="mt-auto flex flex-col items-center gap-4 px-2 sm:py-5">
					<Tooltip>
						<TooltipTrigger asChild>
							<Link
								href="#"
								className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
							>
								<Settings className="h-5 w-5" />
								<span className="sr-only">Settings</span>
							</Link>
						</TooltipTrigger>
						<TooltipContent side="right">Settings</TooltipContent>
					</Tooltip>
				</nav>
			</aside>
		</TooltipProvider>
	);
};
