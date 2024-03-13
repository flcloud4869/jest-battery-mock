import type { BatteryInfo } from './BatteryManager'

export const PRESET_COMMON: BatteryInfo = {
  charging: true,
  chargingTime: 0,
  dischargingTime: Infinity,
  level: 1,
}

export const PRESET_USE_BATTERY: BatteryInfo = {
  charging: false,
  chargingTime: Infinity,
  dischargingTime: Infinity,
  level: 0.8,
}

export const PRESET_LOW_POWER: BatteryInfo = {
  charging: false,
  chargingTime: Infinity,
  dischargingTime: 0,
  level: 0.1,
}
