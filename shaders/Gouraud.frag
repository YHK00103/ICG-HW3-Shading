#version 330 core

in vec2 texCoord;
in vec3 result;

out vec4 FragColor;

uniform sampler2D Texture;

void main(){	
	
	FragColor = vec4(result, 1.0) * texture(Texture, texCoord);

}

