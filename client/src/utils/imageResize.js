// Client-side image resize utility
// Resizes and center-crops an image to exact target width/height and returns a File
export async function resizeImageFile(file, targetWidth, targetHeight, mimeType = 'image/jpeg', quality = 0.8) {
  return new Promise((resolve, reject) => {
    if (!file) return resolve(file);

    const img = new Image();
    img.crossOrigin = 'Anonymous';

    img.onload = () => {
      try {
        const canvas = document.createElement('canvas');
        canvas.width = targetWidth;
        canvas.height = targetHeight;
        const ctx = canvas.getContext('2d');

        const srcWidth = img.width;
        const srcHeight = img.height;
        const srcRatio = srcWidth / srcHeight;
        const targetRatio = targetWidth / targetHeight;

        // Calculate center-crop source rectangle
        let sx = 0, sy = 0, sWidth = srcWidth, sHeight = srcHeight;
        if (srcRatio > targetRatio) {
          // source wider -> crop left/right
          sWidth = srcHeight * targetRatio;
          sx = (srcWidth - sWidth) / 2;
        } else {
          // source taller -> crop top/bottom
          sHeight = srcWidth / targetRatio;
          sy = (srcHeight - sHeight) / 2;
        }

        ctx.drawImage(img, sx, sy, sWidth, sHeight, 0, 0, targetWidth, targetHeight);

        canvas.toBlob((blob) => {
          if (!blob) return reject(new Error('Failed to convert canvas to blob'));
          const ext = mimeType === 'image/png' ? '.png' : '.jpg';
          const newName = (file && file.name) ? file.name.replace(/\.[^/.]+$/, ext) : `resized${ext}`;
          try {
            const resizedFile = new File([blob], newName, { type: mimeType });
            resolve(resizedFile);
          } catch (e) {
            // Older browsers may not support File constructor
            const blobFile = blob;
            blobFile.name = newName;
            resolve(blobFile);
          }
        }, mimeType, quality);
      } catch (err) {
        reject(err);
      }
    };

    img.onerror = (err) => {
      reject(err || new Error('Image load error'));
    };

    const reader = new FileReader();
    reader.onload = () => {
      img.src = reader.result;
    };
    reader.onerror = (e) => reject(e);
    reader.readAsDataURL(file);
  });
}

export default resizeImageFile;
