import { FormGroup } from '@angular/forms'

export function MustMatch(controlName: string, matchingControlName: string) {
  return (formGroup: FormGroup) => {
    const control = formGroup.controls[controlName]
    const matchingControl = formGroup.controls[matchingControlName]

    if (matchingControl.errors && !matchingControl.errors.mustMatch) return

    if (control.value !== matchingControl.value) {
      control.setErrors({ mustMatch: true })
      matchingControl.setErrors({ mustMatch: true })
    } else {
      control.setErrors(null)
      matchingControl.setErrors(null)
    }
  }
}
