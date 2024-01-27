import { fetchPersons } from '@/lib/data';
import { Search } from './ui/search';

export default async function Home() {
    const persons = await fetchPersons();
    return (
        <main className='container mt-20'>
            <Search />
            <div>
                {persons.map(person => (
                    <div>{person.name}</div>
                ))}
            </div>
        </main>
    );
}
