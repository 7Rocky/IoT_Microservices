import { FormGroup } from '@angular/forms'

export function MustBeOrderedDates(init: string, end: string) {
  return (formGroup: FormGroup) => {
    const init_date = formGroup.controls[init]
    const end_date = formGroup.controls[end]

    if (end_date.errors && !end_date.errors.mustMatch) return

    if (init_date.value.getTime() < end_date.value.getTime() && end_date.value.getTime() <= Date.now()) {
      init_date.setErrors(null)
      end_date.setErrors(null)
    } else {
      init_date.setErrors({ mustMatch: true })
      end_date.setErrors({ mustMatch: true })
    }
  }
}
