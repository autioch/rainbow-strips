export default function createCanvas(w, h) {
  const image = document.createElement('canvas');

  image.width = w;
  image.height = h;
  image.ctx = image.getContext('2d');

  return image;
}
