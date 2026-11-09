import { render, screen } from "@testing-library/react";
import TeamSection from "@/components/team-section";

describe("TeamSection", () => {
  it("puts head chef Kanav at the centre, with photo, role and bio", () => {
    render(<TeamSection />);
    expect(screen.getByRole("heading", { level: 2, name: "Behind the Pass" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { level: 3, name: "Kanav Khajuria" })).toBeInTheDocument();
    expect(screen.getByText("Head Chef")).toBeInTheDocument();
    expect(screen.getByRole("img", { name: /Kanav Khajuria/ })).toBeInTheDocument();
    expect(screen.getByText(/Town Tonic is Kanav’s kitchen/)).toBeInTheDocument();
    expect(screen.queryByRole("link")).not.toBeInTheDocument();
  });
});
