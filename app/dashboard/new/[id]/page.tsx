import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import Link from 'next/link';
import SubmitButtons from '@/app/components/SubmitButtons';
import prisma from '@/app/lib/db';
import { get } from 'http';
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import { unstable_noStore as noStore } from 'next/cache';
const getData = async ({
    userId,
    noteId,
}: {
    userId: string;
    noteId: string;
}) => {
    noStore();
    const data = await prisma.note.findUnique({
        where: {
            id: noteId,
            userId: userId,
        },
        select: {
            title: true,
            description: true,
            id: true,
        },
    });

    return data;
};

const DynamicRoute = async ({ params }: { params: { id: string } }) => {
    const { getUser } = getKindeServerSession();
    const user = await getUser();

    const data = await getData({
        userId: user?.id as string,
        noteId: params.id,
    });

    const postData = async (formData: FormData) => {
        'use server';
        if (!user) throw new Error('You are not allowed');

        const title = formData.get('title') as string;
        const description = formData.get('description') as string;

        await prisma.note.update({
            where: {
                id: data?.id,
                userId: user.id,
            },
            data: {
                description: description,
                title: title,
            },
        });

        revalidatePath('/dashboard');
        return redirect('/dashboard');
    };
    return (
        <Card>
            <form action={postData}>
                <CardHeader>
                    <CardTitle>Edit Note</CardTitle>
                    <CardDescription>
                        Right here you can now edit your note
                    </CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col gap-y-5">
                    <div className="gap-y-2 flex flex-col">
                        <Label>Title</Label>
                        <Input
                            required
                            type="text"
                            name="title"
                            placeholder="Title for your note"
                            defaultValue={data?.title}
                        ></Input>
                    </div>
                    <div className="flex flex-col gap-y-2">
                        <Label>Description</Label>
                        <Textarea
                            name="description"
                            placeholder="Describe your note as you want!"
                            required
                            defaultValue={data?.description}
                        />
                    </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                    <Button asChild variant="secondary">
                        <Link href="/dashboard">Cancel</Link>
                    </Button>
                    <SubmitButtons />
                </CardFooter>
            </form>
        </Card>
    );
};

export default DynamicRoute;
