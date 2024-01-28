import { CreateForm } from '@/app/ui/person/create-form';

export default function CreatePersonPage() {
    return (
        <div className='p-5 md:p-10'>
            <h1 className='text-center mb-10'>Nueva persona</h1>
            <div className='max-w-[700px] mx-auto md:p-5 rounded-md'>
                <CreateForm />
            </div>
        </div>
    );
}
