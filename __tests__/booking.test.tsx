import { render, screen, fireEvent } from "@testing-library/react";
import ReservationsPage from "@/app/reservations/page";

// The reservations page: one form (guests, date, time, contact details) and a confirmation.
describe("Reservations page", () => {
  it("leads with the Reserve a Table heading in the site's title style", () => {
    render(<ReservationsPage />);
    const h1 = screen.getByRole("heading", { level: 1, name: "Reserve a Table" });
    expect(h1).toHaveClass("title-font");
  });

  it("lets guests be typed or stepped between 1 and 10", () => {
    render(<ReservationsPage />);
    const field = screen.getByLabelText("Guests");
    const less = screen.getByRole("button", { name: "Decrease guests" });
    const more = screen.getByRole("button", { name: "Increase guests" });
    expect(field).toHaveValue("2");
    fireEvent.click(less);
    expect(field).toHaveValue("1");
    expect(less).toBeDisabled();
    fireEvent.change(field, { target: { value: "7" } });
    fireEvent.click(more);
    expect(field).toHaveValue("8");
    for (let i = 0; i < 5; i++) fireEvent.click(more);
    expect(field).toHaveValue("10");
    expect(more).toBeDisabled();
  });

  it("takes a typed date and time and tidies them when you leave the field", () => {
    render(<ReservationsPage />);
    const date = screen.getByLabelText("Date");
    const time = screen.getByLabelText("Time");
    fireEvent.change(date, { target: { value: "14-11-30" } });
    fireEvent.blur(date);
    expect(date).toHaveValue("14/11/2030");
    fireEvent.change(time, { target: { value: "730pm" } });
    fireEvent.blur(time);
    expect(time).toHaveValue("7:30 pm");
  });

  it("explains what's wrong with a guest count, date or time it can't read", () => {
    render(<ReservationsPage />);
    const submit = () => fireEvent.click(screen.getByRole("button", { name: "Confirm Booking" }));
    fireEvent.change(screen.getByLabelText("Guests"), { target: { value: "14" } });
    submit();
    expect(screen.getByRole("alert")).toHaveTextContent("between 1 and 10 guests");
    fireEvent.change(screen.getByLabelText("Guests"), { target: { value: "4" } });
    fireEvent.change(screen.getByLabelText("Date"), { target: { value: "31/02/2030" } });
    submit();
    expect(screen.getByRole("alert")).toHaveTextContent("DD/MM/YYYY");
    fireEvent.change(screen.getByLabelText("Date"), { target: { value: "1/1/2020" } });
    submit();
    expect(screen.getByRole("alert")).toHaveTextContent("today or a date in the future");
    fireEvent.change(screen.getByLabelText("Date"), { target: { value: "1/1/2030" } });
    fireEvent.change(screen.getByLabelText("Time"), { target: { value: "half six" } });
    submit();
    expect(screen.getByRole("alert")).toHaveTextContent("6:30 pm or 18:30");
  });

  it("asks for the contact details before booking", () => {
    render(<ReservationsPage />);
    fireEvent.submit(screen.getByRole("button", { name: "Confirm Booking" }).closest("form")!);
    expect(screen.getByRole("alert")).toHaveTextContent("Please fill out all contact fields.");
  });

  it("confirms the booking with a reference, then resets for another", () => {
    render(<ReservationsPage />);
    fireEvent.change(screen.getByLabelText("Guests"), { target: { value: "4" } });
    fireEvent.change(screen.getByLabelText("Date"), { target: { value: "14/11/2030" } });
    fireEvent.change(screen.getByLabelText("Time"), { target: { value: "7pm" } });
    fireEvent.change(screen.getByLabelText("Full Name"), { target: { value: "Alex Test" } });
    fireEvent.change(screen.getByLabelText("Phone Number"), { target: { value: "021 555 0101" } });
    fireEvent.change(screen.getByLabelText("Email Address"), { target: { value: "alex@example.com" } });
    fireEvent.click(screen.getByRole("button", { name: "Confirm Booking" }));

    expect(screen.getByRole("heading", { level: 2, name: "Table Reserved" })).toBeInTheDocument();
    expect(screen.getByText(/Booking Ref:/).textContent).toMatch(/TT-\d{6}/);
    expect(screen.getByText("alex@example.com")).toBeInTheDocument();
    expect(screen.getByText("4 people")).toBeInTheDocument();
    expect(screen.getByText(/Thursday, 14 November 2030 at 7:00 pm/)).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: "Book Another Table" }));
    expect(screen.getByLabelText("Full Name")).toHaveValue("");
    expect(screen.getByRole("button", { name: "Confirm Booking" })).toBeInTheDocument();
  });
});
