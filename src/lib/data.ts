import { unstable_noStore } from 'next/cache';
import { sql } from '@vercel/postgres';
import { FormItems } from './interfaces';

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

const ITEMS_PER_PAGE = 3;
export async function fetchFilteredPersons(query: string, currentPage: number) {
    unstable_noStore();
    const offset = (currentPage - 1) * ITEMS_PER_PAGE;

    try {
        const persons = await sql`
        SELECT *
        FROM persona
        WHERE
            name ILIKE ${`%${query}%`} OR
            lastname ILIKE ${`%${query}%`} OR
            rut ILIKE ${`%${query}%`} OR
            sex ILIKE ${`%${query}%`} OR
            phone ILIKE ${`%${query}%`} OR
            address ILIKE ${`%${query}%`} OR
            sex ILIKE ${`%${query}%`} OR
            email ILIKE ${`%${query}%`} OR
            to_char(dob, 'DD Mon YYYY') ILIKE ${`%${query}%`} OR
            to_char(dob, 'DD/MM/YYYY') ILIKE ${`%${query}%`} OR
            to_char(dob, 'DD-MM-YYYY') ILIKE ${`%${query}%`}
        ORDER BY dob ASC
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
      WHERE
        name ILIKE ${`%${query}%`} OR
        lastname ILIKE ${`%${query}%`} OR
        rut ILIKE ${`%${query}%`} OR
        sex ILIKE ${`%${query}%`} OR
        phone ILIKE ${`%${query}%`} OR
        address ILIKE ${`%${query}%`} OR
        sex ILIKE ${`%${query}%`} OR
        email ILIKE ${`%${query}%`} OR
        dob::text ILIKE ${`%${query}%`}
    `;
        const totalPages = Math.ceil(Number(count.rows[0].count) / ITEMS_PER_PAGE);
        return totalPages;
    } catch (error) {
        console.error('Error en la base de datos:', error);
        throw new Error('Ocurrio un error al obtener el número total de páginas de personas.');
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
