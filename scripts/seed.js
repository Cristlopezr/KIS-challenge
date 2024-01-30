const { persons, regions, communes } = require('../src/lib/tables-data.js');
const { db } = require('@vercel/postgres');

async function createPersons(client) {
    try {
        await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

        const createTable = await client.sql`
        CREATE TABLE IF NOT EXISTS persona (
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        lastname VARCHAR(255) NOT NULL,
        rut VARCHAR(50) NOT NULL UNIQUE,
        sex VARCHAR(6) NOT NULL,
        phone VARCHAR(50) NOT NULL,
        number VARCHAR(30) NOT NULL,
        street VARCHAR(100) NOT NULL,
        dob DATE NOT NULL,
        email TEXT NOT NULL UNIQUE,
        commune_id UUID REFERENCES comuna(id) ON DELETE CASCADE
      );
    `;

        console.log(`Created "persona" table`);

        const insertedPersons = await Promise.all(
            persons.map(async person => {
                return client.sql`
        INSERT INTO persona (name, lastname, rut, sex, phone, number, street, dob, email, commune_id)
        VALUES (${person.name}, ${person.lastname}, ${person.rut}, ${person.sex}, ${person.phone}, ${person.number}, ${person.street}, ${person.dob}, ${person.email}, ${person.commune_id})
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

async function seedRegions(client) {
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
    try {
        const createTable = await client.sql`
        CREATE TABLE IF NOT EXISTS region (
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        cod VARCHAR(10) NOT NULL
      );
    `;

        const insertedRegions = await Promise.all(
            regions.map(async region => {
                return client.sql`INSERT INTO region (id, name, cod) VALUES (${region.id}, ${region.name}, ${region.cod})`;
            })
        );

        console.log(`Seeded ${insertedRegions.length} regions`);
        return {
            createTable,
            regions: insertedRegions,
        };
    } catch (error) {
        console.error('Error seeding regions:', error);
        throw error;
    }
}

async function seedCommunes(client) {
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
    try {
        const createTable = await client.sql`
        CREATE TABLE IF NOT EXISTS comuna (
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        region_id UUID REFERENCES region(id) ON DELETE CASCADE
        )
        `;

        const insertedCommunes = await Promise.all(
            communes.map(async commune => {
                return client.sql`INSERT INTO comuna (id, name, region_id) VALUES (${commune.id}, ${commune.name}, ${commune.region_id})`;
            })
        );

        console.log(`Seeded ${insertedCommunes.length} communes`);

        return {
            createTable,
            communes: insertedCommunes,
        };
    } catch (error) {
        console.error('Error seeding communes:', error);
        throw error;
    }
}

async function createTableRelation(client) {
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

    try {
        const createTable = await client.sql`
        CREATE TABLE relacion (
        id_person_1 UUID REFERENCES persona(id),
        id_person_2 UUID REFERENCES persona(id),
        PRIMARY KEY (id_person_1, id_person_2),
        FOREIGN KEY (id_person_1) REFERENCES persona(id) ON DELETE CASCADE,
        FOREIGN KEY (id_person_2) REFERENCES persona(id) ON DELETE CASCADE
        );
        `;

        console.log('Table relacion created');
    } catch {
        console.error('Error creating table relacion:', error);
        throw error;
    }
}

async function dropTables(client) {
    await client.sql`DROP TABLE IF EXISTS relacion;`;
    await client.sql`DROP TABLE IF EXISTS persona;`;
}

async function main() {
    const client = await db.connect();
    await dropTables(client);
    /* await seedRegions(client); */
    /* await seedCommunes(client); */
    await createPersons(client);
    await createTableRelation(client);
    await client.end();
}

main().catch(err => {
    console.error('Ocurrio un error al tratar de hacer el seed de la base ded datos:', err);
});
