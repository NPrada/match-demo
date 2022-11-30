import { fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Listbox } from "../src/components/listbox/listbox";

describe("test listbox component", () => {
  it("calls the onSelect callback", async () => {
    const callback = jest.fn();

    const { getByText } = render(
      <Listbox
        onSelect={callback}
        options={[
          { id: "1", name: "hello" },
          { id: "2", name: "hello2" },
        ]}
      />
    );

    fireEvent.click(getByText("hello"));
    fireEvent.click(getByText("hello2"));

    expect(callback).toHaveBeenCalled();
  });
});
