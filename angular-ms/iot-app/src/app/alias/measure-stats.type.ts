import { HumidityStats } from '@models/humidity-stats.model'
import { LightStats } from '@models/light-stats.model'
import { TemperatureStats } from '@models/temperature-stats.model'

export type MeasureStats = HumidityStats | LightStats | TemperatureStats
