import { Button } from '@/components/ui/button';
import Link from 'next/link';
import prisma from '../lib/db';
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import { File } from 'lucide-react';

const getData = async (userId: string) => {
    const data = await prisma.note.findMany({
        where: {
            userId: userId,
        },
        orderBy: {
            createdAt: 'desc',
        },
    });
    return data;
};

const DashboardPage = async () => {
    const { getUser } = getKindeServerSession();
    const user = await getUser();
    const data = await getData(user?.id as string);

    return (
        <div className="grid items-start gap-y-8">
            <div className="flex items-center justify-between px-2">
                <div className="grid gap-1">
                    <h1 className="text-3xl md:text-4xl">Your Notes</h1>
                    <p className="text-lg text-muted-foreground">
                        Here you can see and create new notes
                    </p>
                </div>

                <Button asChild>
                    <Link href="/dashboard/new">Create a new Note</Link>
                </Button>
            </div>

            {data.length < 1 ? (
                <div className="flex min-h-[400px] flex-col items-center justify-center rounded-md border border-dashed p-8 text-center animate-in fade-in-50">
                    <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary/10">
                        <File className="w-10 h-10 text-primary"></File>
                    </div>
                    <h2 className="mt-6 text-xl font-semibold">
                        You dont have any notes created
                    </h2>
                    <p className="mb-8 mt-2 text-center text-sm leading-6 text-muted-foreground max-w-sm mx-auto">
                        You currently dont have any notes. Please create some
                        notes to see them here!
                    </p>
                    <Button asChild>
                        <Link href="/dashboard/new">Create a new Note</Link>
                    </Button>
                </div>
            ) : (
                <div></div>
            )}
        </div>
    );
};

export default DashboardPage;
