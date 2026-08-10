import { NumberValidator, StringValidator } from 'src/common/validators';

export class CreatePlanDto {
  @StringValidator({
    fieldName: 'name',
    label: 'Nome do Plano',
    minLength: 3,
    exemple: 'Plano Pro',
  })
  name: string;


  @StringValidator({
    fieldName: 'description',
    label: 'Descrição',
    optional: true,
    exemple: 'Plano completo com gestão de células, financeiro e suporte a filiais.',
  })
  description?: string;

  @NumberValidator({
    fieldName: 'month',
    label: 'Preço Mensal (R$)',
    min: 0,
    exemple: 149.90,
  })
  month: number;

  @NumberValidator({
    fieldName: 'biannual',
    label: 'Preço Semestral (R$)',
    min: 0,
    exemple: 1490.00,
  })
  biannual: number;

  @NumberValidator({
    fieldName: 'annual',
    label: 'Preço Anual (R$)',
    min: 0,
    exemple: 1490.00,
  })
  annual: number;

  @NumberValidator({
    fieldName: 'maxUsers',
    label: 'Limite de Usuários',
    optional: true,
    description: 'Deixe vazio ou nulo para ilimitado',
    exemple: 5,
  })
  maxUsers?: number;

  @NumberValidator({
    fieldName: 'maxBudgetsMonth',
    label: 'Limite de Orçamentos por mes',
    optional: true,
    description: 'Deixe vazio ou nulo para ilimitado',
    exemple: 50,
  })
  maxBudgetsMonth?: number;

  @NumberValidator({
    fieldName: 'maxDevices',
    label: 'Limite de Dispositivos',
    optional: true,
    description: 'Quantidade de dispositivos permitidos',
    exemple: 5,
  })
  maxDevices?: number;
}