export const dynamic = 'force-dynamic';
export const revalidate = 0;

import { fetchPersonsPages } from '@/lib/data';
import { Search } from './ui/search';
import { CustomTable } from './ui/table';
import { Pagination } from './ui/pagination';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default async function Home({ searchParams }: { searchParams?: { page: string; query: string } }) {
    const query = searchParams?.query || '';

    const currentPage = Number(searchParams?.page) || 1;

    const totalPages = await fetchPersonsPages(query);

    return (
        <main className='xl:container mt-20 px-2 lg:px-10'>
            <Link href='/person/create'>
                <Button className='block ml-auto mr-2 mb-5'>Crear</Button>
            </Link>

            <Search />
            <CustomTable query={query} currentPage={currentPage} />
            <div className='mt-5 flex items-center justify-center'>
                <Pagination totalPages={totalPages} />
            </div>
        </main>
    );
}
