import { fetchFilteredPersons } from '@/lib/data';
import { DataTable } from './data-table';
import { columns } from './columns';

export const CustomTable = async ({ query, currentPage }: { query: string; currentPage: number }) => {
    const persons = await fetchFilteredPersons(query, currentPage);
    return <DataTable columns={columns} data={persons} />;
};
