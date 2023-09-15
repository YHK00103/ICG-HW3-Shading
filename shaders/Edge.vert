#version 330 core

// TODO:
// Implement Edge shading

layout (location = 0) in vec3 aPos;
layout (location = 1) in vec3 aNormal;
layout (location = 2) in vec2 aTexCoord;

uniform mat4 M;
uniform mat4 V;
uniform mat4 P;

out vec2 texCoord;
out vec4 WorldPos;
out vec3 Normal;

void main()
{
	gl_Position = P * V * M * vec4(aPos, 1.0);
	texCoord = aTexCoord;
	WorldPos = M * vec4(aPos, 1.0);
	mat4 normal_transform = transpose(inverse(M));
	Normal = normalize((normal_transform * vec4(aNormal, 0.0)).xyz);;
}