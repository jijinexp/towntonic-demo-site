import { render, screen } from "@testing-library/react";
import NavBar from "@/components/nav-bar";
import Footer from "@/components/footer";

describe("Global layout components", () => {
  it("renders navigation links correctly", () => {
    render(<NavBar />);
    expect(screen.getByText("Menu")).toBeInTheDocument();
    expect(screen.getByText("Reservations")).toBeInTheDocument();
  });

  it("renders footer containing NAP-H phone and address links", () => {
    render(<Footer />);
    expect(screen.getByText("03 338 1150")).toBeInTheDocument();
    expect(screen.getByText(/335 Lincoln Road/)).toBeInTheDocument();
  });
});
