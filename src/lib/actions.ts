'use server';
import z from 'zod';
import { createFormSchema } from './schema';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { sql } from '@vercel/postgres';
import { Commune } from './interfaces';

export async function createPerson(data: z.infer<typeof createFormSchema>) {
    const validatedFields = createFormSchema.safeParse(data);

    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            message: 'Faltan campos. La creación falló.',
        };
    }
    const { name, lastname, commune, number_street, dob_day, dob_month, dob_year, email, phone, rut, sex } =
        validatedFields.data;

    const dob = `${dob_year}-${dob_month}-${dob_day}`;
    const [number, ...rest] = number_street.split(' ');

    const street = rest.join('');

    try {
        await sql`
    INSERT INTO persona (name, lastname, rut, sex, phone, number, street, dob, email, commune_id)
    Values (${name}, ${lastname}, ${rut}, ${sex}, ${phone}, ${number}, ${street}, ${dob}, ${email}, ${commune})
    `;
    } catch (error: any) {
        if (error?.code === '23505') {
            if (error.message.includes('rut')) {
                throw new Error('El rut ya está registrado.');
            }
            if (error.message.includes('email')) {
                throw new Error('El correo electrónico ya está en uso.');
            }
        }

        throw new Error('Ha ocurrido un error, no se ha podido registrar la persona.');
    }

    revalidatePath('/');
    redirect('/');
}

export async function editPerson(id: string, data: z.infer<typeof createFormSchema>) {
    const validatedFields = createFormSchema.safeParse(data);

    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            message: 'Faltan campos. La creación falló.',
        };
    }
    const { name, lastname, commune, number_street, dob_day, dob_month, dob_year, email, phone, rut, sex } =
        validatedFields.data;

    const dob = `${dob_year}-${dob_month}-${dob_day}`;
  
    const [number, ...rest] = number_street.split(' ');

    const street = rest.join('');

    try {
        await sql`
    UPDATE persona SET id = ${id}, name = ${name}, lastname = ${lastname}, rut = ${rut}, sex = ${sex}, phone = ${phone}, number = ${number}, street = ${street}, dob = ${dob}, email = ${email}, commune_id = ${commune}
    WHERE id = ${id}
    `;
    } catch (error: any) {
        console.log(error);
        if (error?.code === '23505') {
            if (error.message.includes('rut')) {
                throw new Error('El rut ya está registrado.');
            }
            if (error.message.includes('email')) {
                throw new Error('El correo electrónico ya está en uso.');
            }
        }

        throw new Error('Ha ocurrido un error, no se ha podido editar la persona.');
    }

    revalidatePath('/');
    redirect('/');
}

export async function fetchCommunes(region_id: string) {
    try {
        const communes = await sql<Commune>`SELECT * FROM comuna WHERE region_id=${region_id}`;
        return communes.rows;
    } catch (error) {
        console.error('Error en la base de datos:', error);
        throw new Error('Ocurrio un error al obtener las comunas.');
    }
}

export async function deletePerson(id: string) {
    try {
        await sql`DELETE FROM persona WHERE id = ${id}`;
        revalidatePath('/');
    } catch (error) {
        console.error('Error en la base de datos:', error);
        throw new Error('Ocurrio un error al eliminar el usuario.');
    }
}
