export interface LoginUserRequest {
  cpf: string;
  password: string;
}

export interface LoginTeamRequest {
  email: string;
  password: string;
}

export type UserRole = 'ADMIN' | 'COLLABORATOR' | 'CLIENT';

export interface User {
  id: string;
  name: string;
  email?: string;
  cpf?: string;
  role: UserRole;
}

export interface LoginResponse {
  success: boolean;
  message: string;
}

export interface ForgotPasswordRequest {
  cpf?: string;
  email?: string;
}

export interface ForgotPasswordResponse {
  message: string;
}
