import {AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export function userExistsValidator( income: String): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    return control.value === income ? {passwordStrength:true} : null;
  }
}
