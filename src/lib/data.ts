import { unstable_noStore } from 'next/cache';
import { sql } from '@vercel/postgres';
import { FormItems } from './interfaces';

export async function fetchPersons() {
    unstable_noStore();

    try {
        const data = await sql`SELECT name, lastname, email, dob, phone, address, sex, rut FROM persona`;

        return data.rows;
    } catch (error) {
        console.error('Error en la base de datos:', error);
        throw new Error('Ocurrio un error al obtener la información de las personas.');
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
        id: 'dob',
        label: 'Fecha de nacimiento',
        placeholder: 'Fecha de nacimiento',
    },
    {
        id: 'email',
        label: 'Correo electrónico',
        type: 'text',
        placeholder: 'Correo electrónico',
    },
];
