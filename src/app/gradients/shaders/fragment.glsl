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
    ColorStop(vec3(0.9607, 0.9529, 0.9529), 0.0),
    ColorStop(vec3(0.8941, 0.9098, 0.9490), 0.5),
    ColorStop(vec3(0.8157, 0.8471, 0.9059), 1.0)
  );

  vec3 finalColor;
  ColorRamp(colors, vUv.x, finalColor);

  gl_FragColor = vec4(finalColor, 1);
}
`;