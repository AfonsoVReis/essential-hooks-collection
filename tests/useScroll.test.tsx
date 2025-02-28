import { render, screen } from "@testing-library/react";
import { act } from "@testing-library/react";
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

describe("useScroll", () => {
  beforeEach(() => {
    global.scrollX = 0;
    global.scrollY = 0;
  });

  it("should return initial scroll position", () => {
    render(<TestComponent />);

    expect(screen.getByText("Scroll X: 0")).toBeInTheDocument();
    expect(screen.getByText("Scroll Y: 0")).toBeInTheDocument();
  });

  it("should update scroll position on scroll event", () => {
    render(<TestComponent />);

    act(() => {
      global.scrollX = 50;
      global.scrollY = 100;

      window.dispatchEvent(new Event("scroll"));
    });

    expect(screen.getByText("Scroll X: 50")).toBeInTheDocument();
    expect(screen.getByText("Scroll Y: 100")).toBeInTheDocument();
  });
});
