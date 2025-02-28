import { renderHook, act } from "@testing-library/react";
import { useWindowSize } from "../src/hooks/useWindowSize";

describe("useWindowSize Hook", () => {
  beforeEach(() => {
    global.innerWidth = 1024;
    global.innerHeight = 768;
  });

  it("should return the initial window size", () => {
    const { result } = renderHook(() => useWindowSize());

    expect(result.current.width).toBe(1024);
    expect(result.current.height).toBe(768);
  });

  it("should update window size on resize", () => {
    const { result } = renderHook(() => useWindowSize());

    act(() => {
      global.innerWidth = 800;
      global.innerHeight = 600;
      window.dispatchEvent(new Event("resize"));
    });

    expect(result.current.width).toBe(800);
    expect(result.current.height).toBe(600);
  });

  it("should clean up event listener on unmount", () => {
    const removeEventListenerSpy = jest.spyOn(window, "removeEventListener");

    const { unmount } = renderHook(() => useWindowSize());
    unmount();

    expect(removeEventListenerSpy).toHaveBeenCalledWith(
      "resize",
      expect.any(Function)
    );

    removeEventListenerSpy.mockRestore();
  });
});
