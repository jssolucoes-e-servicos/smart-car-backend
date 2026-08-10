import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator';

@ValidatorConstraint({ name: 'isCpfValid', async: false })
export class IsCpfConstraint implements ValidatorConstraintInterface {
  validate(cpf: any, args: ValidationArguments): boolean {
    if (typeof cpf !== 'string') return false;

    // Remove caracteres não numéricos
    const cleanCpf = cpf.replace(/\D/g, '');

    // Deve ter exatamente 11 dígitos
    if (cleanCpf.length !== 11) return false;

    // Rejeita CPFs com todos os dígitos iguais (ex: 11111111111, 00000000000)
    if (/^(\d)\1{10}$/.test(cleanCpf)) return false;

    // Validação do 1º Dígito Verificador
    let sum = 0;
    for (let i = 0; i < 9; i++) {
      sum += parseInt(cleanCpf.charAt(i)) * (10 - i);
    }
    let rev = 11 - (sum % 11);
    if (rev === 10 || rev === 11) rev = 0;
    if (rev !== parseInt(cleanCpf.charAt(9))) return false;

    // Validação do 2º Dígito Verificador
    sum = 0;
    for (let i = 0; i < 10; i++) {
      sum += parseInt(cleanCpf.charAt(i)) * (11 - i);
    }
    rev = 11 - (sum % 11);
    if (rev === 10 || rev === 11) rev = 0;
    if (rev !== parseInt(cleanCpf.charAt(10))) return false;

    return true;
  }

  defaultMessage(args: ValidationArguments): string {
    return `O CPF informado é inválido.`;
  }
}