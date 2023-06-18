# jest-battery-mock

BatteryManager API mock for Jest

[English](./README.md) | [简体中文](./README.zh-CN.md)

![npm](https://img.shields.io/npm/v/jest-battery-mock?logo=npm&style=for-the-badge)
![GitHub Workflow Status](https://img.shields.io/github/actions/workflow/status/suiyun39/jest-battery-mock/ci.yml?label=CI&logo=github-actions&logoColor=white&style=for-the-badge)
![Codecov](https://img.shields.io/codecov/c/github/suiyun39/jest-battery-mock?logo=codecov&style=for-the-badge)

## Installation

```bash
pnpm add -D jest-battery-mock
```

## Example

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

Enable mock for `navigator.getBattery`

```typescript
type enableMock = (preset?: BatteryInfo) => void
```

You can set `BatteryManager` initial state with `preset`, By default use `PRESET_COMMON`

### disableMock

Disable mock for `navigator.getBattery`

```typescript
type disableMock = () => void
```

### dispatch

Change `BatteryManager` state and trigger event, **trigger the corresponding event only when the state changes**

```typescript
type dispatch = (state?: Partial<BatteryInfo>) => boolean
```

You can also use preset here

## Preset

We have some presets for you, you can use it when call `enableMock` and `dispatch`:

|                 | PRESET_COMMON | PRESET_USE_BATTERY | PRESET_LOW_POWER |
|-----------------|---------------|--------------------|------------------|
| charging        | true          | false              | false            |
| chargingTime    | 0             | Infinity           | Infinity         |
| dischargingTime | Infinity      | Infinity           | 0                |
| level           | 1             | 0.8                | 0.1              |

## Reference & Thanks

- [jest-fetch-mock](https://github.com/jefflau/jest-fetch-mock)
