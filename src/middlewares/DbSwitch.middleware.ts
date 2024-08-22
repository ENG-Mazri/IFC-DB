import { DataSource } from "typeorm";

export async function DbSwitch(connection: DataSource, database: string, createDb: boolean = false){
    if (!database) return;

    if (createDb) await connection.query(`CREATE DATABASE IF NOT EXISTS ${database};`)

    connection.setOptions({database});
    connection.driver.options = connection.options;
    await connection.destroy();
    await connection.initialize();
}