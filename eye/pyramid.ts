export const vertices = [
  0, 1, 0, // top
  -0.5, 0, 0.5, // front left
  0.5, 0, 0.5, // front right
  -0.5, 0, -0.5, // rear left
  0.5, 0, -0.5, // rear right
];

export const colors = [
  1, 0, 0, 1,
  0, 1, 0, 1,
  0, 0, 1, 1,
  1, 1, 0, 1,
  0, 1, 1, 1,
];

export const triangles = [
  0, 1, 2, // top-front
  0, 4, 3, // top-rear
  0, 3, 1, // top-left
  0, 2, 4, // top-right
];