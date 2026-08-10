import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator';

@ValidatorConstraint({ name: 'isCnpjValid', async: false })
export class IsCnpjConstraint implements ValidatorConstraintInterface {
  validate(cnpj: any, args: ValidationArguments): boolean {
    if (typeof cnpj !== 'string') return false;

    // Remove pontos, barra e hífen, convertendo para maiúsculas
    const cleanCnpj = cnpj.replace(/[^a-zA-Z0-9]/g, '').toUpperCase();

    // Deve conter exatamente 14 caracteres
    if (cleanCnpj.length !== 14) return false;

    // Rejeita sequências com todos os caracteres idênticos (ex: 00000000000000 ou AAAAAAAAAAAAAA)
    if (/^([a-zA-Z0-9])\1{13}$/.test(cleanCnpj)) return false;

    // Os dois últimos caracteres (DVs) DEVEM ser estritamente numéricos
    if (!/^\d{2}$/.test(cleanCnpj.substring(12))) return false;

    // Validação do 1º Dígito Verificador (Módulo 11)
    const weightsDv1 = [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
    let sumDv1 = 0;

    for (let i = 0; i < 12; i++) {
      const charCode = cleanCnpj.charCodeAt(i);
      // Padrão RFB: Valor ASCII menos 48 (Dígitos '0'-'9' -> 0..9 | Letras 'A'-'Z' -> 17..42)
      const numericValue = charCode - 48;
      sumDv1 += numericValue * weightsDv1[i];
    }

    let rest1 = sumDv1 % 11;
    let expectedDv1 = rest1 < 2 ? 0 : 11 - rest1;

    if (parseInt(cleanCnpj.charAt(12), 10) !== expectedDv1) {
      return false;
    }

    // Validação do 2º Dígito Verificador (Módulo 11)
    const weightsDv2 = [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
    let sumDv2 = 0;

    for (let i = 0; i < 13; i++) {
      const charCode = cleanCnpj.charCodeAt(i);
      const numericValue = charCode - 48;
      sumDv2 += numericValue * weightsDv2[i];
    }

    let rest2 = sumDv2 % 11;
    let expectedDv2 = rest2 < 2 ? 0 : 11 - rest2;

    if (parseInt(cleanCnpj.charAt(13), 10) !== expectedDv2) {
      return false;
    }

    return true;
  }

  defaultMessage(args: ValidationArguments): string {
    return `O CNPJ informado é inválido.`;
  }
}