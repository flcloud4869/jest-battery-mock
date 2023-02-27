export interface BatteryInfo {
  charging: boolean
  chargingTime: number
  dischargingTime: number
  level: number
}

export class BatteryManager extends EventTarget implements BatteryInfo {
  charging: boolean
  chargingTime: number
  dischargingTime: number
  level: number

  onchargingchange: EventListener | null = null
  onchargingtimechange: EventListener | null = null
  ondischargingtimechange: EventListener | null = null
  onlevelchange: EventListener | null = null

  constructor (preset: BatteryInfo) {
    super()
    this.charging = preset.charging
    this.chargingTime = preset.chargingTime
    this.dischargingTime = preset.dischargingTime
    this.level = preset.level
  }

  dispatchEvent (event: Event) {
    if (event.type === 'chargingchange') {
      this.onchargingchange?.({ ...event, currentTarget: this, target: this })
    }
    if (event.type === 'chargingtimechange') {
      this.onchargingtimechange?.({ ...event, currentTarget: this, target: this })
    }
    if (event.type === 'dischargingtimechange') {
      this.ondischargingtimechange?.({ ...event, currentTarget: this, target: this })
    }
    if (event.type === 'levelchange') {
      this.onlevelchange?.({ ...event, currentTarget: this, target: this })
    }

    return super.dispatchEvent(event)
  }
}
