'use client';

import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { createPerson, fetchCommunes, fetchPersonByRut } from '@/lib/actions';
import { months } from '@/lib/data';
import { Commune, Region } from '@/lib/interfaces';
import { createFormSchema } from '@/lib/schema';
import { formatDateToLocal } from '@/lib/utils';
import { useUiStore } from '@/store/ui-store';
import { zodResolver } from '@hookform/resolvers/zod';
import { QueryResultRow } from '@vercel/postgres';
import { Loader2 } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { format, validate } from 'rut.js';
import * as z from 'zod';

export const CreateForm = ({ regions }: { regions: Region[] }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [isCommunesLoading, setIsCommunesLoading] = useState(false);
    const [communes, setCommunes] = useState<Commune[]>([]);
    const [errorMessage, setErrorMessage] = useState<string | undefined>(undefined);
    const onShowAlert = useUiStore(state => state.onShowAlert);
    const [relationPersonRut, setRelationPersonRut] = useState('');
    const [relationPerson, setRelationPerson] = useState<QueryResultRow | null | undefined>(null);
    const [isRelationLoading, setIsRelationLoading] = useState(false);

    const form = useForm<z.infer<typeof createFormSchema>>({
        resolver: zodResolver(createFormSchema),
        defaultValues: {
            name: '',
            lastname: '',
            rut: '',
            number_street: '',
            commune: '',
            region: '',
            email: '',
            phone: '',
            sex: '',
            dob_day: '',
            dob_month: '',
            dob_year: '',
        },
    });

    const onSubmit = async (values: z.infer<typeof createFormSchema>) => {
        setErrorMessage(undefined);
        setIsLoading(true);
        try {
            await createPerson(values, relationPerson?.id);
            onShowAlert('success', 'Persona creada correctamente.', 'Éxito');
        } catch (error: any) {
            setIsLoading(false);
            setErrorMessage(error.message);
            onShowAlert('error', error.message, 'Error');
        }
    };

    const onChangePhone = (e: React.ChangeEvent<HTMLInputElement>) => {
        /* form.replace([{data: 'test'}]) */
    };

    const onCleanRelationPerson = () => {
        setRelationPerson(null);
        setRelationPersonRut('');
    };

    const onSearchByRut = async () => {
        setIsRelationLoading(true);
        try {
            const relationRutPerson = await fetchPersonByRut(format(relationPersonRut));
            setRelationPerson(relationRutPerson);
            setIsRelationLoading(false);
        } catch (error: any) {
            console.log(error);
            setIsRelationLoading(false);
        }
    };

    const onChangeRegion = async (value: string) => {
        form.setValue('region', value, { shouldValidate: true });
        try {
            setIsCommunesLoading(true);
            const communes = await fetchCommunes(value);
            setCommunes(communes);
        } catch (error) {
            console.log(error);
        } finally {
            setIsCommunesLoading(false);
        }
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
                <div className='space-y-8 sm:space-y-0 sm:grid sm:grid-cols-2 gap-10'>
                    <FormField
                        control={form.control}
                        name='name'
                        render={({ field }) => {
                            return (
                                <FormItem>
                                    <FormLabel>Nombre</FormLabel>
                                    <FormControl>
                                        <Input placeholder='Nombre' {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            );
                        }}
                    />
                    <FormField
                        control={form.control}
                        name='lastname'
                        render={({ field }) => {
                            return (
                                <FormItem>
                                    <FormLabel>Apellido</FormLabel>
                                    <FormControl>
                                        <Input placeholder='Apellido' {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            );
                        }}
                    />
                    <FormField
                        control={form.control}
                        name='rut'
                        render={({ field }) => {
                            return (
                                <FormItem>
                                    <FormLabel>Rut</FormLabel>
                                    <FormControl>
                                        <Input placeholder='11.111.111-1' {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            );
                        }}
                    />
                    <div className='grid grid-cols-1 min-[437px]:grid-cols-3 gap-3 items-start'>
                        <FormLabel className='min-[437px]:col-span-3 text-sm'>Fecha de nacimiento</FormLabel>
                        <FormField
                            control={form.control}
                            name='dob_day'
                            render={({ field }) => {
                                return (
                                    <FormItem>
                                        <FormControl>
                                            <Input placeholder='Día' {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                );
                            }}
                        />
                        <FormField
                            control={form.control}
                            name='dob_month'
                            render={({ field }) => (
                                <FormItem>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder='Mes' />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            {months.map(({ month, value }) => (
                                                <SelectItem key={month} value={value}>
                                                    {month}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name='dob_year'
                            render={({ field }) => {
                                return (
                                    <FormItem>
                                        <FormControl>
                                            <Input placeholder='Año' {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                );
                            }}
                        />
                    </div>
                    <FormField
                        control={form.control}
                        name='sex'
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Sexo</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder='Sexo' />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        <SelectItem value='Hombre'>Hombre</SelectItem>
                                        <SelectItem value='Mujer'>Mujer</SelectItem>
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name='phone'
                        render={({ field }) => {
                            return (
                                <FormItem>
                                    <FormLabel>Teléfono</FormLabel>
                                    <FormControl>
                                        <Input placeholder='+56111111111' {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            );
                        }}
                    />
                    <div className='grid grid-cols-1 min-[437px]:grid-cols-3 items-center gap-3 col-span-2'>
                        <FormLabel className='min-[437px]:col-span-3'>Dirección</FormLabel>
                        <FormField
                            control={form.control}
                            name='number_street'
                            render={({ field }) => {
                                return (
                                    <FormItem>
                                        <FormControl>
                                            <Input placeholder='Número y calle' {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                );
                            }}
                        />
                        <FormField
                            control={form.control}
                            name='region'
                            render={({ field }) => (
                                <FormItem>
                                    <Select onValueChange={onChangeRegion} defaultValue={field.value}>
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder='Region' />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            {regions.map(region => (
                                                <SelectItem key={region.id} value={region.id}>
                                                    {region.name}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name='commune'
                            render={({ field }) => (
                                <FormItem>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <FormControl>
                                            <SelectTrigger disabled={isCommunesLoading}>
                                                <SelectValue
                                                    placeholder={
                                                        isCommunesLoading ? (
                                                            <div className='flex gap-1 items-center'>
                                                                Cargando comunas...
                                                                <Loader2 className='animate-spin w-4 h-4' />
                                                            </div>
                                                        ) : (
                                                            'Comuna'
                                                        )
                                                    }
                                                />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            {communes?.map(commune => (
                                                <SelectItem key={commune.id} value={commune.id}>
                                                    {commune.name}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <FormField
                        control={form.control}
                        name='email'
                        render={({ field }) => {
                            return (
                                <FormItem>
                                    <FormLabel>Correo electrónico</FormLabel>
                                    <FormControl>
                                        <Input placeholder='Correo electrónico' {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            );
                        }}
                    />
                </div>
                <div className='mt-8'>
                    <div className='flex gap-3'>
                        <Input
                            placeholder='Buscar por rut - 11.111.111-1'
                            value={relationPersonRut}
                            onChange={e => {
                                setRelationPersonRut(e.target.value);
                            }}
                        />
                        <Button
                            disabled={isRelationLoading || !validate(relationPersonRut)}
                            type='button'
                            onClick={onSearchByRut}
                        >
                            {isRelationLoading ? (
                                <>
                                    Procesando...
                                    <Loader2 className='animate-spin' />
                                </>
                            ) : (
                                'Buscar'
                            )}
                        </Button>
                    </div>
                    {relationPerson === undefined && (
                        <div className='text-destructive text-sm mt-2 px-2 font-semibold'>
                            No se ha encontrado al usuario.
                        </div>
                    )}
                    {relationPerson?.id && (
                        <div className='grid grid-cols-2 gap-3 mt-5'>
                            <div className='flex items-center gap-3'>
                                <FormLabel className='text-sm'>Nombre:</FormLabel>
                                <Input
                                    readOnly
                                    disabled
                                    value={`${relationPerson?.name} ${relationPerson?.lastname}`}
                                />
                            </div>
                            <div className='flex items-center gap-3'>
                                <FormLabel className='text-sm'>Rut:</FormLabel>
                                <Input readOnly disabled value={relationPerson?.rut} />
                            </div>
                            <div className='flex items-center gap-3'>
                                <FormLabel className='text-sm'>Teléfono:</FormLabel>
                                <Input readOnly disabled value={relationPerson?.phone} />
                            </div>
                            <div className='flex items-center gap-3'>
                                <FormLabel className='text-sm'>Fecha de nacimiento:</FormLabel>
                                <Input readOnly disabled value={formatDateToLocal(relationPerson?.dob)} />
                            </div>
                            <Button
                                variant='outline'
                                className='mt-3 mx-auto col-span-2 w-[300px]'
                                onClick={onCleanRelationPerson}
                            >
                                Limpiar
                            </Button>
                        </div>
                    )}
                </div>
                {errorMessage && (
                    <div className='text-sm mx-auto w-1/2 text-center col-span-2 text-destructive mt-7 -mb-5'>
                        {errorMessage}
                    </div>
                )}
                <div className='mx-auto w-1/2 mt-10'>
                    {isLoading ? (
                        <Button disabled className='w-full flex items-center gap-3' type='submit'>
                            Procesando...
                            <Loader2 className='animate-spin' />
                        </Button>
                    ) : (
                        <Button className='w-full' type='submit'>
                            Crear
                        </Button>
                    )}
                </div>
            </form>
        </Form>
    );
};
