export default /*glsl*/`
void main() {
    float THICKNESS = 0.02;
    vec3 newPosition = position + normal * THICKNESS;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition, 1);
}
`;