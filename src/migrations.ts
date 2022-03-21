import { connection } from "./connection";

export const createTables = async () => {
   await connection.raw(`
    CREATE TABLE IF NOT EXISTS festBandas (
      id VARCHAR(255) PRIMARY KEY,
      name VARCHAR(255) UNIQUE NOT NULL,
      music_genre VARCHAR(255) NOT NULL,
      responsible VARCHAR(255) UNIQUE NOT NULL 
    );

    CREATE TABLE IF NOT EXISTS festShows (
      id VARCHAR(255) PRIMARY KEY,
      week_day VARCHAR(255) NOT NULL,
      start_time INT NOT NULL,
      end_time INT NOT NULL,
      band_id VARCHAR(255) NOT NULL,
      FOREIGN KEY(band_id) REFERENCES NOME_TABELA_BANDAS(id)
    );

    CREATE TABLE IF NOT EXISTS festUsers (
      id VARCHAR(255) PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      email VARCHAR(255) NOT NULL UNIQUE,
      password VARCHAR(255) NOT NULL,
      role VARCHAR(255) NOT NULL DEFAULT "NORMAL"
    );

   `)
}

createTables()