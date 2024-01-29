'use client';

import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';
import { useFormStatus } from 'react-dom';

export const DeleteAlert = () => {
    const { pending } = useFormStatus();

    return (
        <Button
            disabled={pending}
            type='submit'
            className='bg-destructive text-white hover:bg-destructive/80'
        >
            {pending ? (
                <>
                    Procesando...
                    <Loader2 className='animate-spin' />
                </>
            ) : (
                'Borrar'
            )}
        </Button>
    );
};
