import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function passwordMatchValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const password = control.get('newPassword')?.value;
    const confirmPassword = control.get('confirmPassword')?.value;

    // If passwords don't match
    if (password && confirmPassword && password !== confirmPassword) {
      return { passwordMismatch: true };  // Return error
    }

    return null;  // No error if they match
  };
}
