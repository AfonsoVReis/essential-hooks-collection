import { renderHook, act } from "@testing-library/react";
import { useIntersectionObserver } from "../src/hooks/useIntersectionObserver";

const observeMock = jest.fn();
const unobserveMock = jest.fn();
const disconnectMock = jest.fn();
let intersectionCallback: IntersectionObserverCallback;

beforeEach(() => {
  global.IntersectionObserver = class {
    root = null;
    rootMargin = "0px";
    thresholds = [];
    observe = observeMock;
    unobserve = unobserveMock;
    disconnect = disconnectMock;
    takeRecords = jest.fn();

    constructor(callback: IntersectionObserverCallback) {
      intersectionCallback = callback;
    }
  };
});

afterEach(() => {
  jest.clearAllMocks();
});

describe("useIntersectionObserver Hook", () => {
  test("should observe the element when the ref is set", () => {
    const ref = {
      current: document.createElement("div"),
    } as any;

    renderHook(() => useIntersectionObserver(ref));

    expect(observeMock).toHaveBeenCalledTimes(1);
    expect(observeMock).toHaveBeenCalledWith(ref.current);
  });

  test("should update visibility state when intersection changes", () => {
    const ref = { current: document.createElement("div") } as any;
    const { result } = renderHook(() => useIntersectionObserver(ref));

    act(() => {
      intersectionCallback(
        [
          {
            isIntersecting: true,
            boundingClientRect: {} as DOMRectReadOnly,
            intersectionRatio: 1,
            intersectionRect: {} as DOMRectReadOnly,
            rootBounds: null,
            target: ref.current,
            time: 0,
          },
        ],
        {} as IntersectionObserver
      );
    });

    expect(result.current).toBe(true);

    act(() => {
      intersectionCallback(
        [
          {
            isIntersecting: false,
            boundingClientRect: {} as DOMRectReadOnly,
            intersectionRatio: 0,
            intersectionRect: {} as DOMRectReadOnly,
            rootBounds: null,
            target: ref.current,
            time: 0,
          },
        ],
        {} as IntersectionObserver
      );
    });

    expect(result.current).toBe(false);
  });

  test("should unobserve the element when unmounted", () => {
    const ref = { current: document.createElement("div") } as any;
    const { unmount } = renderHook(() => useIntersectionObserver(ref));

    unmount();

    expect(unobserveMock).toHaveBeenCalledWith(ref.current);
    expect(disconnectMock).toHaveBeenCalled();
  });
});
