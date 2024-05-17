export default /*glsl*/`

attribute vec3 center;
varying vec3 vCenter;
varying vec2 vUv;
varying vec3 vNormal;
varying vec3 vPosition;

void main() {
    vCenter = center;
    vUv = uv;
    vNormal = normal;
    vPosition = position;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1);
}
`;