export interface CreateHaircutDto {
  user_id: string;
  name: string;
  price: number;
}

export interface ListHaircutsDto {
  user_id: string;
  status: boolean | string;
}

export interface UpdateHaircutDto {
  user_id: string;
  haircut_id: string;
  name: string;
  price: number;
  status: boolean | string;
}