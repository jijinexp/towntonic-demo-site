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

  it("completes a full end-to-end booking flow and resets the form on restart", async () => {
    render(<ReservationsPage />);

    // Step 1: Select time slot and proceed
    const timeSlot = screen.getByText("12:30 pm");
    fireEvent.click(timeSlot);
    const nextBtn1 = screen.getByRole("button", { name: "Next Step" });
    fireEvent.click(nextBtn1);

    // Step 2: Select seating zone and proceed
    await waitFor(() => {
      expect(screen.getByText("Step 2 of 3: Seating")).toBeInTheDocument();
    });
    const gardenBarOption = screen.getByText("Heated Garden Bar");
    fireEvent.click(gardenBarOption);
    const nextBtn2 = screen.getByRole("button", { name: "Next Step" });
    fireEvent.click(nextBtn2);

    // Step 3: Fill contact details and submit
    await waitFor(() => {
      expect(screen.getByText("Step 3 of 3: Contact")).toBeInTheDocument();
    });
    const nameInput = screen.getByLabelText("Full Name");
    const phoneInput = screen.getByLabelText("Phone Number");
    const emailInput = screen.getByLabelText("Email Address");

    fireEvent.change(nameInput, { target: { value: "Jane Doe" } });
    fireEvent.change(phoneInput, { target: { value: "021 987 654" } });
    fireEvent.change(emailInput, { target: { value: "jane@example.com" } });

    const submitBtn = screen.getByRole("button", { name: "Confirm Booking" });
    fireEvent.click(submitBtn);

    // Step 4: Verify Success Screen and Booking Reference
    await waitFor(() => {
      expect(screen.getByText("Table Reserved")).toBeInTheDocument();
    });
    const bookingRefText = screen.getByText(/Booking Ref:/i);
    expect(bookingRefText).toHaveTextContent(/TT-[0-9]{6}/);

    // Click "Book Another Table" to return to Step 1
    const bookAnotherBtn = screen.getByRole("button", { name: "Book Another Table" });
    fireEvent.click(bookAnotherBtn);

    await waitFor(() => {
      expect(screen.getByText("Step 1 of 3: Details")).toBeInTheDocument();
    });
  });
});
