# jest-battery-mock

用于 Jest 的 BatteryManager API 模拟

[English](./README.md) | [简体中文](./README.zh-CN.md)

![npm](https://img.shields.io/npm/v/jest-battery-mock?logo=npm&style=for-the-badge)
![GitHub Workflow Status](https://img.shields.io/github/actions/workflow/status/nodoccat/jest-battery-mock/ci.yml?label=CI&logo=github-actions&logoColor=white&style=for-the-badge)
![Codecov](https://img.shields.io/codecov/c/github/nodoccat/jest-battery-mock?logo=codecov&style=for-the-badge)

## 安装

```bash
pnpm add -D jest-battery-mock
```

## 示例

```typescript
import { enableMock, disableMock, dispatch } from 'jest-battery-mock'

beforeEach(() => enableMock())
afterEach(() => disableMock())

test('example', async () => {
  const batteryManager = await navigator.getBattery()
  const callback = jest.fn()
  
  batteryManager.addEventListener('chargingchange', callback)
  dispatch({ charging: false })
  expect(callback).toBeCalledTimes(1)
})
```

## API

### enableMock

启用 `navigator.getBattery` 模拟

```typescript
type enableMock = (preset?: BatteryInfo) => void
```

你可以使用 preset 设置 `BatteryManager` 的初始状态，默认使用 `PRESET_COMMON`

### disableMock

禁用 `navigator.getBattery` 模拟

```typescript
type disableMock = () => void
```

### dispatch

修改 `BatteryManager` 的状态并触发事件，**只有状态发生变化时才会触发对应事件**

```typescript
type dispatch = (state?: Partial<BatteryInfo>) => boolean
```

你也可以在这里使用预设

## 预设

我们提供了一些预设，你可以在调用 `enableMock` 和 `dispatch` 时使用：

|                 | PRESET_COMMON | PRESET_USE_BATTERY | PRESET_LOW_POWER |
|-----------------|---------------|--------------------|------------------|
| charging        | true          | false              | false            |
| chargingTime    | 0             | Infinity           | Infinity         |
| dischargingTime | Infinity      | Infinity           | 0                |
| level           | 1             | 0.8                | 0.1              |

## 参考与感谢

- [jest-fetch-mock](https://github.com/jefflau/jest-fetch-mock)
