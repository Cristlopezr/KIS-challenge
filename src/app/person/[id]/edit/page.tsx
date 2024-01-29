import { EditForm } from '@/app/ui/person/edit-form';
import { fetchPersonById, fetchRegions } from '@/lib/data';
import { formatDateToLocal } from '@/lib/utils';

export default async function EditPersonPage({ params }: { params: { id: string } }) {
    const id = params.id;

    const person = await fetchPersonById(id);
    const regions = await fetchRegions();

    const [dob_day, dob_month, dob_year] = formatDateToLocal(person.dob).split('-');

    const newPerson = {
        ...person,
        dob_day,
        dob_month,
        dob_year,
    };

    return (
        <div className='p-5 md:p-10'>
            <h1 className='text-center mb-10'>Editar persona</h1>
            <div className='max-w-[700px] mx-auto md:p-5 rounded-md'>
                <EditForm person={newPerson} regions={regions} />
            </div>
        </div>
    );
}
