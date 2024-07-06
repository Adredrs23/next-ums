import { Button } from '@/components/Atoms';

export const UserActionTile = ({
	children,
	actionLabel = 'Action',
}: {
	children?: React.ReactNode;
	actionLabel?: string;
}) => {
	return (
		<Button
			variant="secondary"
			className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-muted-foreground hover:text-white "
		>
			{children}
			<span>{actionLabel}</span>
		</Button>
	);
};
