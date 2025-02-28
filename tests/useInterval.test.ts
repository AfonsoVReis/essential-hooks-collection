import { renderHook } from "@testing-library/react";
import { useInterval } from "../src/hooks/useInterval";

jest.useFakeTimers();

describe("useInterval", () => {
  it("calls the callback at the specified interval", () => {
    const callback = jest.fn();
    renderHook(() => useInterval(callback, 1000));

    expect(callback).not.toHaveBeenCalled();

    jest.advanceTimersByTime(1000);
    expect(callback).toHaveBeenCalledTimes(1);

    jest.advanceTimersByTime(2000);
    expect(callback).toHaveBeenCalledTimes(3);
  });

  it("does not call the callback when delay is null", () => {
    const callback = jest.fn();
    renderHook(() => useInterval(callback, null));

    jest.advanceTimersByTime(5000);
    expect(callback).not.toHaveBeenCalled();
  });

  it("updates the callback when it changes", () => {
    const callback1 = jest.fn();
    const callback2 = jest.fn();

    const { rerender } = renderHook(
      ({ callback, delay }) => useInterval(callback, delay),
      {
        initialProps: { callback: callback1, delay: 1000 },
      }
    );

    jest.advanceTimersByTime(1000);
    expect(callback1).toHaveBeenCalledTimes(1);
    expect(callback2).not.toHaveBeenCalled();

    rerender({ callback: callback2, delay: 1000 });

    jest.advanceTimersByTime(1000);
    expect(callback1).toHaveBeenCalledTimes(1);
    expect(callback2).toHaveBeenCalledTimes(1);
  });
});
