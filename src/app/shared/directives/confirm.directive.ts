import { Directive, Input } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator, ValidatorFn } from '@angular/forms';

export function confirmValidator(confirm: string): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } => { // 传入绑定表单的formControl
    if (!control.value) { // 如果绑定未输入值，则返回 required错误
      return { required: true };
    }
    // 如果两次输入的值不相同，则返回confirm的错误
    return control.value !== confirm ? { confirm: { value: true } } : null;
  };
}

@Directive({
  selector: '[wzwConfirm]',
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: ConfirmDirective,
      multi: true
    }
  ]
})
export class ConfirmDirective implements Validator {
  @Input('wzwConfirm') confirm: string;
  constructor() { }
  validate(control: AbstractControl): ValidationErrors {
    return this.confirm ? confirmValidator(this.confirm)(control) : null;
  }
}
