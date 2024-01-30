const persons = [
    {
      name: 'Claudio',
      lastname: 'Sepulveda',
      rut: '22.527.120-8',
      sex: 'Hombre',
      phone: '+56944302931',
      number: '123',
      street: 'Calle 2',
      dob: '2002-04-01',
      email: 'cs@gmail.com',
      commune_id: '2a19dfb5-4d74-4e72-99a8-1c3b2f6a27cc'
    },
    {
      name: 'Maria',
      lastname: 'Gonzalez',
      rut: '24.326.425-1',
      sex: 'Mujer',
      phone: '+56944302932',
      number: '123',
      street: 'Calle Principal',
      dob: '1995-08-15',
      email: 'maria.g@gmail.com',
      commune_id: '86aa9023-5c90-4b37-b8b5-470a684ef0a2'
    },
    {
      name: 'Juan',
      lastname: 'Rodriguez',
      rut: '23.835.112-K',
      sex: 'Hombre',
      phone: '+56944302933',
      number: '456',
      street: 'Avenida Central',
      dob: '1980-02-25',
      email: 'juan.r@gmail.com',
      commune_id: 'b7c488b7-78de-4b4b-ba1b-1ef1b7c5d6c4'
    },
    {
      name: 'Isabel',
      lastname: 'Martinez',
      rut: '14.680.796-8',
      sex: 'Mujer',
      phone: '+56944302934',
      number: '789',
      street: 'Calle Secundaria',
      dob: '1992-11-10',
      email: 'isabel.m@gmail.com',
      commune_id: 'ea4c5b95-19b3-4d05-8de9-0996b37ea944'
    },
    {
      name: 'Pedro',
      lastname: 'Lopez',
      rut: '22.714.473-4',
      sex: 'Hombre',
      phone: '+56944302935',
      number: '321',
      street: 'Avenida Norte',
      dob: '1988-06-30',
      email: 'pedro.l@gmail.com',
      commune_id: '5a19f8c1-c36c-4a4a-939c-c0c12b08cddc'
    },
    {
      name: 'Luis',
      lastname: 'Pérez',
      rut: '21.376.536-1',
      sex: 'Hombre',
      phone: '+56944302936',
      number: '456',
      street: 'Avenida Norte',
      dob: '1990-07-12',
      email: 'luis.p@gmail.com',
      commune_id: '5a19f8c1-c36c-4a4a-939c-c0c12b08cddc'
    },
    {
      name: 'Ana',
      lastname: 'Soto',
      rut: '17.654.526-7',
      sex: 'Mujer',
      phone: '+56944302937',
      number: '789',
      street: 'Calle Sur',
      dob: '1985-04-25',
      email: 'ana.s@gmail.com',
      commune_id: 'ea4c5b95-19b3-4d05-8de9-0996b37ea944'
    },
    {
      name: 'Carolina',
      lastname: 'Muñoz',
      rut: '7.713.985-0',
      sex: 'Mujer',
      phone: '+56944302938',
      number: '987',
      street: 'Avenida Oeste',
      dob: '1987-11-30',
      email: 'carolina.m@gmail.com',
      commune_id: 'f36e3f5c-3157-497f-a3d4-6906f9c03b88'
    },
    {
      name: 'Felipe',
      lastname: 'Vega',
      rut: '22.653.580-2',
      sex: 'Hombre',
      phone: '+56944302939',
      number: '321',
      street: 'Calle Este',
      dob: '1993-08-05',
      email: 'felipe.v@gmail.com',
      commune_id: 'bd7d37b8-e630-4a24-818d-b3e3907c1c2a'
    },
    {
      name: 'Gabriela',
      lastname: 'Torres',
      rut: '14.697.785-5',
      sex: 'Mujer',
      phone: '+56944302940',
      number: '654',
      street: 'Avenida Sur',
      dob: '1982-05-20',
      email: 'gabriela.t@gmail.com',
      commune_id: 'c98f02f5-6c4b-4d94-8fc9-1ed26c2ad3cc'
    },
    {
      name: 'Roberto',
      lastname: 'Díaz',
      rut: '114.700.307-2',
      sex: 'Hombre',
      phone: '+56944302941',
      number: '555',
      street: 'Calle Central',
      dob: '1998-02-15',
      email: 'roberto.d@gmail.com',
      commune_id: 'e2909c6a-0bc9-4bd5-8cd3-e993f93ab5c4'
    }
  ];
  
  

