export type FormItems = {
    id:
        | 'name'
        | 'lastname'
        | 'rut'
        | 'sex'
        | 'phone'
        | 'address'
        | 'dob_day'
        | 'email'
        | 'dob_month'
        | 'dob_year';
    label: string;
    type?: string;
    placeholder: string;
};
