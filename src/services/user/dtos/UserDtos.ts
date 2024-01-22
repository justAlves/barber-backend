export interface RegisterUserDto {
  name: string;
  email: string;
  password: string;
  cep?: string; 
  city?: string;
  state?: string;
  address?: string;
  number?: string;
  complement?: string;
}

export interface AuthUserDto {
  email: string;
  password: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  cep?: string; 
  city?: string;
  state?: string;
  address?: string;
  number?: string;
  complement?: string;
}

export interface Session {
  user: User;
  token: string;
}