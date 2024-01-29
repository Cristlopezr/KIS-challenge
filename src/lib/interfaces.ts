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

export type Person = {
    id: string;
    name: string;
    lastname: string;
    rut: string;
    sex: string;
    phone: string;
    number: string;
    street: string;
    comuna: string;
    region: string;
    dob: string;
    email: string;
    commune_id:string;
};

export type EditPerson = {
    id: string;
    name: string;
    lastname: string;
    number: string;
    street: string;
    rut: string;
    sex: string;
    phone: string;
    dob_day: string;
    dob_month: string;
    dob_year: string;
    email: string;
    comuna: string;
    region: string;
    commune_id:string;
};

export type Region = {
    id: string;
    name: string;
    cod: string;
};

export type Commune = {
    id: string;
    name: string;
    region_id: string;
};
