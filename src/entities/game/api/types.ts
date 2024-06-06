export interface UuidData {
  uuid: string;
}

export interface LivesData {
  uuid: string;
  lives: number;
}

export interface PointsData {
  userid: string;
  level: number;
  score: number;
}

export interface LevelData {
  uuid: string;
  userid: string;
  passLevel: number;
  passTime: number;
  item: string;
}
