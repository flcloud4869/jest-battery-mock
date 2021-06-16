import { BatteryManager } from "./manager";

type BatteryEventType = "chargingchange" | "chargingtimechange" | "dischargingtimechange" | "levelchange";
type BatteryState = Partial<{ charging: boolean; chargingTime: number; dischargingTime: number; level: number }>;

export class BatteryMock {
  static mock(): void {
    if ("getBattery" in navigator) {
      throw new Error("navigator.getBattery is defined");
    }

    const manager = new BatteryManager();

    // 全局保存副本以提供给其他方法
    Object.defineProperty(navigator, "_battery_mock_storage", {
      configurable: true,
      value: manager,
    });

    Object.defineProperty(navigator, "getBattery", {
      configurable: true,
      value: () => Promise.resolve(manager),
    });
  }

  static clean(): void {
    if ("getBattery" in navigator) {
      delete navigator["getBattery"];
    }

    if ("_battery_mock_storage" in navigator) {
      delete navigator["_battery_mock_storage"];
    }
  }

  static dispatch(type: BatteryEventType, state?: BatteryState): boolean {
    if (!("_battery_mock_storage" in navigator)) {
      throw new Error("navigator.getBattery is not defined");
    }

    const target = navigator._battery_mock_storage as BatteryManager;

    target.charging = state?.charging ?? target.charging;
    target.chargingTime = state?.chargingTime ?? target.chargingTime;
    target.dischargingTime = state?.dischargingTime ?? target.dischargingTime;
    target.level = state?.level ?? target.level;

    return target.dispatchEvent(new Event(type));
  }
}
