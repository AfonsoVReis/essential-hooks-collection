import { render, screen } from "@testing-library/react";
import { act } from "@testing-library/react";
import { useRef } from "react";
import { useScroll } from "../src/hooks/useScroll";

const TestComponent = () => {
  const { x, y } = useScroll();

  return (
    <div>
      <p>Scroll X: {x}</p>
      <p>Scroll Y: {y}</p>
    </div>
  );
};

const TestComponentWithRef = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { x, y } = useScroll(containerRef);

  return (
    <div
      ref={containerRef}
      style={{ overflow: "scroll", height: "200px", width: "200px" }}
    >
      <p>Scroll X: {x}</p>
      <p>Scroll Y: {y}</p>
      <div style={{ height: "1000px", width: "1000px" }}>Scroll me!</div>
    </div>
  );
};

describe("useScroll", () => {
  beforeEach(() => {
    global.scrollX = 0;
    global.scrollY = 0;
  });

  it("should return initial scroll position for window", () => {
    render(<TestComponent />);

    expect(screen.getByText("Scroll X: 0")).toBeInTheDocument();
    expect(screen.getByText("Scroll Y: 0")).toBeInTheDocument();
  });

  it("should update scroll position on window scroll event", () => {
    render(<TestComponent />);

    act(() => {
      global.scrollX = 50;
      global.scrollY = 100;

      window.dispatchEvent(new Event("scroll"));
    });

    expect(screen.getByText("Scroll X: 50")).toBeInTheDocument();
    expect(screen.getByText("Scroll Y: 100")).toBeInTheDocument();
  });

  it("should return initial scroll position for custom element", () => {
    render(<TestComponentWithRef />);

    expect(screen.getByText("Scroll X: 0")).toBeInTheDocument();
    expect(screen.getByText("Scroll Y: 0")).toBeInTheDocument();
  });

  it("should update scroll position on custom element scroll event", () => {
    render(<TestComponentWithRef />);

    const container = screen.getByText("Scroll X: 0").parentElement;

    if (!container) {
      throw new Error("Container not found");
    }

    act(() => {
      container.scrollLeft = 75;
      container.scrollTop = 150;

      container.dispatchEvent(new Event("scroll"));
    });

    expect(screen.getByText("Scroll X: 75")).toBeInTheDocument();
    expect(screen.getByText("Scroll Y: 150")).toBeInTheDocument();
  });
});
