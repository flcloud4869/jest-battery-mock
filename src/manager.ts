export class BatteryManager extends EventTarget {
  charging = true;
  chargingTime = 0;
  dischargingTime = Infinity;
  level = 1;
  onchargingchange: EventListener | undefined = undefined;
  onchargingtimechange: EventListener | undefined = undefined;
  ondischargingtimechange: EventListener | undefined = undefined;
  onlevelchange: EventListener | undefined = undefined;

  constructor() {
    super();
  }

  dispatchEvent(event: Event): boolean {
    if (this.onchargingchange && event.type === "chargingchange") {
      const changeEvt: Event = { ...new Event("chargingchange"), type: "chargingchange" };
      const evt: Event = { ...changeEvt, currentTarget: this, srcElement: this, target: this };
      this.onchargingchange.call(this, evt);
    }

    if (this.onchargingtimechange && event.type === "chargingtimechange") {
      const changeEvt: Event = { ...new Event("chargingtimechange"), type: "chargingtimechange" };
      const evt: Event = { ...changeEvt, currentTarget: this, srcElement: this, target: this };
      this.onchargingtimechange.call(this, evt);
    }

    if (this.ondischargingtimechange && event.type === "dischargingtimechange") {
      const changeEvt: Event = { ...new Event("dischargingtimechange"), type: "dischargingtimechange" };
      const evt: Event = { ...changeEvt, currentTarget: this, srcElement: this, target: this };
      this.ondischargingtimechange.call(this, evt);
    }

    if (this.onlevelchange && event.type === "levelchange") {
      const changeEvt: Event = { ...new Event("levelchange"), type: "levelchange" };
      const evt: Event = { ...changeEvt, currentTarget: this, srcElement: this, target: this };
      this.onlevelchange.call(this, evt);
    }

    return super.dispatchEvent(event);
  }
}
