import { StringValidator, BooleanValidator, NumberValidator } from 'src/common/validators';

export class CreateCompanySettingDto {
  @StringValidator({
    fieldName: 'companyId',
    label: 'ID da Empresa',
    exemple: 'comp-123',
  })
  companyId: string;

  @StringValidator({
    fieldName: 'themeColor',
    label: 'Cor do Tema',
    optional: true,
    exemple: '#000000',
  })
  themeColor?: string;

  @StringValidator({
    fieldName: 'mercadoPagoKey',
    label: 'Chave do Mercado Pago',
    optional: true,
    exemple: 'mp-key-123',
  })
  mercadoPagoKey?: string;

  @StringValidator({
    fieldName: 'mercadoPagoToken',
    label: 'Token do Mercado Pago',
    optional: true,
    exemple: 'mp-token-123',
  })
  mercadoPagoToken?: string;

  @StringValidator({
    fieldName: 'mercadoPagoMode',
    label: 'Modo do Mercado Pago',
    optional: true,
    exemple: 'TEST',
  })
  mercadoPagoMode?: string;

  @StringValidator({
    fieldName: 'mercadoPagoEmail',
    label: 'E-mail do Mercado Pago',
    optional: true,
    exemple: 'financeiro@oficina.com',
  })
  mercadoPagoEmail?: string;

  @StringValidator({
    fieldName: 'pixKey',
    label: 'Chave PIX',
    optional: true,
    exemple: 'cnpj-pix-key',
  })
  pixKey?: string;

  @BooleanValidator({
    fieldName: 'usingEmail',
    label: 'Usa E-mail Próprio',
    optional: true,
  })
  usingEmail?: boolean;

  @StringValidator({
    fieldName: 'emailHost',
    label: 'Host do E-mail',
    optional: true,
    exemple: 'smtp.gmail.com',
  })
  emailHost?: string;

  @StringValidator({
    fieldName: 'emailUser',
    label: 'Usuário do E-mail',
    optional: true,
    exemple: 'notificacoes@oficina.com',
  })
  emailUser?: string;

  @StringValidator({
    fieldName: 'emailPassword',
    label: 'Senha do E-mail',
    optional: true,
    exemple: 'senha-app-email',
  })
  emailPassword?: string;

  @NumberValidator({
    fieldName: 'emailPort',
    label: 'Porta do E-mail',
    optional: true,
    exemple: 587,
  })
  emailPort?: number;
}
