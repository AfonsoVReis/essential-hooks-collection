import { renderHook, act } from "@testing-library/react";
import { useLocalStorage } from "../src/hooks/useLocalStorage";

describe("useLocalStorage Hook", () => {
  beforeEach(() => {
    Object.defineProperty(window, "localStorage", {
      writable: true,
      value: {
        getItem: jest.fn(),
        setItem: jest.fn(),
        removeItem: jest.fn(),
      },
    });
  });

  it("should return the initial value when no localStorage value exists", () => {
    (window.localStorage.getItem as jest.Mock).mockReturnValue(null);

    const { result } = renderHook(() => useLocalStorage("testKey", "default"));

    expect(result.current[0]).toBe("default");
  });

  it("should return the stored value from localStorage", () => {
    (window.localStorage.getItem as jest.Mock).mockReturnValue(
      JSON.stringify("storedValue")
    );

    const { result } = renderHook(() => useLocalStorage("testKey", "default"));

    expect(result.current[0]).toBe("storedValue");
  });

  it("should update the stored value", () => {
    (window.localStorage.getItem as jest.Mock).mockReturnValue(null);

    const { result } = renderHook(() => useLocalStorage("testKey", "default"));

    act(() => {
      result.current[1]("newValue");
    });

    expect(result.current[0]).toBe("newValue");
    expect(window.localStorage.setItem).toHaveBeenCalledWith(
      "testKey",
      JSON.stringify("newValue")
    );
  });

  it("should remove the stored value and reset to initial value", () => {
    (window.localStorage.getItem as jest.Mock).mockReturnValue(
      JSON.stringify("storedValue")
    );

    const { result } = renderHook(() => useLocalStorage("testKey", "default"));

    act(() => {
      result.current[2](); // Call removeItem
    });

    expect(result.current[0]).toBe("default");
    expect(window.localStorage.removeItem).toHaveBeenCalledWith("testKey");
  });

  it("should handle JSON parsing errors gracefully", () => {
    (window.localStorage.getItem as jest.Mock).mockReturnValue("invalid JSON");

    const consoleErrorSpy = jest
      .spyOn(console, "error")
      .mockImplementation(() => {});

    const { result } = renderHook(() => useLocalStorage("testKey", "default"));

    expect(result.current[0]).toBe("default");
    expect(consoleErrorSpy).toHaveBeenCalledWith(
      "Error reading localStorage key:",
      "testKey",
      expect.any(SyntaxError)
    );

    consoleErrorSpy.mockRestore();
  });
});
