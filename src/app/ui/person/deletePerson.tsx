'use client';

import { deletePerson } from '@/lib/actions';
import {
    AlertDialog,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Loader2, TrashIcon } from 'lucide-react';
import { useState } from 'react';
import { useUiStore } from '@/store/ui-store';
import { Button } from '@/components/ui/button';

export function DeletePerson({ id }: { id: string }) {
    const onShowAlert = useUiStore(state => state.onShowAlert);
    const [isAlertOpen, setIsAlertOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const onDeletePerson = async () => {
        setIsLoading(true);
        try {
            await deletePerson(id);
            onShowAlert('success', 'Usuario eliminado correctamente.', 'Éxito');
            setIsLoading(false);
            setIsAlertOpen(false);
        } catch (error: any) {
            onShowAlert('error', error?.message, 'Error');
            setIsLoading(false);
            setIsAlertOpen(false);
        }
    };

    return (
        <AlertDialog open={isAlertOpen}>
            <AlertDialogTrigger className='cursor-pointer' asChild onClick={() => setIsAlertOpen(true)}>
                <TrashIcon className='text-destructive' />
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>¿Estás seguro?</AlertDialogTitle>
                    <AlertDialogDescription>
                        El usuario será eliminado definitivamente. Esta acción no se puede deshacer.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel onClick={() => setIsAlertOpen(false)}>Volver atrás</AlertDialogCancel>
                    <Button
                        disabled={isLoading}
                        onClick={onDeletePerson}
                        className='bg-destructive text-white hover:bg-destructive/80'
                    >
                        {isLoading ? (
                            <>
                                Procesando...
                                <Loader2 className='animate-spin' />
                            </>
                        ) : (
                            'Borrar'
                        )}
                    </Button>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}
