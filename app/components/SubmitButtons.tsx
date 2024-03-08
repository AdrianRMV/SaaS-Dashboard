'use client';

import { Button } from '@/components/ui/button';
import { Loader, Loader2, Trash } from 'lucide-react';
import { useFormStatus } from 'react-dom';

const SubmitButtons = () => {
    const { pending } = useFormStatus();
    return (
        <>
            {pending ? (
                <Button disabled className="w-fit">
                    <Loader2 className="mr-2 w-4 h-4 animate-spin" /> Please
                    wait
                </Button>
            ) : (
                <Button type="submit" className="w-fit">
                    Save now
                </Button>
            )}
        </>
    );
};

export default SubmitButtons;

export function StripeSubscriptionCreationButton() {
    const { pending } = useFormStatus();

    return (
        <>
            {pending ? (
                <Button disabled className="w-full">
                    <Loader2 className="mr-2 w-4 h-4 animate-spin" /> Please
                    wait
                </Button>
            ) : (
                <Button className="w-full" type="submit">
                    Create Subscription
                </Button>
            )}
        </>
    );
}

export function StripePortal() {
    const { pending } = useFormStatus();
    return (
        <>
            {pending ? (
                <Button disabled className="w-fit">
                    <Loader2 className="mr-2 w-4 h-4 animate-spin" /> Please
                    wait
                </Button>
            ) : (
                <Button className="w-fit" type="submit">
                    View Payment details
                </Button>
            )}
        </>
    );
}

export function TrashDelete() {
    const { pending } = useFormStatus();
    return (
        <>
            {pending ? (
                <Button variant={'destructive'} size="icon" disabled>
                    <Loader2 className="w-4 h-4 animate-spin" />
                </Button>
            ) : (
                <Button variant={'destructive'} size="icon" type="submit">
                    <Trash className="w-4 h-4" />
                </Button>
            )}
        </>
    );
}