const regions = [
    { id: '1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed', name: 'Arica y Parinacota', cod: 'XV' },
    { id: '3c2e4e16-3158-4b25-8a95-d8673dc4a211', name: 'Tarapacá', cod: 'I' },
    { id: '4e08993c-88f7-4d6d-90c3-5b3f3256cc17', name: 'Antofagasta', cod: 'II' },
    { id: 'edc972cc-7980-4962-89fc-dc7c9e06d23a', name: 'Atacama', cod: 'III' },
    { id: '85f0f1a1-4e2b-4013-bb54-3d0c52e7f2e0', name: 'Coquimbo', cod: 'IV' },
    { id: 'd63bc9e4-72bf-4e14-91fc-109392b265d4', name: 'Valparaíso', cod: 'V' },
    { id: '0c8b7e92-477e-40bb-a7f4-9c847680e8eb', name: 'Metropolitana de Santiago', cod: 'RM' },
    { id: '2439da68-6ef5-44f3-87b7-67c0e2833d07', name: 'Libertador General Bernardo O\'Higgins', cod: 'VI' },
    { id: '1c6eeb7c-d101-48b8-a676-6bfe5b1217ef', name: 'Maule', cod: 'VII' },
    { id: '96f1d2f1-9c42-4d2a-9d7d-2c67e99e2e1e', name: 'Ñuble', cod: 'XVI' },
    { id: '3b3634eb-648c-40bf-97d6-2e964cf1b2a6', name: 'Biobío', cod: 'VIII' },
    { id: 'e4d2a3f5-9e17-43f9-a366-af8cf6a1440d', name: 'La Araucanía', cod: 'IX' },
    { id: '76b92dd9-719c-41c2-909e-6e8e7db590a7', name: 'Los Ríos', cod: 'XIV' },
    { id: '75d464ed-8d5d-4956-80b0-3bfc8ee4ea1c', name: 'Los Lagos', cod: 'X' },
    { id: '29e27df7-bad7-4387-8f96-0e3d9910f37a', name: 'Aysén del General Carlos Ibáñez del Campo', cod: 'XI' },
    { id: 'b927c4a0-b9d1-43d8-8f7a-d54271309f76', name: 'Magallanes y de la Antártica Chilena', cod: 'XII' }
];


