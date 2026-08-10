import { StringValidator, EmailValidator } from 'src/common/validators';

export class CreateUserDto {
  @StringValidator({
    fieldName: 'companyId',
    label: 'ID da Empresa',
    exemple: 'comp-123',
  })
  companyId: string;

  @StringValidator({
    fieldName: 'name',
    label: 'Nome do Usuário',
    minLength: 3,
    exemple: 'João da Silva',
  })
  name: string;

  @EmailValidator({
    fieldName: 'email',
    label: 'E-mail',
    exemple: 'joao.silva@email.com',
  })
  email: string;

  @StringValidator({
    fieldName: 'password',
    label: 'Senha',
    minLength: 6,
    exemple: 'senha123',
  })
  password: string;
}
