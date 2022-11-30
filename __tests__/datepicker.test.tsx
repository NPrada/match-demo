import { fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { DatePicker } from "../src/components/date-picker/date-picker";
import { formatDate } from "../src/utils";

describe("test listbox component", () => {
  it("calls the onSelect callback", async () => {
    const callback = jest.fn();

    const { getByText } = render(
      <DatePicker
        onSelect={callback}
        fromDate={new Date("2022-01-01")}
        defaultMonth={new Date("2022-01-01")}
        defaultValue={"from button"}
      />
    );

    fireEvent.click(getByText("from button"));
    fireEvent.click(getByText("1"));

    expect(callback).toHaveBeenCalled();
    const callbackArg = callback.mock.calls[0][0];
    expect(formatDate(callbackArg)).toBe("2022-01-01");
  });

  it("date outside of filters are not callable", async () => {
    const callback = jest.fn();

    const { getByText } = render(
      <DatePicker
        onSelect={callback}
        fromDate={new Date("2022-01-11")}
        toDate={new Date("2022-01-20")}
        defaultValue={"from button"}
      />
    );

    fireEvent.click(getByText("from button"));
    fireEvent.click(getByText("1"));

    expect(callback).not.toHaveBeenCalled();
    fireEvent.click(getByText("22"));
    expect(callback).not.toHaveBeenCalled();
  });
});
