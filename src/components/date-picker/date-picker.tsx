import React from "react";
import { DayPicker } from "react-day-picker";
import { Menu, Transition } from "@headlessui/react";
import { CalendarIcon } from "@heroicons/react/20/solid";
import { formatDate } from "../../utils";

interface DatePickerProps {
  defaultValue: string;
  onSelect: (val: Date) => void;
  fromDate?: Date;
  toDate?: Date;
  defaultMonth?: Date;
}

export const DatePicker: React.FC<DatePickerProps> = ({
  defaultValue,
  onSelect,
  fromDate,
  toDate,
  defaultMonth,
}) => {
  const [selected, setSelected] = React.useState<Date>();

  return (
    <div className="listbox">
      <Menu>
        <div className="listbox-container">
          <Menu.Button className="listbox-button hoverable datepicker-input-wrapper">
            <span className="datepicker-input">
              {selected ? formatDate(selected) : defaultValue}
            </span>
            <CalendarIcon />
          </Menu.Button>
          <Transition
            as={React.Fragment}
            leave="leave-transition"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Menu.Items className="datepicker-popup">
              <DayPicker
                fromDate={fromDate}
                toDate={toDate}
                defaultMonth={defaultMonth}
                className="datepicker"
                mode="single"
                selected={selected}
                onSelect={(val) => {
                  if (val != null) {
                    onSelect(val);
                  }
                  setSelected(val);
                }}
              />
            </Menu.Items>
          </Transition>
        </div>
      </Menu>
    </div>
  );
};
