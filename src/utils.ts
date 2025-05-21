export function colorGenerator(id: number): string {
  const hue = (id * 137.508) % 360;
  const saturation = 70;
  const lightness = 50;
  return `hsl(${hue.toFixed(0)}, ${saturation}%, ${lightness}%)`;
}

