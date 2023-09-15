#version 330 core

in vec3 Normal;
in vec4 WorldPos;
in vec2 texCoord;

out vec4 FragColor;

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

	float dot_product = dot(v, n);
	if(dot_product < 0.2)
		FragColor = vec4(0.0, 0.0, 1.0, 1.0);
	else
		FragColor = vec4(0.0, 0.0, 0.0, 1.0);

}
