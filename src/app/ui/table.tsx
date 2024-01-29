import { fetchFilteredPersons } from '@/lib/data';
import { formatDateToLocal } from '@/lib/utils';
import { FilePenLine, Trash2 } from 'lucide-react';
import Link from 'next/link';
import { DeletePerson } from './person/deletePerson';
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { DataTable } from './data-table';
import { columns } from './columns';

export const CustomTable = async ({ query, currentPage }: { query: string; currentPage: number }) => {
    const persons = await fetchFilteredPersons(query, currentPage);
    return <DataTable columns={columns} data={persons} />;
};
