type LogoProps = {
  className?: string;
  ariaLabel?: string;
  /** Invert PNG colors so black becomes light (for dark backgrounds). Default true. */
  invert?: boolean;
};

export default function Logo({
  className = "h-10 w-auto",
  ariaLabel = "Town Tonic",
  invert = true,
}: LogoProps) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src="/images/logo.png"
      alt={ariaLabel}
      className={`${className} object-contain`}
      style={invert ? { filter: "invert(1)" } : undefined}
    />
  );
}
