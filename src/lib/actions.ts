'use server';
import z from 'zod';
import { createFormSchema } from './schema';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export async function createPerson(data: z.infer<typeof createFormSchema>) {
    const validatedFields = createFormSchema.safeParse(data);

    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            message: 'Faltan campos. La creación falló.',
        };
    }
    const { name, lastname, address, dob, email, phone, rut, sex } = validatedFields.data;
    /*   try {
        await sql`
    INSERT INTO invoices (customer_id, amount, status, date)
    Values (${customerId}, ${amountInCents}, ${status}, ${date})
    `;
    } catch (error) {
        return {
            message: 'Database Error: Failed to Create Invoice.',
        };
    } */

    revalidatePath('/');
    redirect('/');
}
