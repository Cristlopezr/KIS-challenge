'use server';
import z from 'zod';
import { createFormSchema } from './schema';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { sql } from '@vercel/postgres';

export async function createPerson(data: z.infer<typeof createFormSchema>) {
    const validatedFields = createFormSchema.safeParse(data);

    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            message: 'Faltan campos. La creación falló.',
        };
    }
    const {
        name,
        lastname,
        commune,
        number,
        region,
        street,
        dob_day,
        dob_month,
        dob_year,
        email,
        phone,
        rut,
        sex,
    } = validatedFields.data;

    const dob = `${dob_year}-${dob_month}-${dob_day}`;
    const address = `${number} ${street} ${commune} ${region}`;

    try {
        await sql`
    INSERT INTO persona (name, lastname, rut, sex, phone, address, dob, email)
    Values (${name}, ${lastname}, ${rut}, ${sex}, ${phone}, ${address}, ${dob}, ${email})
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
