'use client';

import { usePathname, useSearchParams, useRouter } from 'next/navigation';
import { useDebouncedCallback } from 'use-debounce';
import React from 'react';
import { Input } from '@/components/ui/input';
import { SearchIcon } from 'lucide-react';

export const Search = () => {
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const { replace } = useRouter();

    const handleSearch = useDebouncedCallback((term: string) => {
        const params = new URLSearchParams(searchParams);
        params.set('page', '1');
        if (term) {
            params.set('query', term);
        } else {
            params.delete('query');
        }
        replace(`${pathname}?${params.toString()}`);
    }, 300);

    return (
        <div className='relative mb-10'>
            <Input
                className='px-14 py-6'
                placeholder='Buscar'
                onChange={e => handleSearch(e.target.value)}
                defaultValue={searchParams.get('query')?.toString()}
            />
            <SearchIcon className='absolute top-1/2 left-5 -translate-y-1/2' />
        </div>
    );
};
