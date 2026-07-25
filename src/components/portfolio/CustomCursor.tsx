import type { CustomCursorReturn } from '../../types/hooks';

interface CustomCursorProps {
  dotRef: CustomCursorReturn['dotRef'];
  ringRef: CustomCursorReturn['ringRef'];
  isTouchDevice: boolean;
}

export default function CustomCursor({ dotRef, ringRef, isTouchDevice }: CustomCursorProps) {
  if (isTouchDevice) return null;
  return (
    <>
      <div id="cursor-dot" ref={dotRef} />
      <div id="cursor-ring" ref={ringRef} />
    </>
  );
}
