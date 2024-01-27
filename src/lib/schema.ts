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
        .max(12, {
            message: 'Por favor ingrese un rut válido.',
        })
        .refine(value => validateRut(value), {
            message: 'Por favor ingrese un rut válido',
        }),
    sex: z
        .string()
        .min(1, {
            message: 'Por favor seleccione un sexo.',
        })
        .trim(),
    phone: z.string().min(1, { message: 'Por favor ingrese su teléfono.' }).trim(),
    address: z.string().min(1, { message: 'Por favor ingrese su dirección.' }).trim(),
    dob: z.date({
        required_error: 'Por favor ingrese su fecha de nacimiento.',
    }),
    email: z
        .string()
        .min(1, {
            message: 'Por favor ingrese su email',
        })
        .email('Por favor ingresar un email válido')
        .trim(),
});
