import { CreateForm } from '@/app/ui/person/create-form';

export default function CreatePersonPage() {
    return (
        <div className='p-10'>
            <h1 className='text-center mb-10'>Create</h1>
            <div className='max-w-[500px] mx-auto p-5 rounded-md'>
                <CreateForm />
            </div>
        </div>
    );
}
