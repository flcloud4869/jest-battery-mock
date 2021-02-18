import { BatteryMock } from "./BatteryMock";
import { BatteryManager } from "./BatteryManager";

test("应能正确添加和移除 getBattery", () => {
  expect("getBattery" in navigator).toBeFalsy();

  BatteryMock.mock();
  expect("getBattery" in navigator).toBeTruthy();

  BatteryMock.clean();
  expect("getBattery" in navigator).toBeFalsy();
});

test("应在执行 getBattery 后获取到电池状态", done => {
  BatteryMock.mock();

  if (!navigator.getBattery) throw new Error();

  navigator.getBattery().then(manager => {
    expect(manager.level).toBe(1);
    done();
  });

  BatteryMock.clean();
});

test("dispatch 方法应能改变电池状态并触发事件", async done => {
  BatteryMock.mock();

  if (!navigator.getBattery) throw new Error();

  const manager = await navigator.getBattery();

  manager.addEventListener("levelchange", event => {
    const target = event.target as BatteryManager;
    expect(event.type).toBe("levelchange");
    expect(target.charging).toBe(false);
    expect(target.chargingTime).toBe(30);
    expect(target.dischargingTime).toBe(30);
    expect(target.level).toBe(0.5);

    done();
  });

  BatteryMock.dispatch("levelchange", {
    charging: false,
    chargingTime: 30,
    dischargingTime: 30,
    level: 0.5,
  });
});
