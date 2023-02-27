import { BatteryManager, BatteryInfo } from './BatteryManager'
import { PRESET_COMMON } from './preset'

interface Navigator {
  getBattery?: () => Promise<BatteryManager>
  _BATTERY_MANAGER_STORAGE?: BatteryManager
}

declare const navigator: Navigator

export function enableMock (preset: BatteryInfo = PRESET_COMMON) {
  navigator._BATTERY_MANAGER_STORAGE = new BatteryManager(preset)
  navigator.getBattery = () => Promise.resolve(navigator._BATTERY_MANAGER_STORAGE!)
}

export function disableMock () {
  delete navigator.getBattery
  delete navigator._BATTERY_MANAGER_STORAGE
}

export function dispatch (state?: Partial<BatteryInfo>) {
  if (!navigator.getBattery || !navigator._BATTERY_MANAGER_STORAGE) {
    console.error('Please enable mock first.')
    return false
  }

  const target = navigator._BATTERY_MANAGER_STORAGE
  target.charging = state?.charging ?? target.charging
  target.chargingTime = state?.chargingTime ?? target.chargingTime
  target.dischargingTime = state?.dischargingTime ?? target.dischargingTime
  target.level = state?.level ?? target.level

  if (state?.charging) {
    target.dispatchEvent(new Event('chargingchange'))
  }
  if (state?.chargingTime) {
    target.dispatchEvent(new Event('chargingtimechange'))
  }
  if (state?.dischargingTime) {
    target.dispatchEvent(new Event('dischargingtimechange'))
  }
  if (state?.level) {
    target.dispatchEvent(new Event('levelchange'))
  }

  return true
}

export * from './BatteryManager'
export * from './preset'
