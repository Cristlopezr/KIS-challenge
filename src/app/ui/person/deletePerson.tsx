import { deletePerson } from '@/lib/actions';
import { DeleteAlert } from '../delete-alert';
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
import { TrashIcon } from 'lucide-react';

export function DeletePerson({ id }: { id: string }) {
    const deletePersonWithId = deletePerson.bind(null, id);

    return (
        <AlertDialog>
            <AlertDialogTrigger>
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
                    <AlertDialogCancel>Volver atrás</AlertDialogCancel>
                    <form action={deletePersonWithId}>
                        <DeleteAlert />
                    </form>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}
