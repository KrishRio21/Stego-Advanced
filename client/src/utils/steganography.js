import CryptoJS from 'crypto-js';

export class Steganography {
  static encodeMessage(imageSrc, message, password, method = 'lsb', callback) {
    const img = new Image();
    img.src = imageSrc;
    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(img, 0, 0);
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);

      // Encrypt message if password provided
      let finalMessage = message;
      if (password) {
        finalMessage = CryptoJS.AES.encrypt(message, password).toString();
      }

      let encodedImageData;
      if (method === 'lsb') {
        const binaryMessage = this.stringToBinary(finalMessage) + '00000000';
        const pixels = imageData.data;
        const resultPixels = new Uint8ClampedArray(pixels);
        let messageIndex = 0;
        for (let i = 0; i < pixels.length && messageIndex < binaryMessage.length; i += 4) {
          for (let channel = 0; channel < 3; channel++) {
            if (messageIndex < binaryMessage.length) {
              resultPixels[i + channel] = (pixels[i + channel] & 0xFE) | parseInt(binaryMessage[messageIndex], 2);
              messageIndex++;
            }
          }
        }
        encodedImageData = new ImageData(resultPixels, canvas.width, canvas.height);
        ctx.putImageData(encodedImageData, 0, 0);
        callback(canvas.toDataURL('image/png'), 'png');
      } else {
        // DCT method (simplified)
        const binaryMessage = this.stringToBinary(finalMessage) + '00000000';
        const pixels = imageData.data;
        const blockSize = 8;
        let messageIndex = 0;
        for (let y = 0; y < canvas.height && messageIndex < binaryMessage.length; y += blockSize) {
          for (let x = 0; x < canvas.width && messageIndex < binaryMessage.length; x += blockSize) {
            for (let dy = 0; dy < blockSize; dy++) {
              for (let dx = 0; dx < blockSize; dx++) {
                const pixelIndex = ((y + dy) * canvas.width + (x + dx)) * 4;
                if (messageIndex < binaryMessage.length && dx === 4 && dy === 4) {
                  pixels[pixelIndex] = (pixels[pixelIndex] & 0xFE) | parseInt(binaryMessage[messageIndex], 2);
                  messageIndex++;
                }
              }
            }
          }
        }
        ctx.putImageData(imageData, 0, 0);
        callback(canvas.toDataURL('image/jpeg', 0.8), 'jpg');
      }
    };
    img.onerror = () => {
      callback(null, null, 'Failed to load image.');
    };
  }

  static decodeMessage(imageSrc, password, method = 'lsb', callback) {
    const img = new Image();
    img.src = imageSrc;
    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(img, 0, 0);
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      let binaryMessage = '';

      if (method === 'lsb') {
        const pixels = imageData.data;
        for (let i = 0; i < pixels.length; i += 4) {
          for (let channel = 0; channel < 3; channel++) {
            binaryMessage += (pixels[i + channel] & 1).toString();
          }
        }
      } else {
        // DCT method
        const pixels = imageData.data;
        const blockSize = 8;
        for (let y = 0; y < canvas.height; y += blockSize) {
          for (let x = 0; x < canvas.width; x += blockSize) {
            for (let dy = 0; dy < blockSize; dy++) {
              for (let dx = 0; dx < blockSize; dx++) {
                if (dx === 4 && dy === 4) {
                  const pixelIndex = ((y + dy) * canvas.width + (x + dx)) * 4;
                  binaryMessage += (pixels[pixelIndex] & 1).toString();
                }
              }
            }
          }
        }
      }

      let message = '';
      for (let i = 0; i < binaryMessage.length; i += 8) {
        const byte = binaryMessage.slice(i, i + 8);
        if (byte === '00000000') break;
        message += String.fromCharCode(parseInt(byte, 2));
      }

      // Decrypt if password provided
      if (password) {
        try {
          const bytes = CryptoJS.AES.decrypt(message, password);
          message = bytes.toString(CryptoJS.enc.Utf8);
          if (!message) throw new Error('Invalid password.');
        } catch (err) {
          callback(null, 'Invalid password or no message found.');
          return;
        }
      }

      callback(message || 'No message found.');
    };
    img.onerror = () => {
      callback(null, 'Failed to load image.');
    };
  }

  static stringToBinary(str) {
    return str
      .split('')
      .map(char => char.charCodeAt(0).toString(2).padStart(8, '0'))
      .join('');
  }
}