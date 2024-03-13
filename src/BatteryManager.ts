export interface BatteryInfo {
  charging: boolean
  chargingTime: number
  dischargingTime: number
  level: number
}

export class BatteryManager extends EventTarget implements BatteryInfo {
  public charging: boolean
  public chargingTime: number
  public dischargingTime: number
  public level: number

  public onchargingchange: EventListener | null = null
  public onchargingtimechange: EventListener | null = null
  public ondischargingtimechange: EventListener | null = null
  public onlevelchange: EventListener | null = null

  public constructor(preset: BatteryInfo) {
    super()
    this.charging = preset.charging
    this.chargingTime = preset.chargingTime
    this.dischargingTime = preset.dischargingTime
    this.level = preset.level
  }

  public dispatchEvent(event: Event) {
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
