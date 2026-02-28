const MAX_OUTPUT_SIZE = 800 * 1024;
const MAX_DIMENSION = 256;
const OUTPUT_QUALITY = 0.8;

export function processAvatarFile(file) {
  return new Promise((resolve, reject) => {
    if (!file.type.startsWith('image/')) {
      return reject('Please select an image file (PNG, JPG, WEBP).');
    }
    if (file.size > 5 * 1024 * 1024) {
      return reject('Image is too large. Please select an image under 5MB.');
    }

    const reader = new FileReader();
    reader.onerror = () => reject('Failed to read the file.');
    reader.onload = () => {
      const img = new Image();
      img.onerror = () => reject('Failed to load the image.');
      img.onload = () => {
        const size = Math.min(img.width, img.height);
        const sx = (img.width - size) / 2;
        const sy = (img.height - size) / 2;

        const canvas = document.createElement('canvas');
        canvas.width = MAX_DIMENSION;
        canvas.height = MAX_DIMENSION;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, sx, sy, size, size, 0, 0, MAX_DIMENSION, MAX_DIMENSION);

        const dataURL = canvas.toDataURL('image/jpeg', OUTPUT_QUALITY);

        if (dataURL.length > MAX_OUTPUT_SIZE) {
          return reject('Image is still too large after compression. Try a smaller image.');
        }
        resolve(dataURL);
      };
      img.src = reader.result;
    };
    reader.readAsDataURL(file);
  });
}
