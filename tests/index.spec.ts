import { afterEach, test, expect, jest } from '@jest/globals'
import { disableMock, dispatch, enableMock, type BatteryManager, PRESET_LOW_POWER } from '../src'

interface Navigator {
  getBattery: () => Promise<BatteryManager>
}

declare const navigator: Navigator

afterEach(() => disableMock())

test('应正确添加和移除 navigator.getBattery', () => {
  enableMock()
  expect('getBattery' in navigator).toBe(true)

  disableMock()
  expect('getBattery' in navigator).toBe(false)
})

test('使用预设时应正确设置状态', async () => {
  enableMock(PRESET_LOW_POWER)
  const batteryManager = await navigator.getBattery()

  expect(batteryManager.charging).toBe(PRESET_LOW_POWER.charging)
  expect(batteryManager.chargingTime).toBe(PRESET_LOW_POWER.chargingTime)
  expect(batteryManager.dischargingTime).toBe(PRESET_LOW_POWER.dischargingTime)
  expect(batteryManager.level).toBe(PRESET_LOW_POWER.level)
})

test('应在 dispatch 时更新状态并触发事件', async () => {
  enableMock()
  const batteryManager = await navigator.getBattery()
  const callback = jest.fn()

  batteryManager.addEventListener('chargingchange', callback)
  batteryManager.addEventListener('chargingtimechange', callback)
  batteryManager.addEventListener('dischargingtimechange', callback)
  batteryManager.addEventListener('levelchange', callback)
  dispatch(PRESET_LOW_POWER)

  expect(batteryManager.charging).toBe(PRESET_LOW_POWER.charging)
  expect(batteryManager.chargingTime).toBe(PRESET_LOW_POWER.chargingTime)
  expect(batteryManager.dischargingTime).toBe(PRESET_LOW_POWER.dischargingTime)
  expect(batteryManager.level).toBe(PRESET_LOW_POWER.level)
  expect(callback).toBeCalledTimes(4)
})

test('应在 dispatch 时触发 on*', async () => {
  enableMock()
  const batteryManager = await navigator.getBattery()
  const callback = jest.fn()

  batteryManager.onchargingchange = callback
  batteryManager.onchargingtimechange = callback
  batteryManager.ondischargingtimechange = callback
  batteryManager.onlevelchange = callback
  dispatch(PRESET_LOW_POWER)

  expect(callback).toBeCalledTimes(4)
})

test('未更新的状态不触发对应的 change 事件', async () => {
  enableMock(PRESET_LOW_POWER)
  const batteryManager = await navigator.getBattery()
  const callback = jest.fn()

  batteryManager.addEventListener('chargingchange', callback)
  batteryManager.addEventListener('chargingtimechange', callback)
  batteryManager.addEventListener('dischargingtimechange', callback)
  batteryManager.addEventListener('levelchange', callback)
  dispatch(PRESET_LOW_POWER)

  expect(callback).toBeCalledTimes(0)
})

test('未启用 mock 时执行 dispatch 应提示错误', () => {
  console.error = jest.fn()
  disableMock()

  dispatch()
  expect(console.error).toBeCalledWith('Please enable mock first.')
})
