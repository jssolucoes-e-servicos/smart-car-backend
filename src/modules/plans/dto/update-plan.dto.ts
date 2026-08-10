import { PartialType } from "@nestjs/swagger";
import { CreatePlanDto } from "./create-plan.dto";
import { BooleanValidator } from "src/common/validators";

export class UpdatePlanDto extends PartialType(CreatePlanDto) {
  @BooleanValidator({
    fieldName: 'active',
    label: 'Ativo',
    optional: true
  })
  active?: boolean;
}