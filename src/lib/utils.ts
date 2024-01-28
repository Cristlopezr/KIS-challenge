import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export const formatDateToLocal = (dateStr: string, locale: string = 'es-CL') => {
    const date = new Date(dateStr);
    const options: Intl.DateTimeFormatOptions = {
        day: 'numeric',
        month: 'numeric',
        year: 'numeric',
    };
    const formatter = new Intl.DateTimeFormat(locale, options);
    return formatter.format(date);
};

export const generatePagination = (currentPage: number, totalPages: number) => {
    // If the total number of pages is 7 or less,
    // display all pages without any ellipsis.
    if (totalPages <= 7) {
        return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    // If the current page is among the first 3 pages,
    // show the first 3, an ellipsis, and the last 2 pages.
    if (currentPage <= 3) {
        return [1, 2, 3, '...', totalPages - 1, totalPages];
    }

    // If the current page is among the last 3 pages,
    // show the first 2, an ellipsis, and the last 3 pages.
    if (currentPage >= totalPages - 2) {
        return [1, 2, '...', totalPages - 2, totalPages - 1, totalPages];
    }

    // If the current page is somewhere in the middle,
    // show the first page, an ellipsis, the current page and its neighbors,
    // another ellipsis, and the last page.
    return [1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages];
};

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
