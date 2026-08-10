import { NumberValidator, StringValidator } from 'src/common/validators';

export class PaginationQueryDto {
  @NumberValidator({
    fieldName: 'page',
    optional: true,
    min: 1,
    exemple: 1,
  })
  page: number = 1;

  @NumberValidator({
    fieldName: 'perPage',
    optional: true,
    min: 1,
    exemple: 10,
  })
  perPage: number = 10;

  @StringValidator({
    fieldName: 'search',
    optional: true,
    description: 'Texto para busca (nome, telefone, cpf, etc)',
  })
  search?: string;
}