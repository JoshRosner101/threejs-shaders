export default /*glsl*/`

attribute vec3 center;
varying vec3 vCenter;
varying vec2 vUv;
varying vec3 vNormal;

void main() {
    vCenter = center;
    vUv = uv;
    vNormal = normal;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1);
}
`;