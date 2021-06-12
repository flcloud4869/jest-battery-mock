import { BatteryManager } from "./manager";

test("应正确初始化预设值", () => {
  const manager = new BatteryManager();

  expect(manager.charging).toBe(true);
  expect(manager.chargingTime).toBe(0);
  expect(manager.dischargingTime).toBe(Infinity);
  expect(manager.level).toBe(1);
});

test("应正确处理事件注册, 移除和触发", () => {
  const manager = new BatteryManager();
  const listener1 = jest.fn();
  const listener2 = jest.fn();

  manager.addEventListener("levelchange", listener1, false);
  manager.addEventListener("levelchange", listener2, false);
  manager.dispatchEvent(new Event("levelchange"));
  expect(listener1).toBeCalledTimes(1);
  expect(listener2).toBeCalledTimes(1);

  manager.removeEventListener("levelchange", listener1, false);
  manager.dispatchEvent(new Event("levelchange"));
  expect(listener1).toBeCalledTimes(1);
  expect(listener2).toBeCalledTimes(2);
});

test("应在事件回调中包含当前电池状态", done => {
  const manager = new BatteryManager();

  manager.addEventListener("levelchange", event => {
    const target = event.target as BatteryManager;
    expect(target.charging).toBe(true);
    done();
  });

  manager.dispatchEvent(new Event("levelchange"));
});

test("onchargingchange", done => {
  const manager = new BatteryManager();

  manager.onchargingchange = event => {
    const target = event.target as BatteryManager;
    expect(event.type).toBe("chargingchange");
    expect(target.charging).toBe(true);
    done();
  };

  manager.dispatchEvent(new Event("chargingchange"));
});

test("onchargingtimechange", done => {
  const manager = new BatteryManager();

  manager.onchargingtimechange = event => {
    const target = event.target as BatteryManager;
    expect(event.type).toBe("chargingtimechange");
    expect(target.charging).toBe(true);
    done();
  };

  manager.dispatchEvent(new Event("chargingtimechange"));
});

test("ondischargingtimechange", done => {
  const manager = new BatteryManager();

  manager.ondischargingtimechange = event => {
    const target = event.target as BatteryManager;
    expect(event.type).toBe("dischargingtimechange");
    expect(target.charging).toBe(true);
    done();
  };

  manager.dispatchEvent(new Event("dischargingtimechange"));
});

test("onlevelchange", done => {
  const manager = new BatteryManager();

  manager.onlevelchange = event => {
    const target = event.target as BatteryManager;
    expect(event.type).toBe("levelchange");
    expect(target.charging).toBe(true);
    done();
  };

  manager.dispatchEvent(new Event("levelchange"));
});
