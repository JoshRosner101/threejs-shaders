export default /*glsl*/ `

	varying vec3 vCenter;
	varying vec3 vNormal;
	varying vec3 vPosition;

	void main() {

    	float thickness = 0.7;

		vec3 afwidth = fwidth( vCenter.xyz );

		vec3 edge3 = smoothstep( ( thickness - 1.0 ) * afwidth, thickness * afwidth, vCenter.xyz );

		float edge = 1.0 - min( min( edge3.x, edge3.y ), edge3.z );

		vec3 normalColor = vec3( 0.4, 0.4, 0.5 ) * vNormal;
		//gl_FragColor.rgb = bool(edge) ? vec3( 0.9, 0.9, 1.0 ) : normalColor;
		vec3 grayScaleColor = vec3((normalColor.x + normalColor.y + normalColor.z)/3.0);
		vec3 colorMap = abs(vPosition - vCenter);
		colorMap = (1.0-(vec3(colorMap.x + colorMap.y + colorMap.z) / 3.0)) * 0.25;
		gl_FragColor.rgb = bool(edge) ? vec3(1.0, 1.0, 1.0) : (grayScaleColor +  pow(vec3(0.6588, 0.7098, 0.7961) / vec3(1.4), vec3(1.4)) + colorMap) ;

		gl_FragColor.a = gl_FrontFacing ? 1.0 : 0.0;
	}
`;