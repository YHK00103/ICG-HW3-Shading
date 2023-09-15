#version 330 core

// TO DO:
// Implement fragment shader

in vec2 texCoord;

uniform sampler2D Texture;

out vec4 FragColor;

void main(){

		FragColor = texture(Texture, texCoord);	
}