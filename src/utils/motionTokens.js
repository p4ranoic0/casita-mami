export const MOTION_EASE_STANDARD = [0.22, 1, 0.36, 1]

export const MOTION_DURATION = {
  quick: 0.2,
  base: 0.3,
  smooth: 0.45,
}

export const MOTION_DISTANCE = {
  xs: 8,
  sm: 14,
  md: 24,
}

export function withReducedMotion(prefersReducedMotion, value, reducedValue) {
  return prefersReducedMotion ? reducedValue : value
}
