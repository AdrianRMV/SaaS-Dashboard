import SubmitButtons from '@/app/components/SubmitButtons';
import { Button } from '@/components/ui/button';
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
import { Textarea } from '@/components/ui/textarea';
import Link from 'next/link';

const NewNoteRoute = () => {
    return (
        <Card>
            <form>
                <CardHeader>
                    <CardTitle>New Note</CardTitle>
                    <CardDescription>
                        Right here you can now create your note
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
                        ></Input>
                    </div>
                    <div className="flex flex-col gap-y-2">
                        <Label>Description</Label>
                        <Textarea
                            name="description"
                            placeholder="Describe your note as you want!"
                            required
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

export default NewNoteRoute;
