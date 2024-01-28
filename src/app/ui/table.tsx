import { fetchFilteredPersons } from '@/lib/data';
import { formatDateToLocal } from '@/lib/utils';
import { FilePenLine, Trash2 } from 'lucide-react';
import Link from 'next/link';

export const Table = async ({ query, currentPage }: { query: string; currentPage: number }) => {
    const persons = await fetchFilteredPersons(query, currentPage);
    return (
        <div className='mt-10 rounded-lg bg-gray-50 pb-2 px-2 relative overflow-x-auto'>
            {/* <div className='lg:hidden grid grid-cols-1 sm:grid-cols-2'>
                        {persons?.map(person => (
                            <div key={person.id} className='mb-2 w-full rounded-md bg-white p-4'>
                                <div className='flex items-center justify-between border-b pb-4'>
                                    <div>
                                        <div className='mb-2 flex items-center'>
                                            <p>{person.name}</p>
                                        </div>
                                        <p className='text-sm text-gray-500'>{person.email}</p>
                                    </div>
                                </div>
                                <div className='flex w-full items-center justify-between pt-4'>
                                    <div>
                                        <p className='text-xl font-medium'>{formatDateToLocal(person.dob)}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div> */}
            <table className='min-w-full text-primary'>
                <thead className='rounded-lg text-left text-sm font-normal'>
                    <tr>
                        <th scope='col' className='px-4 py-5 font-medium sm:pl-6'>
                            Nombre
                        </th>
                        <th scope='col' className='px-3 py-5 font-medium'>
                            Rut
                        </th>
                        <th scope='col' className='px-3 py-5 font-medium'>
                            Sexo
                        </th>
                        <th scope='col' className='px-3 py-5 font-medium'>
                            Email
                        </th>
                        <th scope='col' className='px-3 py-5 font-medium'>
                            Teléfono
                        </th>
                        <th scope='col' className='px-3 py-5 font-medium'>
                            Dirección
                        </th>
                        <th scope='col' className='px-3 py-5 font-medium'>
                            Fecha de nacimiento
                        </th>
                        <th scope='col' className='relative py-3 pl-6 pr-3'>
                            <span className='sr-only'>Editar</span>
                        </th>
                    </tr>
                </thead>
                <tbody className='bg-white'>
                    {persons?.map(person => (
                        <tr
                            key={person.id}
                            className='w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg'
                        >
                            <td className='whitespace-nowrap py-3 pl-6 pr-3'>
                                <div className='flex items-center gap-3'>
                                    <p>
                                        {person.name} {person.lastname}
                                    </p>
                                </div>
                            </td>
                            <td className='whitespace-nowrap px-3 py-3'>{person.rut}</td>
                            <td className='whitespace-nowrap px-3 py-3'>{person.sex}</td>
                            <td className='whitespace-nowrap px-3 py-3'>{person.email}</td>
                            <td className='whitespace-nowrap px-3 py-3'>{person.phone}</td>
                            <td className='whitespace-nowrap px-3 py-3'>{person.number} {person.street} {person.comuna} {person.region}</td>
                            <td className='whitespace-nowrap px-3 py-3'>{formatDateToLocal(person.dob)}</td>
                            <td className='whitespace-nowrap py-3 pl-6 pr-3'>
                                <div className='flex justify-end gap-3'>
                                    <Link href={`/person/${person.id}/edit`}>
                                        <FilePenLine className='text-primary' />
                                    </Link>
                                    <Trash2 className='cursor-pointer text-destructive' />
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};
