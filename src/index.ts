import { BatteryManager } from "./BatteryManager";

export * from "./BatteryManager";
export * from "./BatteryMock";

declare global {
  // eslint-disable-next-line
  interface Navigator extends NavigatorGetBattery {}

  // eslint-disable-next-line
  interface WorkerNavigator extends NavigatorGetBattery {}

  interface NavigatorGetBattery {
    getBattery?: () => Promise<BatteryManager>;
    _battery_mock_storage?: BatteryManager;
  }
}
