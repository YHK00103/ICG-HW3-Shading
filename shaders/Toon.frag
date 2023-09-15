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

	float intensity = dot(vec3(lightPos), n);
	if(intensity  > 15.0)
		intensity = 1.1;
	else if(intensity  > 7.0)
		intensity = 0.7;
	else if(intensity  > 3.0)
		intensity = 0.5;
	else
		intensity = 0.3;

	FragColor =  intensity *  texture(Texture, texCoord);

}
