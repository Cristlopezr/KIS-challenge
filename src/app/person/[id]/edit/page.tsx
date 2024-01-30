import { columns } from '@/app/ui/columns';
import { DataTable } from '@/app/ui/data-table';
import { EditForm } from '@/app/ui/person/edit-form';
import { fetchPersonById, fetchRegions, fetchRelationsById } from '@/lib/data';
import { formatDateToLocal } from '@/lib/utils';
import { notFound } from 'next/navigation';

export default async function EditPersonPage({ params }: { params: { id: string; page: string } }) {
    const id = params.id;
    const currentPage = Number(params?.page) || 1;
    const relations = await fetchRelationsById(id, currentPage);
    const person = await fetchPersonById(id);
    const regions = await fetchRegions();

    if(!person){
        notFound()
    }

    const [dob_day, dob_month, dob_year] = formatDateToLocal(person.dob).split('-');

    const newPerson = {
        ...person,
        dob_day,
        dob_month,
        dob_year,
    };

    return (
        <div className='p-5 lg:p-10'>
            <h1 className='text-center mb-10'>Editar persona</h1>
            <div className='p-5 rounded-md grid grid-cols-1 lg:grid-cols-2 gap-10 items-start'>
                <EditForm person={newPerson} regions={regions} />
                <div>
                    <p className='text-center mb-2'>Personas relacionadas</p>
                    <DataTable columns={columns} data={relations} />
                </div>
            </div>
        </div>
    );
}
