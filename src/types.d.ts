import { BatteryManager } from "./manager";

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
