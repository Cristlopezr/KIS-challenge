'use client';

import { formatDateToLocal } from '@/lib/utils';
import { ColumnDef } from '@tanstack/react-table';
import { QueryResultRow } from '@vercel/postgres';

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
];
