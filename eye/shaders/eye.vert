#version 300 es

in vec4 position_attr;

uniform mat4 projection_matrix;

void main() {
    gl_Position = position_attr * projection_matrix;
}