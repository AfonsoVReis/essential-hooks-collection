import { renderHook, act } from "@testing-library/react";
import { useMediaQuery } from "../src/hooks/useMediaQuery";

describe("useMediaQuery Hook", () => {
  beforeEach(() => {
    Object.defineProperty(window, "matchMedia", {
      writable: true,
      value: jest.fn().mockImplementation((query) => ({
        matches: query === "(max-width: 768px)" ? false : true,
        media: query,
        onchange: null,
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
      })),
    });
  });

  it("should return false when the media query does not match", () => {
    const { result } = renderHook(() => useMediaQuery("(max-width: 768px)"));
    expect(result.current).toBe(false);
  });

  it("should return true when the media query matches", () => {
    window.matchMedia = jest.fn().mockImplementation(() => ({
      matches: true,
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
    }));

    const { result } = renderHook(() => useMediaQuery("(max-width: 768px)"));
    expect(result.current).toBe(true);
  });

  it("should remove event listener on unmount", () => {
    const removeEventListenerMock = jest.fn();
    const addEventListenerMock = jest.fn();

    window.matchMedia = jest.fn().mockImplementation((query) => ({
      matches: false,
      media: query,
      addEventListener: addEventListenerMock,
      removeEventListener: removeEventListenerMock,
    }));

    const { unmount } = renderHook(() => useMediaQuery("(max-width: 768px)"));

    unmount();

    expect(removeEventListenerMock).toHaveBeenCalled();
  });
});
