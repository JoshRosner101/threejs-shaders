export default /*glsl*/ `

	varying vec3 vCenter;
	varying vec3 vNormal;

	void main() {

    	float thickness = 1.5;

		vec3 afwidth = fwidth( vCenter.xyz );

		vec3 edge3 = smoothstep( ( thickness - 1.0 ) * afwidth, thickness * afwidth, vCenter.xyz );

		float edge = 1.0 - min( min( edge3.x, edge3.y ), edge3.z );

		vec3 normalColor = vec3( 0.4, 0.4, 0.5 ) * vNormal;
		//gl_FragColor.rgb = bool(edge) ? vec3( 0.9, 0.9, 1.0 ) : normalColor;
		vec3 grayScaleColor = vec3((normalColor.x + normalColor.y + normalColor.z)/3.0);
		gl_FragColor.rgb = bool(edge) ? vec3(1.0, 1.0, 1.0) : grayScaleColor;

		gl_FragColor.a = gl_FrontFacing ? 1.0 : 0.0;
	}
`;