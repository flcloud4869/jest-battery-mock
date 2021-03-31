export class BatteryManager extends EventTarget {
  charging: boolean;
  chargingTime: number;
  dischargingTime: number;
  level: number;
  onchargingchange: EventListener | null;
  onchargingtimechange: EventListener | null;
  ondischargingtimechange: EventListener | null;
  onlevelchange: EventListener | null;

  constructor() {
    super();

    // default value
    this.charging = true;
    this.chargingTime = 0;
    this.dischargingTime = Infinity;
    this.level = 1;
    this.onchargingchange = null;
    this.onchargingtimechange = null;
    this.ondischargingtimechange = null;
    this.onlevelchange = null;
  }

  dispatchEvent(event: Event): boolean {
    if (typeof this.onchargingchange === "function" && event.type === "chargingchange") {
      const eventData: Event = {
        ...new Event("chargingchange"),
        type: "chargingchange",
        currentTarget: this,
        srcElement: this,
        target: this,
      };

      this.onchargingchange.call(this, eventData);
    }

    if (typeof this.onchargingtimechange === "function" && event.type === "chargingtimechange") {
      const eventData: Event = {
        ...new Event("chargingtimechange"),
        type: "chargingtimechange",
        currentTarget: this,
        srcElement: this,
        target: this,
      };

      this.onchargingtimechange.call(this, eventData);
    }

    if (typeof this.ondischargingtimechange === "function" && event.type === "dischargingtimechange") {
      const eventData: Event = {
        ...new Event("dischargingtimechange"),
        type: "dischargingtimechange",
        currentTarget: this,
        srcElement: this,
        target: this,
      };

      this.ondischargingtimechange.call(this, eventData);
    }

    if (typeof this.onlevelchange === "function" && event.type === "levelchange") {
      const eventData: Event = {
        ...new Event("levelchange"),
        type: "levelchange",
        currentTarget: this,
        srcElement: this,
        target: this,
      };

      this.onlevelchange.call(this, eventData);
    }

    return super.dispatchEvent(event);
  }
}
