#version 300 es

in vec4 position_attr;
in vec4 color_attr;

uniform mat4 model_matrix;
uniform mat4 view_matrix;
uniform mat4 projection_matrix;

out vec4 vertex_color;

void main() {
    gl_Position = projection_matrix * view_matrix * model_matrix * position_attr;
    vertex_color = color_attr;
}