import csv from "csv-parser";
import fs from "fs";

export type InMemoryDbPlayer = {
  [id: string]: CsvPlayer;
};

export type CsvPlayer = {
  playerID: string;
  nameFirst: string;
  nameLast: string;
  nameGiven: string;
  weight: string;
  height: string;
  bats: string;
  throws: string;
  debut: string;
  finalGame: string;
  retroID: string;
  bbrefID: string;
  birthYear: string;
  birthMonth: string;
  birthDay: string;
  birthCountry: string;
  birthState: string;
  birthCity: string;
  deathYear: string;
  deathMonth: string;
  deathDay: string;
  deathCountry: string;
  deathState: string;
  deathCity: string;
};

// Use the readable stream api to consume records
const buildInMemoryDb = (): Promise<InMemoryDbPlayer> => {
  return new Promise((resolve, reject) => {
    const db: InMemoryDbPlayer = {};

    fs.createReadStream(
      `/mnt/c/Users/Darren/Projects/typescript-players-db/external/Player.csv`
    )
      .pipe(csv())
      .on("data", (data: CsvPlayer) => {
        db[data.playerID] = data;
      })
      .on("error", (err: any) => {
        console.error(err.message);
        reject(err);
      })
      .on("end", () => {
        resolve(db);
      });
  });
};

export default buildInMemoryDb;
