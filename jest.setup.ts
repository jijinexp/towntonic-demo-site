import '@testing-library/jest-dom';

// jsdom does not implement IntersectionObserver. Components like Reveal
// (components/reveal.tsx) rely on it, so provide a minimal global stub for
// any test that renders them without registering its own mock.
if (typeof global.IntersectionObserver === 'undefined') {
  class MockIntersectionObserver implements IntersectionObserver {
    readonly root: Element | Document | null = null;
    readonly rootMargin: string = '';
    readonly thresholds: ReadonlyArray<number> = [];
    observe = jest.fn();
    unobserve = jest.fn();
    disconnect = jest.fn();
    takeRecords = () => [];
    constructor(..._args: ConstructorParameters<typeof IntersectionObserver>) {}
  }
  // @ts-expect-error test polyfill
  global.IntersectionObserver = MockIntersectionObserver;
}
