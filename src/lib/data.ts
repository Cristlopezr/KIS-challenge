import { unstable_noStore } from 'next/cache';
import { sql } from '@vercel/postgres';
import { Commune, FormItems, Person, Region } from './interfaces';

export async function fetchPersons() {
    unstable_noStore();

    try {
        //name, lastname, email, dob, phone, address, sex, rut
        const data = await sql`SELECT * FROM persona`;

        return data.rows;
    } catch (error) {
        console.error('Error en la base de datos:', error);
        throw new Error('Ocurrio un error al obtener la información de las personas.');
    }
}

const ITEMS_PER_PAGE = 6;
export async function fetchFilteredPersons(query: string, currentPage: number) {
    unstable_noStore();
    const offset = (currentPage - 1) * ITEMS_PER_PAGE;

    try {
        const persons = await sql`
        SELECT persona.*, 
        comuna.name AS comuna, region.name AS region
        FROM persona
        JOIN comuna ON persona.commune_id = comuna.id
        JOIN region ON comuna.region_id = region.id
        WHERE
            persona.name ILIKE ${`%${query}%`} OR
            persona.lastname ILIKE ${`%${query}%`} OR
            persona.rut ILIKE ${`%${query}%`} OR
            persona.sex ILIKE ${`%${query}%`} OR
            persona.phone ILIKE ${`%${query}%`} OR
            persona.number ILIKE ${`%${query}%`} OR
            persona.street ILIKE ${`%${query}%`} OR
            persona.sex ILIKE ${`%${query}%`} OR
            persona.email ILIKE ${`%${query}%`} OR
            comuna.name ILIKE ${`%${query}%`} OR
            region.name ILIKE ${`%${query}%`} OR
            to_char(dob, 'DD Mon YYYY') ILIKE ${`%${query}%`} OR
            to_char(dob, 'DD/MM/YYYY') ILIKE ${`%${query}%`} OR
            to_char(dob, 'DD-MM-YYYY') ILIKE ${`%${query}%`}
        ORDER BY persona.name DESC
        LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}
      `;
        return persons.rows;
    } catch (error) {
        console.error('Error en la base de datos:', error);
        throw new Error('Ocurrio un error al obtener las personas.');
    }
}

export async function fetchPersonsPages(query: string) {
    unstable_noStore();
    try {
        const count = await sql`SELECT COUNT(*)
        FROM persona
        JOIN comuna ON persona.commune_id = comuna.id
        JOIN region ON comuna.region_id = region.id
        WHERE
            persona.name ILIKE ${`%${query}%`} OR
            persona.lastname ILIKE ${`%${query}%`} OR
            persona.rut ILIKE ${`%${query}%`} OR
            persona.sex ILIKE ${`%${query}%`} OR
            persona.phone ILIKE ${`%${query}%`} OR
            persona.number ILIKE ${`%${query}%`} OR
            persona.street ILIKE ${`%${query}%`} OR
            persona.sex ILIKE ${`%${query}%`} OR
            persona.email ILIKE ${`%${query}%`} OR
            comuna.name ILIKE ${`%${query}%`} OR
            region.name ILIKE ${`%${query}%`} OR
            to_char(dob, 'DD Mon YYYY') ILIKE ${`%${query}%`} OR
            to_char(dob, 'DD/MM/YYYY') ILIKE ${`%${query}%`} OR
            to_char(dob, 'DD-MM-YYYY') ILIKE ${`%${query}%`}
    `;
        const totalPages = Math.ceil(Number(count.rows[0].count) / ITEMS_PER_PAGE);
        return totalPages;
    } catch (error) {
        console.error('Error en la base de datos:', error);
        throw new Error('Ocurrio un error al obtener el número total de páginas de personas.');
    }
}

export async function fetchPersonById(id: string) {
    unstable_noStore();
    try {
        const person =
            await sql<Person>`SELECT persona.*, comuna.name AS comuna, region.name AS region FROM persona 
        JOIN comuna ON(persona.commune_id=comuna.id) 
        JOIN region ON(comuna.region_id=region.id) 
        WHERE persona.id=${id}`;
        return person.rows[0];
    } catch (error) {
        console.error('Error en la base de datos:', error);
        throw new Error('Ocurrio un error al obtener la persona.');
    }
}

export async function fetchRegions() {
    try {
        const regions = await sql<Region>`SELECT * FROM region`;
        return regions.rows;
    } catch (error) {
        console.error('Error en la base de datos:', error);
        throw new Error('Ocurrio un error al obtener las regiones.');
    }
}

export const createFormItems: FormItems[] = [
    {
        id: 'name',
        label: 'Nombre',
        type: 'text',
        placeholder: 'Nombre',
    },
    {
        id: 'lastname',
        label: 'Apellido',
        type: 'text',
        placeholder: 'Apellido',
    },
    {
        id: 'rut',
        label: 'Rut',
        type: 'text',
        placeholder: 'Rut',
    },
    {
        id: 'sex',
        label: 'Sexo',
        placeholder: 'Sexo',
    },
    {
        id: 'phone',
        label: 'Teléfono',
        type: 'text',
        placeholder: 'Teléfono',
    },
    {
        id: 'address',
        label: 'Dirección',
        type: 'text',
        placeholder: 'Dirección',
    },
    {
        id: 'dob_day',
        label: 'Día',
        placeholder: 'Día',
    },
    {
        id: 'dob_month',
        label: 'Mes',
        placeholder: 'Mes',
    },
    {
        id: 'dob_year',
        label: 'Año',
        placeholder: 'Año',
    },
    {
        id: 'email',
        label: 'Correo electrónico',
        type: 'text',
        placeholder: 'Correo electrónico',
    },
];

export const months = [
    { month: 'Enero', value: '01' },
    { month: 'Febrero', value: '02' },
    { month: 'Marzo', value: '03' },
    { month: 'Abril', value: '04' },
    { month: 'Mayo', value: '05' },
    { month: 'Junio', value: '06' },
    { month: 'Julio', value: '07' },
    { month: 'Agosto', value: '08' },
    { month: 'Septiembre', value: '09' },
    { month: 'Octubre', value: '10' },
    { month: 'Noviembre', value: '11' },
    { month: 'Diciembre', value: '12' },
];
