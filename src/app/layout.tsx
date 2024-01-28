import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Link from 'next/link';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
    title: 'KIS Challenge',
    description: 'KIS 2024 Challenge',
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang='en'>
            <body className={inter.className}>
                <nav className='bg-gray-50'>
                    <li className='container flex gap-10 px-10 py-5'>
                        <Link href='/'>Inicio</Link>
                        <Link href='/person/create'>Crear</Link>
                    </li>
                </nav>

                {children}
            </body>
        </html>
    );
}
