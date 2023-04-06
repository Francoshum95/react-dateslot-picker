import { useContext } from "react";
import useTimeSlotPicker, { onChangeSelectedDateslotType, selectedTimeslotType } from "../../hook/useTimeSlotPicker";
import { DateTime } from 'luxon';
import { currentDatetimeType, DateSlotPickCtx } from "../../context/DateSlotPickContext";

import "../../styles/timeslot.css";

type propsType = {
  endDate?: number
  fullBooking?: number[]
  duration?: number,
  dailyTimePair?: {
    startTime: number[];
    endTime: number[];
  }[]
};

type timeslotType = {
  fullBooking: number[]
  currentDatetime: currentDatetimeType
  selectedTimeslot: selectedTimeslotType
  timeslot: DateTime
  onChangeSelectedDateslot: onChangeSelectedDateslotType
}

const getTimeStr = (timeslot: timeslotType['timeslot']) => timeslot.toFormat('HH:mm')

const DisableTime = ({
  timeslot
}: {
  timeslot: timeslotType['timeslot']
}) => (
  <button
    className="dateslotpicker-bg-[#2b2b2b96] 
    dateslotpicker-flex dateslotpicker-justify-center 
    dateslotpicker-no-underline  dateslotpicker-outline-none 
    dateslotpicker-border-none dateslotpicker-items-center 
    dateslotpicker-text-blue-500 dateslotpicker-rounded-md 
    dateslotpicker-py-[.6rem] dateslotpicker-font-bold dateslotpicker-box-border"
    disabled={true}
  >{getTimeStr(timeslot)}</button>
);

const AvailableTime = ({
  timeslot,
  selectedTimeslot,
  onChangeSelectedDateslot
}: {
  timeslot: timeslotType['timeslot']
  selectedTimeslot: selectedTimeslotType
  onChangeSelectedDateslot: onChangeSelectedDateslotType
}) => {

  const isSelected = selectedTimeslot===timeslot;

  return (
    <button 
      className={` dateslotpicker-flex 
      dateslotpicker-justify-center dateslotpicker-items-center 
      dateslotpicker-text-blue-500 dateslotpicker-rounded-md dateslotpicker-py-[.6rem] 
      dateslotpicker-font-bold dateslotpicker-cursor-pointer
      dateslotpicker-no-underline  dateslotpicker-outline-none 
      dateslotpicker-border-none dateslotpicker-box-border
      ${isSelected ? "dateslotpicker-bg-[#1e1c22]" : "dateslotpicker-bg-[#333]"}
      `}
      onClick={() => onChangeSelectedDateslot(timeslot)}
      >
        {getTimeStr(timeslot)}
    </button>
  )
}

const Timeslot = (props:timeslotType) => {
  const {fullBooking, currentDatetime, selectedTimeslot, timeslot, onChangeSelectedDateslot} = props; 

  if (
    fullBooking.includes(timeslot.toMillis()) || 
    currentDatetime.toMillis() > timeslot.toMillis()
    ){
      return (
        <DisableTime
          timeslot={timeslot}
        />
      )
  };

  return <AvailableTime 
    timeslot={timeslot} 
    selectedTimeslot={selectedTimeslot} 
    onChangeSelectedDateslot={onChangeSelectedDateslot}/>
};


const TimeSlotpicker = (props:propsType) => {
  const {currentDatetime} = useContext(DateSlotPickCtx); 

  const {
    selectedTimeslot,
    timeslots,
    onChangeSelectedDateslot} = useTimeSlotPicker({
    endDate: props.endDate,
    dailyTimePair: props.dailyTimePair,
    duration: props.duration,
    fullBooking: props.fullBooking
  });

  const fullBooking = props.fullBooking || [];

  return (
    <div className="dateslotpicker-h-[16rem] md:dateslotpicker-h-[18rem] 
    dateslotpicker-w-[18rem] md:dateslotpicker-w-[16rem] 
    dateslotpicker-bg-[#1e1c22] md:dateslotpicker-py-[2.5rem] md:dateslotpicker-box-border
    dateslotpicker-rounded-bl-2xl dateslotpicker-rounded-br-2xl 
    md:dateslotpicker-rounded-tr-2xl md:dateslotpicker-rounded-br-2xl 
    md:dateslotpicker-rounded-bl-none dateslotpicker-select-none 
    dateslotpicker-text-white dateslotpicker-text-sm
    dateslotpicker-flex dateslotpicker-justify-center
    ">
      <div className="dateslotpicker-w-[16rem] dateslotpicker-h-[13rem] 
      md:dateslotpicker-h-[13rem] md:dateslotpicker-w-[14rem] 
      md:dateslotpicker-pr-[1rem] md:dateslotpicker-pb-0 dateslotpicker-mt-2
      md:dateslotpicker-mt-0 dateslotpicker-box-border 
      md:dateslotpicker-px-0 dateslotpicker-overflow-auto 
      dateslotpicker-grid dateslotpicker-grid-cols-2 dateslotpicker-gap-2 
      dateslotpicker-pb-4 dateslotpicker-px-4 scrollbar-hide"
      data-testid="timeslots">
        {
          timeslots.map(timeslot => {
            const timeslotProsp = {
              fullBooking,
              currentDatetime, selectedTimeslot, timeslot, onChangeSelectedDateslot}
            return (
              <Timeslot
                {...timeslotProsp}
              />
            )
          })
        }
      </div>
    </div>
  )
};

export default TimeSlotpicker