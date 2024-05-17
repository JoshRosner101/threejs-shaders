export default /*glsl*/ `
varying vec2 vUv;
void main() {
  gl_FragColor = vec4(mix(vec3(0.9607, 0.9529, 0.9529), vec3(0.5569, 0.6667, 0.8431), vUv.y), 1);
}
`;