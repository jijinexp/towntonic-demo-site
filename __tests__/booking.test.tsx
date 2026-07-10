import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import ReservationsPage from "@/app/reservations/page";

describe("Custom Booking Wizard", () => {
  it("starts at Step 1 (Guests, Date, Time) and validates next action", async () => {
    render(<ReservationsPage />);
    expect(screen.getByText("Step 1 of 3: Details")).toBeInTheDocument();

    // Click "Next" without setting time slot
    const nextBtn = screen.getByRole("button", { name: "Next Step" });
    fireEvent.click(nextBtn);

    // Should show validation error
    expect(screen.getByText("Please select a dining time slot.")).toBeInTheDocument();
  });

  it("allows user to proceed to Step 2 upon selecting time slot", async () => {
    render(<ReservationsPage />);
    
    // Select 12:30 pm slot
    const timeSlot = screen.getByText("12:30 pm");
    fireEvent.click(timeSlot);

    // Click Next
    const nextBtn = screen.getByRole("button", { name: "Next Step" });
    fireEvent.click(nextBtn);

    // Now should show Step 2 Dining Area selections
    await waitFor(() => {
      expect(screen.getByText("Step 2 of 3: Seating")).toBeInTheDocument();
    });
  });
});
