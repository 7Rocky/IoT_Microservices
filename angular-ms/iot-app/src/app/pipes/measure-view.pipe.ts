import { Pipe, PipeTransform } from '@angular/core'

@Pipe({ name: 'measureView', pure: false })
export class MeasureViewPipe implements PipeTransform {
  transform(value: string): string {
    if (!value) return ''
    const measures: { name: string, view: string }[] = [
      { name: 'humidity', view: 'Humedad' },
      { name: 'light', view: 'Bombilla inteligente' },
      { name: 'temperature', view: 'Temperatura' }
    ]

    return measures.filter(measure => measure.name === value)[0].view
  }
}
