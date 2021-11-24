import { ValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';
import { DISCOUNT_TYPE } from 'src/app/models/course.model';

export const taxValidator: ValidatorFn = (
  fGroup: AbstractControl
): ValidationErrors | null => {
  const taxRate = fGroup.get('taxRate')?.value;
  const taxType = fGroup.get('taxType')?.value;
  const price = fGroup.get('price')?.value;
  if (!taxRate || !taxType || !price) {
    return null;
  }
  if (taxType == DISCOUNT_TYPE.FIXED) {
    return taxRate <= price ? null : { taxFixedError: true };
  } else if (taxType == DISCOUNT_TYPE.PERCENTAGE) {
    return taxRate <= 100 ? null : { taxPercentError: true };
  } else {
    return null;
  }
};
