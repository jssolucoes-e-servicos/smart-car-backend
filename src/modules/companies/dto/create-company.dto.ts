import { StringValidator, CNPJValidator, EmailValidator } from 'src/common/validators';

export class CreateCompanyDto {
  @StringValidator({
    fieldName: 'name',
    label: 'Razão Social',
    minLength: 3,
    exemple: 'SmartCar Ltda',
  })
  name: string;

  @StringValidator({
    fieldName: 'fantasy',
    label: 'Nome Fantasia',
    minLength: 3,
    exemple: 'Oficina SmartCar',
  })
  fantasy: string;

  @CNPJValidator({
    fieldName: 'cnpj',
    label: 'CNPJ',
    exemple: '12345678000195',
  })
  cnpj: string;

  @StringValidator({
    fieldName: 'ie',
    label: 'Inscrição Estadual',
    exemple: 'ISENTO',
  })
  ie: string;

  @StringValidator({
    fieldName: 'phone',
    label: 'Telefone',
    exemple: '51999999999',
  })
  phone: string;

  @EmailValidator({
    fieldName: 'email',
    label: 'E-mail',
    exemple: 'contato@smartcar.com',
  })
  email: string;

  @StringValidator({
    fieldName: 'addressInLine',
    label: 'Endereço Completo',
    exemple: 'Rua das Flores, 123',
  })
  addressInLine: string;

  @StringValidator({
    fieldName: 'zipCode',
    label: 'CEP',
    exemple: '90000000',
  })
  zipCode: string;

  @StringValidator({
    fieldName: 'publicPlace',
    label: 'Logradouro',
    exemple: 'Rua das Flores',
  })
  publicPlace: string;

  @StringValidator({
    fieldName: 'number',
    label: 'Número',
    exemple: '123',
  })
  number: string;

  @StringValidator({
    fieldName: 'complement',
    label: 'Complemento',
    optional: true,
    exemple: 'Sala A',
  })
  complement?: string;

  @StringValidator({
    fieldName: 'neighborhood',
    label: 'Bairro',
    exemple: 'Centro',
  })
  neighborhood: string;

  @StringValidator({
    fieldName: 'city',
    label: 'Cidade',
    exemple: 'Porto Alegre',
  })
  city: string;

  @StringValidator({
    fieldName: 'state',
    label: 'Estado',
    exemple: 'RS',
  })
  state: string;

  @StringValidator({
    fieldName: 'logo',
    label: 'Logo URL',
    optional: true,
    exemple: 'https://smartcar.com/logo.png',
  })
  logo?: string;
}
