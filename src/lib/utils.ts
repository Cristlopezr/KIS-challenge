import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

const dv = (T: number) => {
    let M = 0,
        S = 1;

    for (; T; T = Math.floor(T / 10)) {
        S = (S + (T % 10) * (9 - (M++ % 6))) % 11;
    }

    return S ? (S - 1).toString() : 'K';
};

export const validateRut = (rutCompleto: string) => {
    const cleanRut = rutCompleto.replace(/[.]/g, '');
    /* if (cleanRut.length !== 9 && cleanRut.length !== 10) {
        return false;
    }
 */
    if (!/^[0-9]+[-|‐]{1}[0-9kK]{1}$/.test(cleanRut)) {
        return false;
    }

    const [rut, digv] = rutCompleto.split('-').map(part => part.toUpperCase());

    return dv(parseInt(rut)) === digv;
};
