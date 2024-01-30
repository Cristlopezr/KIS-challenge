import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function NotFound() {
    return (
        <div className='flex items-center justify-center flex-col gap-10 mt-40'>
            <h1>El recurso que ha solicitado no se ha encontrado.</h1>
            <p className='text-8xl'>404</p>
            <Link href='/'>
                <Button>Ir al inicio</Button>
            </Link>
        </div>
    );
}
