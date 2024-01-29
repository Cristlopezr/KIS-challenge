import * as z from 'zod';
import { validateRut } from './utils';

export const createFormSchema = z.object({
    name: z
        .string()
        .min(2, {
            message: 'Por favor ingrese su nombre.',
        })
        .trim(),
    lastname: z.string().min(1, { message: 'Por favor ingrese su apellido.' }).trim(),
    rut: z
        .string()
        .min(8, { message: 'Por favor ingrese su rut.' })
        .max(15, {
            message: 'Por favor ingrese un rut válido.',
        })
        .refine(value => validateRut(value), {
            message: 'Por favor ingrese un rut válido',
        }),
    sex: z.string().min(1, {
        message: 'Por favor seleccione un sexo.',
    }),
    phone: z
        .string()
        .min(12, { message: 'Por favor ingrese un número de teléfono válido.' })
        .trim()
        .refine(value => /^[+]?[0-9]+$/.test(value), {
            message: 'Por favor ingrese un número de teléfono válido.',
        }),
    number_street: z.string().min(1, { message: 'Por favor ingrese número y calle.' }).trim(),
    commune: z
        .string()
        .min(1, {
            message: 'Por favor seleccione la comuna.',
        })
        .trim(),
    region: z
        .string()
        .min(1, {
            message: 'Por favor seleccione la región.',
        })
        .trim(),
    dob_day: z
        .string()
        .trim()
        .min(1, { message: 'Por favor ingrese un día' })
        .max(2, { message: 'Por favor ingrese un día válido.' })
        .regex(/^\d+$/, { message: 'Por favor ingrese un día válido' }),
    dob_month: z.string().min(1, {
        message: 'Por favor seleccione un mes.',
    }),
    dob_year: z
        .string()
        .trim()
        .min(4, { message: 'Por favor ingrese un año válido' })
        .max(4, { message: 'Por favor ingrese un año válido' })
        .trim()
        .regex(/^\d+$/, { message: 'Por favor ingrese un año válido' }),
    email: z
        .string()
        .min(1, {
            message: 'Por favor ingrese su email.',
        })
        .email('Por favor ingrese un email válido')
        .trim(),
});
