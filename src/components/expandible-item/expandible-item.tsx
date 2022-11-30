import { Disclosure, Transition } from "@headlessui/react";
import { ReportSurface } from "../report/report-surface";

interface ExpandibleItemProps {
  titleFragment: React.ReactNode;
  children: React.ReactNode;
}

export const ExpandibleItem: React.FC<ExpandibleItemProps> = ({
  titleFragment,
  children,
}) => {
  return (
    <Disclosure>
      <Disclosure.Button className="expandible-item-button">
        <ReportSurface variant="light" size="l">
          {titleFragment}
        </ReportSurface>
      </Disclosure.Button>
      <Transition
        enter="enter-anim"
        enterFrom="enter-anim-from"
        enterTo="enter-anim-to"
        leave="leave-anim transition"
        leaveFrom="leave-anim-from"
        leaveTo="leave-anim-to"
      >
        <Disclosure.Panel className={'expandible-item-panel'}>{children}</Disclosure.Panel>
      </Transition>
    </Disclosure>
  );
};
