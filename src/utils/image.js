const MAX_OUTPUT_SIZE = 800 * 1024;
const MAX_DIMENSION = 800;
const OUTPUT_QUALITY = 0.7;

export function processPostImage(file) {
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
        let { width, height } = img;

        if (width > MAX_DIMENSION || height > MAX_DIMENSION) {
          if (width > height) {
            height = Math.round((height / width) * MAX_DIMENSION);
            width = MAX_DIMENSION;
          } else {
            width = Math.round((width / height) * MAX_DIMENSION);
            height = MAX_DIMENSION;
          }
        }

        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, width, height);

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
