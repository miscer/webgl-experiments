#version 300 es

in vec4 position_attr;

uniform mat4 model_matrix;
uniform mat4 view_matrix;
uniform mat4 projection_matrix;

void main() {
    gl_Position = projection_matrix * view_matrix * model_matrix * position_attr;
}