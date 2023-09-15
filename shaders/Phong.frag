#version 330 core

in vec3 Normal;
in vec4 WorldPos;
in vec2 texCoord;

out vec4 FragColor;

uniform sampler2D Texture;

uniform vec3 Ambient_ref;
uniform vec3 Diffuse_ref;
uniform vec3 Specular_ref;
uniform float Gloss;

uniform vec3 Ambient_int;
uniform vec3 Diffuse_int;
uniform vec3 Specular_int;

uniform vec3 lightPos ;
uniform vec3 cameraPos;

void main(){	

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

	
	vec3 result = vec3(Ambient_light_r + Diffuse_light_r + Specular_light_r, 
									Ambient_light_g + Diffuse_light_g + Specular_light_g, 
									Ambient_light_b + Diffuse_light_b + Specular_light_b);
	
	FragColor = vec4(result, 1.0) * texture(Texture, texCoord);

}

/*
vec3 Ambient_ref = vec3(1.0, 1.0, 1.0);
vec3 Diffuse_ref = vec3(1.0, 1.0, 1.0);
vec3 Specular_ref = vec3(0.7, 0.7, 0.7);
float Gloss = 10.5;
vec3 Ambient_int = vec3(0.2, 0.2, 0.2);
uniform vec3 Diffuse_int = vec3(0.8, 0.8, 0.8);
vec3 Specular_int = vec3(0.5, 0.5, 0.5);
vec3 lightPos = vec3(10, 10, 10);
vec3 cameraPos = vec3(0, 3.5, 3.5);
*/