export interface CustomCursorReturn {
  dotRef: React.RefObject<HTMLDivElement | null>;
  ringRef: React.RefObject<HTMLDivElement | null>;
  isTouchDevice: boolean;
}

export interface ScrollProgressReturn {
  progress: number;
  sticky: boolean;
  activeSection: string;
}

export interface PageLoaderReturn {
  hidden: boolean;
  pct: number;
}
