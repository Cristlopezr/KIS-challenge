import { fetchPersons, fetchPersonsPages } from '@/lib/data';
import { Search } from './ui/search';
import { Table } from './ui/table';

export default async function Home({ searchParams }: { searchParams?: { page: string; query: string } }) {
    const query = searchParams?.query || '';
    /* const persons = await fetchPersons(); */
    const currentPage = Number(searchParams?.page) || 1;

    const totalPages = await fetchPersonsPages(query);

    return (
        <main className='container mt-20'>
            <Search />
            <Table query={query} currentPage={currentPage} />
        </main>
    );
}
