#version 330 core

// TODO:
// Implement Gouraud shading

layout (location = 0) in vec3 aPos;
layout (location = 1) in vec3 aNormal;
layout (location = 2) in vec2 aTexCoord;

uniform mat4 M;
uniform mat4 V;
uniform mat4 P;

uniform vec3 Ambient_ref;
uniform vec3 Diffuse_ref;
uniform vec3 Specular_ref;
uniform float Gloss;

uniform vec3 Ambient_int;
uniform vec3 Diffuse_int;
uniform vec3 Specular_int;

uniform vec3 lightPos ;
uniform vec3 cameraPos;

out vec2 texCoord;
out vec3 result;

void main()
{
	gl_Position = P * V * M * vec4(aPos, 1.0);
	texCoord = aTexCoord;
	vec4 WorldPos = M * vec4(aPos, 1.0);
	mat4 normal_transform = transpose(inverse(M));
	vec3 Normal = normalize((normal_transform * vec4(aNormal, 0.0)).xyz);

	vec3 n = normalize(Normal);
	vec3 l = (normalize(vec4(lightPos, 1.0) - WorldPos)).xyz;
	vec3 v = normalize(cameraPos - WorldPos.xyz);
	vec3 r = reflect(-l, n);

	//Ambient light
	float Ambient_light_r =   Ambient_int.x * Ambient_ref.x ;
	float Ambient_light_b =   Ambient_int.y * Ambient_ref.y ;
	float Ambient_light_g =   Ambient_int.z * Ambient_ref.z ;

	//Diffuse light
	float Diffuse_light_r =   Diffuse_int.x * Diffuse_ref.x * max(dot(l, n), 0.0);
	float Diffuse_light_g =   Diffuse_int.y * Diffuse_ref.y * max(dot(l, n), 0.0);
	float Diffuse_light_b =   Diffuse_int.z * Diffuse_ref.z * max(dot(l, n), 0.0);

	//Specular light
	float Specular_light_r =  Specular_int.x * Specular_ref.x * pow(max(dot(v, r), 0.0), Gloss);
	float Specular_light_g =  Specular_int.y * Specular_ref.y * pow(max(dot(v, r), 0.0), Gloss);
	float Specular_light_b =  Specular_int.z * Specular_ref.z * pow(max(dot(v, r), 0.0), Gloss);

	
	result = vec3(Ambient_light_r + Diffuse_light_r + Specular_light_r, 
						Ambient_light_g + Diffuse_light_g + Specular_light_g, 
						Ambient_light_b + Diffuse_light_b + Specular_light_b);

}