import { renderHook, act } from "@testing-library/react";
import { usePrevious } from "../src/hooks/usePrevious";

describe("usePrevious Hook", () => {
  it("should return undefined on initial render", () => {
    const { result } = renderHook(() => usePrevious(10));

    expect(result.current).toBeUndefined();
  });

  it("should return the previous value after an update", () => {
    const { result, rerender } = renderHook(({ value }) => usePrevious(value), {
      initialProps: { value: 10 },
    });

    rerender({ value: 20 });
    expect(result.current).toBe(10);

    rerender({ value: 30 });
    expect(result.current).toBe(20);
  });

  it("should track previous string values correctly", () => {
    const { result, rerender } = renderHook(({ value }) => usePrevious(value), {
      initialProps: { value: "hello" },
    });

    rerender({ value: "world" });
    expect(result.current).toBe("hello");

    rerender({ value: "React" });
    expect(result.current).toBe("world");
  });

  it("should track previous object values correctly", () => {
    const { result, rerender } = renderHook(({ value }) => usePrevious(value), {
      initialProps: { value: { count: 1 } },
    });

    rerender({ value: { count: 2 } });
    expect(result.current).toEqual({ count: 1 });

    rerender({ value: { count: 3 } });
    expect(result.current).toEqual({ count: 2 });
  });

  it("should not update previous value if rerendered with same value", () => {
    const { result, rerender } = renderHook(({ value }) => usePrevious(value), {
      initialProps: { value: 100 },
    });

    rerender({ value: 100 });
    expect(result.current).toBe(100);

    rerender({ value: 100 });
    expect(result.current).toBe(100);
  });
});
