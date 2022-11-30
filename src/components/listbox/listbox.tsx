import { Fragment, useState } from "react";
import { Listbox as ListboxUI, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";

type NonEmptyArray<T> = [T, ...T[]];

interface OptionData {
  id: string;
  name: string;
}

interface ListboxProps {
  options: NonEmptyArray<OptionData>;
  onSelect: (val: OptionData) => void;
}

export const Listbox: React.FC<ListboxProps> = ({ options, onSelect }) => {
  const [selectedOption, setSelectedOption] = useState(options[0]);

  return (
    <div className="listbox">
      <ListboxUI
        value={selectedOption}
        onChange={(val) => {
          onSelect(val);
          setSelectedOption(val);
        }}
      >
        <div className="listbox-container">
          <ListboxUI.Button className="listbox-button hoverable" data-test-id>
            <span className="truncate-text text-styles">
              {selectedOption.name}
            </span>
            <span className="listbox-button-icon">
              <ChevronDownIcon aria-hidden="true" />
            </span>
          </ListboxUI.Button>
          <Transition
            as={Fragment}
            leave="leave-transition"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <ListboxUI.Options className="listbox-options-container">
              {options.map((option) => (
                <ListboxUI.Option
                  key={option.name}
                  className={({ active }) =>
                    `listbox-option ${
                      active ? "listbox-option--active" : "some"
                    }`
                  }
                  value={option}
                >
                  {({ selected }) => (
                    <>
                      <span
                        className={`truncate-text text-styles ${
                          selected ? "listbox-option--active" : ""
                        }`}
                      >
                        {option.name}
                      </span>
                    </>
                  )}
                </ListboxUI.Option>
              ))}
            </ListboxUI.Options>
          </Transition>
        </div>
      </ListboxUI>
    </div>
  );
};
