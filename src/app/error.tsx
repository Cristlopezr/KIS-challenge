'use client';

import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function Error() {
    return (
        <main className='flex items-center justify-center flex-col gap-10 mt-40'>
            <h2 className='text-center'>Ha ocurrido un error.</h2>
            <Link href='/'>
                <Button>Ir al inicio</Button>
            </Link>
        </main>
    );
}
