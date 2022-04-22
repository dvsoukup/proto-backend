import { PlayerBirth } from "./playerBirth";
import { PlayerDeath } from "./playerDeath";

export type Player = {
  id: string;
  firstName: string;
  lastName: string;
  givenName?: string;
  weight?: number;
  height?: number;
  bats?: string;
  throws?: string;
  debut?: Date;
  finalGame?: Date;
  retroID?: string;
  bbrefID?: string;
  birth?: PlayerBirth;
  death?: PlayerDeath;
};
