export enum StateEnum {
  pending = 1,
  inProgress = 2,
  completed = 3,
}

export interface Order {
  id: number;
  state: StateEnum;
  stateName: string;
  createdAt: Date;
  updatedAt?: Date;
}