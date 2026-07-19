export default function CustomCursor({ dotRef, ringRef, isTouchDevice }) {
  if (isTouchDevice) return null;
  return (
    <>
      <div id="cursor-dot" ref={dotRef} />
      <div id="cursor-ring" ref={ringRef} />
    </>
  );
}
