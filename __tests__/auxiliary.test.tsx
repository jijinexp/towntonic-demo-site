import { render, screen, fireEvent } from "@testing-library/react";
import AboutPage from "@/app/about/page";
import ContactPage from "@/app/contact/page";
import GalleryPage from "@/app/gallery/page";

describe("Auxiliary Pages Content", () => {
  it("renders About page contents", () => {
    render(<AboutPage />);
    expect(screen.getByRole("heading", { name: "Our Story" })).toBeInTheDocument();
    expect(screen.getByText(/Canterbury suppliers/i)).toBeInTheDocument();
  });

  it("renders Contact page details and international phone link", () => {
    render(<ContactPage />);
    expect(screen.getByRole("heading", { name: "Contact Us" })).toBeInTheDocument();
    expect(screen.getByText("Lincoln Road, Addington")).toBeInTheDocument();
    
    const phoneLink = screen.getByRole("link", { name: "03 338 1150" });
    expect(phoneLink).toHaveAttribute("href", "tel:+6433381150");
  });

  it("renders Gallery showcase elements and handles lightbox accessibility", () => {
    render(<GalleryPage />);
    expect(screen.getByRole("heading", { name: "Gallery" })).toBeInTheDocument();
    
    const galleryButtons = screen.getAllByRole("button", { name: /View larger image of/ });
    expect(galleryButtons.length).toBeGreaterThan(0);
    
    fireEvent.click(galleryButtons[0]);
    
    const lightbox = screen.getByRole("dialog");
    expect(lightbox).toBeInTheDocument();
    expect(lightbox).toHaveAttribute("aria-modal", "true");
    
    const lightboxTitle = screen.getByRole("heading", { level: 3 });
    expect(lightboxTitle).toHaveAttribute("id", "gallery-lightbox-title");
    expect(lightbox).toHaveAttribute("aria-labelledby", "gallery-lightbox-title");
    
    fireEvent.keyDown(window, { key: "Escape" });
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    
    fireEvent.click(galleryButtons[0]);
    expect(screen.getByRole("dialog")).toBeInTheDocument();
    
    const closeBtn = screen.getByRole("button", { name: "Close Lightbox" });
    fireEvent.click(closeBtn);
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    
    fireEvent.click(galleryButtons[0]);
    expect(screen.getByRole("dialog")).toBeInTheDocument();
    
    const innerTitle = screen.getByRole("heading", { level: 3 });
    fireEvent.click(innerTitle);
    expect(screen.getByRole("dialog")).toBeInTheDocument();
    
    fireEvent.click(screen.getByRole("dialog"));
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });
});
