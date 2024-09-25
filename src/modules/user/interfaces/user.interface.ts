export interface UserLoginInterface {
  username: string,
  password: string
}

export interface UserI {
  id: number;
  name?: string;
  status?: boolean;
  lastName?: string;
  fullName?: string;
  body?: any;
  create_at?: Date;
  update_at?: Date;
}