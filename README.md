# jest-battery-mock

Battery api mock for jest

![npm](https://img.shields.io/npm/v/jest-battery-mock?logo=npm&style=for-the-badge)
![CI](https://img.shields.io/github/workflow/status/nodoccat/jest-battery-mock/CI?label=CI&logo=github&style=for-the-badge)
![code quality](https://img.shields.io/codacy/grade/422d3cf176954f3a95c0ac06b4eada14?logo=codacy&style=for-the-badge)
![coverage](https://img.shields.io/codacy/coverage/422d3cf176954f3a95c0ac06b4eada14?logo=codacy&style=for-the-badge)

## Install

```shell
npm install -D jest-battery-mock
```

## Use

```js
import { BatteryMock } from "jest-battery-mock";

test("test", () => {
  BatteryMock.mock();
  // ...
  BatteryMock.dispatch("levelchange", { level: 0.5 });
  // ...
  BatteryMock.clean();
});
```

## Default State

| name            | value    |
| --------------- | -------- |
| charging        | true     |
| chargingTime    | 0        |
| dischargingTime | Infinity |
| level           | 1        |

## Reference & Thanks

- [jsdom/jsdom](https://github.com/jsdom/jsdom)
- [dyakovk/jest-matchmedia-mock](https://github.com/dyakovk/jest-matchmedia-mock)
