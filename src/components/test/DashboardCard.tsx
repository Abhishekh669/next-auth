import Link from 'next/link';
import { LucideIcon } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface NavItemProps {
  href: string;
  label: string;
  icon: LucideIcon;
  badgeCount?: number;
  isActive: boolean;
  onClick?: () => void;
}

const NavItem: React.FC<NavItemProps> = ({ href, label, icon: Icon, badgeCount, isActive, onClick }) => (
  <Link
    href={href}
    className={`mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 ${isActive ? 'bg-muted text-foreground' : 'text-muted-foreground hover:text-foreground'}`}
    onClick={onClick}
    prefetch={false}
  >
    <Icon className="h-5 w-5" />
    {label}
    {badgeCount !== undefined && (
      <Badge className="ml-auto flex h-6 w-6 shrink-0 items-center justify-center rounded-full">
        {badgeCount}
      </Badge>
    )}
  </Link>
);

export default NavItem;
