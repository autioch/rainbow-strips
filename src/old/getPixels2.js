export default function getPixels2(newLine, ctx, width, height) {
  const imageData = ctx.getImageData(0, 0, width, height).data;
  const pixels = [];

  for (let x = 0; x < width; x++) {
    for (let y = 0; y < height; y++) {
      const dataIndex = (x * 4) + (y * 4 * width);

      if (imageData[dataIndex] === 0 && imageData[dataIndex + 1] === 255 && imageData[dataIndex + 2] === 0) {
        pixels.push({
          value: [x, y]
        });
      }
    }
  }

  return pixels;
}
