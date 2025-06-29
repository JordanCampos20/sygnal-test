export enum StateEnum {
  pending = 1,
  inProgress = 2,
  completed = 3,
}

export interface Order {
  id: number;
  name: string;
  state: StateEnum;
  stateName: string;
  createdAt: Date;
  updatedAt?: Date;
}

export interface OrderFormData {
  name: string;
}
