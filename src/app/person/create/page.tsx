import { CreateForm } from '@/app/ui/person/create-form';
import { fetchRegions } from '@/lib/data';

export default async function CreatePersonPage() {
    const regions = await fetchRegions();

    return (
        <div className='p-5 md:p-10'>
            <h1 className='text-center mb-10'>Nueva persona</h1>
            <div className='max-w-[700px] mx-auto md:p-5 rounded-md'>
                <CreateForm regions={regions} />
            </div>
        </div>
    );
}