const communes = [
    // Arica y Parinacota
    { id: '2a19dfb5-4d74-4e72-99a8-1c3b2f6a27cc', name: 'Arica', region_id: '1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed' },
    { id: '13cfee15-d52f-4d44-a319-02c94b87ec42', name: 'Putre', region_id: '1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed' },
  
    // Tarapacá
    { id: '86aa9023-5c90-4b37-b8b5-470a684ef0a2', name: 'Iquique', region_id: '3c2e4e16-3158-4b25-8a95-d8673dc4a211' },
    { id: '09a7a740-b15c-47fc-8d35-3bb3a408b365', name: 'Pozo Almonte', region_id: '3c2e4e16-3158-4b25-8a95-d8673dc4a211' },
  
    // Antofagasta
    { id: 'b7c488b7-78de-4b4b-ba1b-1ef1b7c5d6c4', name: 'Antofagasta', region_id: '4e08993c-88f7-4d6d-90c3-5b3f3256cc17' },
    { id: 'cf96d3f5-56b0-4a92-a71d-e9f642de1a60', name: 'Calama', region_id: '4e08993c-88f7-4d6d-90c3-5b3f3256cc17' },
    { id: '53c114c8-9f1a-4b77-a3c7-5f99d4ce4e94', name: 'Tocopilla', region_id: '4e08993c-88f7-4d6d-90c3-5b3f3256cc17' },
  
    // Atacama
    { id: 'bc4de51f-1cf5-4e25-8a85-cfc44cfe62f4', name: 'Copiapó', region_id: 'edc972cc-7980-4962-89fc-dc7c9e06d23a' },
    { id: '5eeaa524-450d-45eb-902a-1c9e4d686fce', name: 'Vallenar', region_id: 'edc972cc-7980-4962-89fc-dc7c9e06d23a' },
    
    // Coquimbo
    { id: '0cd735f2-7029-4b64-930e-aa4f78603d04', name: 'La Serena', region_id: '85f0f1a1-4e2b-4013-bb54-3d0c52e7f2e0' },
    { id: 'e2909c6a-0bc9-4bd5-8cd3-e993f93ab5c4', name: 'Coquimbo', region_id: '85f0f1a1-4e2b-4013-bb54-3d0c52e7f2e0' },
    { id: 'ae2aebd9-92f3-41a3-8890-4c3a1ac7d925', name: 'Ovalle', region_id: '85f0f1a1-4e2b-4013-bb54-3d0c52e7f2e0' },
  
    // Valparaíso
    { id: 'ea4c5b95-19b3-4d05-8de9-0996b37ea944', name: 'Valparaíso', region_id: 'd63bc9e4-72bf-4e14-91fc-109392b265d4' },
    { id: '5ed5f88e-6605-4df4-88c0-bae8258d334a', name: 'Viña del Mar', region_id: 'd63bc9e4-72bf-4e14-91fc-109392b265d4' },
    
    // Metropolitana de Santiago
    { id: 'f36e3f5c-3157-497f-a3d4-6906f9c03b88', name: 'Santiago', region_id: '0c8b7e92-477e-40bb-a7f4-9c847680e8eb' },
    { id: 'b33ab4c4-7bf9-4650-ba7a-b1eef7c194ec', name: 'Puente Alto', region_id: '0c8b7e92-477e-40bb-a7f4-9c847680e8eb' },
  
    // Libertador General Bernardo O'Higgins
    { id: '968b4164-62c0-4f07-825d-b5c3a3216f65', name: 'Rancagua', region_id: '2439da68-6ef5-44f3-87b7-67c0e2833d07' },
    { id: '2cb4ec1f-228f-4bc7-854f-4e67f96ac804', name: 'San Fernando', region_id: '2439da68-6ef5-44f3-87b7-67c0e2833d07' },
    
    // Maule
    { id: 'bd7d37b8-e630-4a24-818d-b3e3907c1c2a', name: 'Talca', region_id: '1c6eeb7c-d101-48b8-a676-6bfe5b1217ef' },
    { id: '19cd86aa-1f4d-4521-86cc-1447c11d8353', name: 'Curicó', region_id: '1c6eeb7c-d101-48b8-a676-6bfe5b1217ef' },
  
    // Ñuble
  { id: 'c98f02f5-6c4b-4d94-8fc9-1ed26c2ad3cc', name: 'Chillán', region_id: '96f1d2f1-9c42-4d2a-9d7d-2c67e99e2e1e' },
  { id: '4a4b8a1b-0572-4bf8-bba7-8ab18b5c9bbf', name: 'Quirihue', region_id: '96f1d2f1-9c42-4d2a-9d7d-2c67e99e2e1e' },

  // Biobío
  { id: '5a19f8c1-c36c-4a4a-939c-c0c12b08cddc', name: 'Concepción', region_id: '3b3634eb-648c-40bf-97d6-2e964cf1b2a6' },
  { id: 'c735d7d9-bb7a-452c-ba2b-6a6a6d4a03a5', name: 'Los Ángeles', region_id: '3b3634eb-648c-40bf-97d6-2e964cf1b2a6' },
  { id: 'f98b6a61-eb62-4295-b2b9-838c68c0fc9d', name: 'Chillán', region_id: '3b3634eb-648c-40bf-97d6-2e964cf1b2a6' },

  // La Araucanía
  { id: 'fcf1a30f-1da8-4d34-8144-2d9985c23d64', name: 'Temuco', region_id: 'e4d2a3f5-9e17-43f9-a366-af8cf6a1440d' },
  { id: '1b8bc4bf-31de-47ea-a21c-70b194a03394', name: 'Victoria', region_id: 'e4d2a3f5-9e17-43f9-a366-af8cf6a1440d' },

  // Los Ríos
  { id: 'a04b9820-83a5-4a5c-8b10-e5c6fc32cf67', name: 'Valdivia', region_id: '76b92dd9-719c-41c2-909e-6e8e7db590a7' },
  { id: '62fc8494-e2a7-49a1-87f7-39dd88f6e7a3', name: 'La Unión', region_id: '76b92dd9-719c-41c2-909e-6e8e7db590a7' },

  // Los Lagos
  { id: '7358f048-81c2-4c8d-906a-d5d1911422d9', name: 'Puerto Montt', region_id: '75d464ed-8d5d-4956-80b0-3bfc8ee4ea1c' },
  { id: 'c98f06c1-636b-41d3-8a11-82cb9a545422', name: 'Osorno', region_id: '75d464ed-8d5d-4956-80b0-3bfc8ee4ea1c' },
  { id: 'dcb2f1e9-63c2-4de3-b2d2-5b33b652d2b5', name: 'Castro', region_id: '75d464ed-8d5d-4956-80b0-3bfc8ee4ea1c' },

  // Aysén del General Carlos Ibáñez del Campo
  { id: 'c89b5a5f-93bb-45f9-ae05-99d84807f2d6', name: 'Coyhaique', region_id: '29e27df7-bad7-4387-8f96-0e3d9910f37a' },
  { id: '4222a2df-bd7b-401f-95ed-8d998c3d3f82', name: 'Puerto Aysén', region_id: '29e27df7-bad7-4387-8f96-0e3d9910f37a' },

  // Magallanes y de la Antártica Chilena
  { id: '513fb3ec-3967-4d57-a125-9ddcd0c7a4c2', name: 'Punta Arenas', region_id: 'b927c4a0-b9d1-43d8-8f7a-d54271309f76' },
  { id: 'e177f2f2-1f36-416e-950d-550743b5c5f3', name: 'Puerto Natales', region_id: 'b927c4a0-b9d1-43d8-8f7a-d54271309f76' }
];
 
module.exports = {
    persons,
    regions,
    communes
};
