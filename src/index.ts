import { BatteryManager, type BatteryInfo } from './BatteryManager'
import { PRESET_COMMON } from './preset'

interface Navigator {
  getBattery?: () => Promise<BatteryManager>
  _BATTERY_MANAGER_STORAGE?: BatteryManager
}

declare const navigator: Navigator

export function enableMock(preset: BatteryInfo = PRESET_COMMON) {
  navigator._BATTERY_MANAGER_STORAGE = new BatteryManager(preset)
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  navigator.getBattery = async () => Promise.resolve(navigator._BATTERY_MANAGER_STORAGE!)
}

export function disableMock() {
  delete navigator.getBattery
  delete navigator._BATTERY_MANAGER_STORAGE
}

export function dispatch(state?: Partial<BatteryInfo>) {
  if (!navigator.getBattery || !navigator._BATTERY_MANAGER_STORAGE) {
    console.error('Please enable mock first.')
    return false
  }

  const target = navigator._BATTERY_MANAGER_STORAGE
  const events: Event[] = []

  if (state?.charging !== undefined && state.charging !== target.charging) {
    target.charging = state.charging
    events.push(new Event('chargingchange'))
  }
  if (state?.chargingTime !== undefined && state.chargingTime !== target.chargingTime) {
    target.chargingTime = state.chargingTime
    events.push(new Event('chargingtimechange'))
  }
  if (state?.dischargingTime !== undefined && state.dischargingTime !== target.dischargingTime) {
    target.dischargingTime = state.dischargingTime
    events.push(new Event('dischargingtimechange'))
  }
  if (state?.level !== undefined && state.level !== target.level) {
    target.level = state.level
    events.push(new Event('levelchange'))
  }

  events.forEach(evt => target.dispatchEvent(evt))
  return true
}

export * from './BatteryManager'
export * from './preset'
