'use client';

import { formatDateToLocal } from '@/lib/utils';
import { ColumnDef } from '@tanstack/react-table';
import { QueryResultRow } from '@vercel/postgres';
import { DeletePerson } from './person/deletePerson';
import Link from 'next/link';
import { FilePenLine, MoreHorizontal } from 'lucide-react';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';

export const columns: ColumnDef<QueryResultRow, unknown>[] = [
    {
        accessorKey: 'name',
        header: 'Nombre',
        accessorFn: ({ name, lastname }) => `${name} ${lastname}`,
    },
    {
        accessorKey: 'rut',
        header: 'Rut',
    },
    {
        accessorKey: 'sex',
        header: 'Sexo',
    },
    {
        accessorKey: 'email',
        header: 'Correo electrónico',
    },
    {
        accessorKey: 'phone',
        header: 'Teléfono',
    },
    {
        accessorKey: 'address',
        header: 'Dirección',
        accessorFn: ({ number, street, comuna, region }) => `${number} ${street} ${comuna} ${region}`,
    },
    {
        accessorKey: 'dob',
        header: 'Fecha de nacimiento',
        accessorFn: ({ dob }) => formatDateToLocal(dob),
    },
    {
        accessorKey: 'actions',
        header: 'Acciones',
        cell: ({ row }) => {
            return (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant='ghost' className='h-8 w-8 p-0'>
                            <span className='sr-only'>Open menu</span>
                            <MoreHorizontal className='h-4 w-4' />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align='end'>
                        <DropdownMenuItem>
                            <Link href={`/person/${row.original.id}/edit`} className='pb-1 w-full'>
                                Editar
                            </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                            <DeletePerson id={row.original.id} />
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            );

            /*  return (
                <div className='flex justify-end items-start gap-3'>
                    <Link href={`/person/${row.original.id}/edit`} className='pb-1'>
                        <FilePenLine className='text-primary' />
                    </Link>
                    <DeletePerson id={row.original.id} />
                </div>
            ); */
        },
    },
];
