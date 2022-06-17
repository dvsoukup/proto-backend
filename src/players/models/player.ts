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

export type PlayerBirth = {
  year: number;
  month: number;
  day: number;
  country: string;
  state: string;
  city: string;
};

export type PlayerDeath = {
  year: number;
  month: number;
  day: number;
  country: string;
  state: string;
  city: string;
};
