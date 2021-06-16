import { BatteryMock } from "./mock";
import { BatteryManager } from "./manager";

afterEach(() => {
  BatteryMock.clean();
});

test("应正确添加和移除 navigator.getBattery", () => {
  expect("getBattery" in navigator).toBeFalsy();

  BatteryMock.mock();
  expect("getBattery" in navigator).toBeTruthy();

  BatteryMock.clean();
  expect("getBattery" in navigator).toBeFalsy();
});

test("getBattery 返回的 promise 中应包含电池状态", done => {
  BatteryMock.mock();
  if (!navigator.getBattery) throw Error();

  navigator.getBattery().then(manager => {
    expect(manager.charging).toBe(true);
    expect(manager.chargingTime).toBe(0);
    expect(manager.dischargingTime).toBe(Infinity);
    expect(manager.level).toBe(1);
    done();
  });

  BatteryMock.clean();
});

test("应在执行 dispatch 方法时触发注册的事件", done => {
  BatteryMock.mock();
  if (!navigator.getBattery) throw Error();

  navigator.getBattery().then(manager => {
    manager.addEventListener("levelchange", evt => {
      const target = evt.target as BatteryManager;
      expect(evt.type).toBe("levelchange");
      expect(target.charging).toBe(true);
      expect(target.chargingTime).toBe(0);
      expect(target.dischargingTime).toBe(Infinity);
      expect(target.level).toBe(1);
      done();
    });

    BatteryMock.dispatch("levelchange");
  });
});

test("应在执行 dispatch 方法时正确更新状态值", done => {
  BatteryMock.mock();
  if (!navigator.getBattery) throw Error();

  navigator.getBattery().then(manager => {
    manager.addEventListener("levelchange", evt => {
      const target = evt.target as BatteryManager;
      expect(evt.type).toBe("levelchange");
      expect(target.charging).toBe(false);
      expect(target.chargingTime).toBe(100);
      expect(target.dischargingTime).toBe(100);
      expect(target.level).toBe(0.5);
      done();
    });

    BatteryMock.dispatch("levelchange", {
      charging: false,
      chargingTime: 100,
      dischargingTime: 100,
      level: 0.5,
    });
  });
});

test("应在重复 mock 时抛出异常", () => {
  const runner = () => {
    BatteryMock.mock();
    BatteryMock.mock();
  };

  expect(runner).toThrow("navigator.getBattery is defined");
});

test("应在执行 dispatch 时检查 mock 状态", () => {
  const runner = () => {
    BatteryMock.clean();
    BatteryMock.dispatch("levelchange");
  };

  expect(runner).toThrow("navigator.getBattery is not defined");
});
