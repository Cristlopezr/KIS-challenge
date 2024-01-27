import { FormItems } from './interfaces';

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
