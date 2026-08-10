import { StringValidator, CPFValidator, EmailValidator } from 'src/common/validators';

export class CreateManagerDto {
  @StringValidator({
    fieldName: 'name',
    label: 'Nome do Gerente',
    minLength: 3,
    exemple: 'João da Silva',
  })
  name: string;

  @CPFValidator({
    fieldName: 'cpf',
    label: 'CPF',
    exemple: '12345678909',
  })
  cpf: string;

  @StringValidator({
    fieldName: 'phone',
    label: 'Telefone',
    exemple: '51999999999',
  })
  phone: string;

  @EmailValidator({
    fieldName: 'email',
    label: 'E-mail',
    exemple: 'joao@smartcar.com',
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
