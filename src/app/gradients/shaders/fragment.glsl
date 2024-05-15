export default /*glsl*/ `
varying vec2 vUv;

struct ColorStop {
  vec3 color;
  float position;
};

// lerp means linear interpolation, the mix function automatically does it over the defined range
#define ColorRamp(colors, factor, finalColor) { \
  int index = 0; \
  for(int i = 0; i < colors.length() - 1; i++) { \
    ColorStop currentColor = colors[i]; \
    if(currentColor.position <= factor) { \
      index = i; \
    } \
  } \
  ColorStop currentColor = colors[index]; \
  ColorStop nextColor = colors[index+1]; \
  float range = nextColor.position - currentColor.position; \
  float lerpFactor = (factor - currentColor.position) / range; \
  finalColor = mix(currentColor.color, nextColor.color, lerpFactor); \
} \

void main() {
  ColorStop[] colors = ColorStop[](
    ColorStop(vec3(1.0, 1.0, 1.0), 0.0),
    ColorStop(vec3(0.2392, 0.8118, 0.2392), 0.3),
    ColorStop(vec3(0.1098, 0.7137, 0.4941), 0.6),
    ColorStop(vec3(0.1255, 0.0314, 0.5412), 1.0)
  );

  vec3 finalColor;
  ColorRamp(colors, vUv.x, finalColor);

  gl_FragColor = vec4(finalColor, 1);
}
`;