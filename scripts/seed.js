const { persons } = require('../src/lib/persons-data.js');
const { db } = require('@vercel/postgres');

async function createPersons(client) {
    try {
        await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

        await client.sql`DROP TABLE IF EXISTS persona;`;

        const createTable = await client.sql`
        CREATE TABLE IF NOT EXISTS persona (
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        lastname VARCHAR(255) NOT NULL,
        rut VARCHAR(12) NOT NULL UNIQUE,
        sex VARCHAR(6) NOT NULL,
        phone VARCHAR(12) NOT NULL,
        address TEXT NOT NULL,
        dob DATE NOT NULL,
        email TEXT NOT NULL UNIQUE
      );
    `;

        console.log(`Created "persona" table`);

        const insertedPersons = await Promise.all(
            persons.map(async person => {
                return client.sql`
        INSERT INTO persona (name, lastname, rut, sex, phone, address, dob, email)
        VALUES (${person.name}, ${person.lastname}, ${person.rut}, ${person.sex}, ${person.phone}, ${person.address}, ${person.dob}, ${person.email})
        ON CONFLICT (id) DO NOTHING;
      `;
            })
        );

        console.log(`Seeded ${insertedPersons.length} persons`);

        return {
            createTable,
            persons: insertedPersons,
        };
    } catch (error) {
        console.error('Error seeding persons:', error);
        throw error;
    }
}

async function main() {
    const client = await db.connect();

    await createPersons(client);
    await client.end();
}

main().catch(err => {
    console.error('Ocurrio un error al tratar de hacer el seed de la base ded datos:', err);
});
