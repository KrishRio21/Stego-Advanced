uniform sampler2D uTexture;
uniform float uTime;
uniform float uEncodeProgress;
uniform float uDecodeProgress;
varying vec2 vUv;

void main() {
  vec2 uv = vUv;
  vec4 color = texture2D(uTexture, uv);

  // Encoding glitch effect
  if (uEncodeProgress > 0.0) {
    float glitch = sin(uTime * 10.0 + uv.y * 10.0) * 0.02 * uEncodeProgress;
    uv.x += glitch;
    color = texture2D(uTexture, uv);
    float noise = fract(sin(dot(uv, vec2(12.9898, 78.233))) * 43758.5453123);
    color.rgb += noise * 0.1 * uEncodeProgress;
  }

  // Decoding highlight effect
  if (uDecodeProgress > 0.0) {
    float reveal = cos(uTime * 5.0 + uv.x * 5.0) * 0.05 * uDecodeProgress;
    color.rgb += vec3(0.2, 0.0, 0.0) * reveal; // Red tint for decoding
  }

  gl_FragColor = color;
}