import { Humidity } from '@models/humidity.model'
import { Light } from '@models/light.model'
import { Temperature } from '@models/temperature.model'

export type Measure = Humidity | Light | Temperature
