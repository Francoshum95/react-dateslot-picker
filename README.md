# React-Dateslot-Picker
![](demo/picker_demo.gif?raw=1)

A customizable calendar and timeslot picker was designed as React components that can handle most booking/reversion use cases.

Demo, Documentation & Example: [react-dateslot-picker](https://react-dateslot-picker.netlify.app/?path=/docs/overview-about--docs) 

## Installation

```
npm install react-dateslot-picker
```

```
yarn add react-dateslot-picker
```

## Example

```javaScript
    import {DateSlotPicker} from 'react-dateslot-picker';
    import 'react-dateslot-picker/dist/style.css'

    const Example  = () => {
      const props = {
        startDate: 1672549200000,
        endDate: 1701406800000,
        currentDate: 1680321600000,
        dailyTimePair: [{
          startTime: [10, 0],
          endTime: [12, 0]
        }, {
          startTime: [14, 0],
          endTime: [23, 59]
        }],
        disableWeekly:[1],
        disableSpecific: [1],
        fullBooking: [1680804000000],
        timezone: "America/Toronto",
        disableDate: [1680580800000],
        duration: 30,
        onSelectDatetime: (timestamp: number) => {
          console.log(timestamp)
          }
      };

      return (
        <DateSlotPicker
          {...props}
        />
      )
    }; 

```



## Documentation
| Property           | Description                                                                                                                                                                                                                                                                                                        | type           | Default                                                                                                 |
| -------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------- | -------------------------------------------------------------------------------------------------------------- |                   
| duration        | Each timeslot period (mins)                                                                                                                                                                                                                                                                                         | number                     | `30`
| currentDate        | currentDate date, set as  timestamp e.g.`1649134250`. Default user current datetime                                  | number | -                                                                                                                                                                                         
| startDate        | Calendar start date, set as  timestamp e.g.`1649134250`                                                                                                                                                                                                                                                                                            | number or string                     | `infinity`
| endDate        | Calendar end date, set as  timestamp e.g.`1649134250`                                                                                                                                                                                                                                                                                             | number or string                     | `infinity`
| dailyTimePair        | Timeslot range. `[hour, min]`                                                                                                                                                                                                                                                                                         | {startTime: number[], endTime: number[]}[]              | `[{startTime: [0, 0],endTime: [23, 59]}]`
| disableWeekly        | Disable weekly day e.g. Monday to Friday `["1-5"]` or `[1,2,3,4,5]`                                                                                                                                                                                                                                                                                         | string[] or number []                     | `[]`
| disableSpecific        | Disable date e.g. 1st to 5th `["1-5"]` or `[1,2,3,4,5]`                                                                                                                                                                                                                                                                                         | string[] or number []                     | `[]`
| fullbooking        | Disable timeslots, array of  timestamp                                                                                                                                                                                                                                                                                         | number []                     | `[]`
| disableDate        | Disable specific date, array of  timestamp                                                                                                                                                                                                                                                                             | number []                     | `[]`
| timeZone        | set timezone, by default user timezone                                                                                                                                                                                                                                                                                                   | string                    | -
| onClickTimeslot        | Specify a function that will be called when the user clicks the timeslot. e.g (timestamp) => {coneslot.log(timestamp)}                                                                                                                                                                                                                                                                                 | function                    | -

