export interface Region {
  state: string;
  count: number;
}

export interface CovidStats {
  recovered: number;
  infected: number;
  deceased: number;

  infectedByRegion: Region[];

  deceasedByRegion: Region[];
}
