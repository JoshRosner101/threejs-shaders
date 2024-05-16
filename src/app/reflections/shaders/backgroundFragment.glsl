export default /*glsl*/ `
varying vec2 vUv;
void main() {
  gl_FragColor = vec4(mix(vec3(0.9607, 0.9529, 0.9529), vec3(0.8157, 0.8471, 0.9059), vUv.y), 1);
}
`;