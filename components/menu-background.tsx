export default function MenuBackground() {
  return (
    <div
      className="menu-bg-fade-in pointer-events-none absolute inset-0 -z-10 overflow-hidden"
      aria-hidden="true"
      style={{
        backgroundImage: "url(/images/shades/shade1.jpeg)",
        // Size the texture to viewport width so the image dimensions stay
        // constant while the accordion expands/collapses — extra height just
        // reveals more repeats instead of rescaling the whole image.
        backgroundSize: "100vw auto",
        backgroundPosition: "top center",
        backgroundRepeat: "repeat-y",
      }}
    />
  );
}
