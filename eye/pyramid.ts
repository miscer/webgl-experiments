export const vertices = [
  0, 1, 0, // top
  -0.5, 0, -0.5, // front left
  0.5, 0, -0.5, // front right
  -0.5, 0, 0.5, // rear left
  0.5, 0, 0.5, // rear right
];

export const triangles = [
  0, 1, 2, // top-front
  0, 3, 4, // top-rear
  0, 1, 3, // top-left
  0, 2, 4, // top-right
];