import { createConnection, getConnection, getManager } from "typeorm";

export const dbConnectionName = process.env['NODE_ENV'] === 'development' ? 'development' : 'default';
export async function waitForConnection() {
    let i = 0;
    while (true) {
        try {
            i++;
            await createConnection(dbConnectionName);
            
            console.log(`connection created from ${i} time`);
            let conn = getConnection(dbConnectionName);
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