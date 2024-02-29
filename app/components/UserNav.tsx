import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { LogoutLink } from '@kinde-oss/kinde-auth-nextjs/components';
import Link from 'next/link';
import { CreditCard, DoorClosed, Home, Settings } from 'lucide-react';

export const navItems = [
    {
        name: 'Home',
        href: '/dashboard',
        icon: Home,
    },
    {
        name: 'Settings',
        href: '/dashboard/settings',
        icon: Settings,
    },
    {
        name: 'Billing',
        href: '/dashboard/billing',
        icon: CreditCard,
    },
];

const UserNav = ({
    name,
    email,
    image,
}: {
    name: string;
    email: string;
    image: string;
}) => {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button
                    variant="ghost"
                    className="relative h-10 w-10 rounded-full"
                >
                    <Avatar className="h-10 w-10 rounded-full">
                        <AvatarImage src={image} alt="Avatar" />
                        {/* Si la imagen esta rota o pasa algo con ella se mostrara un string en este caso ARV */}
                        <AvatarFallback>ARV</AvatarFallback>
                    </Avatar>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel>
                    <div className="flex flex-col space-y-1">
                        <p className="text-sm font-medium leading-none">
                            {name}
                        </p>
                        <p className="text-xs leading-none text-muted-foreground">
                            {email}
                        </p>
                    </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                    {navItems.map((item, index) => (
                        <DropdownMenuItem asChild key={index}>
                            <Link
                                href={item.href}
                                className="w-full flex justify-between items-center cursor-pointer"
                            >
                                {item.name}
                                <span>
                                    <item.icon className="w-4 h-4" />
                                </span>
                            </Link>
                        </DropdownMenuItem>
                    ))}
                </DropdownMenuGroup>
                <DropdownMenuSeparator />

                <DropdownMenuItem
                    className="w-full flex justify-between items-center"
                    asChild
                >
                    <LogoutLink className="cursor-pointer">
                        Logout{' '}
                        <span>
                            <DoorClosed className="w-4 h-4" />
                        </span>
                    </LogoutLink>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

export default UserNav;
