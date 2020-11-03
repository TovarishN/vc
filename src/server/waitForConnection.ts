import { createConnection, getConnection } from "typeorm";

export async function waitForConnection() {
    let i = 0;
    while (true) {
        try {
            i++;
            await createConnection();

            console.log(`connection created from ${i} time`);
            let conn = getConnection();
            let migrations = await conn.runMigrations();

            console.log(`${migrations.length} migrations are run`);

            break;
        }
        catch (e) {
            if (e instanceof Error)
                console.log(e.message);
            await timeout(1000);
        }
    }
}

export function timeout(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}