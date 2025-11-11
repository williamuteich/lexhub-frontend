export interface CreateClientDto {
  name: string;
  email: string;
  password: string;
  cpf: string;
  phone: string;
  birthDate: string;
  sex: string;
  role: 'CLIENT';
}
