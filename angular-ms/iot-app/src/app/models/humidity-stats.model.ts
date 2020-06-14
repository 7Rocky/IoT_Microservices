export interface HumidityStats {
  end_date: string,
  end_timestamp: number,
  init_date: string,
  init_timestamp: number,
  ip: string,
  max_value: number,
  measure: string,
  mean_value: number,
  min_value: number,
  n_samples: number,
  real_values: number[],
  sensor: string,
  std_deviation: number,
  time_span: number,
  username: string
}
