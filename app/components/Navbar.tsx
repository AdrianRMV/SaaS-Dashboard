import Link from 'next/link';
import React from 'react';
import { ThemeToggle } from './ThemeToggle';
import { Button } from '@/components/ui/button';
import {
    RegisterLink,
    LoginLink,
} from '@kinde-oss/kinde-auth-nextjs/components';
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import UserNav from './UserNav';

const Navbar = async () => {
    const { isAuthenticated, getUser } = getKindeServerSession();
    const user = await getUser();

    return (
        <nav className="border-b bg-background h-[10vh] flex items-center">
            <div className="container flex items-center justify-between gap-x-5 md:gap-x-0">
                <Link href="/">
                    <h1 className="font-bold text-xl sm:text-3xl">
                        ARV<span className="text-primary">SAAS</span>
                    </h1>
                </Link>

                <div className="flex items-center gap-x-5">
                    <ThemeToggle />

                    {(await isAuthenticated()) ? (
                        <div className="flex items-center gap-x-5">
                            <UserNav
                                email={user?.email as string}
                                image={user?.picture as string}
                                name={user?.given_name as string}
                            />
                        </div>
                    ) : (
                        <div className="flex items-center gap-x-2 sm:gap-x-5">
                            <LoginLink>
                                <Button>Sign In</Button>
                            </LoginLink>
                            <RegisterLink>
                                <Button variant="secondary">Sign Up</Button>
                            </RegisterLink>
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
