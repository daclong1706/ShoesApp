import axios from 'axios';

// Thay thế <your_cloud_name> và <your_upload_preset> bằng thông tin của bạn
const CLOUDINARY_URL = 'https://api.cloudinary.com/v1_1/di5s8bfuq/image/upload';
const CLOUDINARY_UPLOAD_PRESET = 'shoes_app';

// Hàm upload ảnh lên Cloudinary
export const uploadToCloudinary = async (
  imageUri: string,
): Promise<string | null> => {
  const formData = new FormData();
  formData.append('file', {
    uri: imageUri,
    type: 'image/jpeg',
    name: 'upload.jpg',
  });
  formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);

  try {
    const response = await axios.post(CLOUDINARY_URL, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    // Trả về URL của ảnh sau khi upload thành công
    if (response.data.secure_url) {
      return response.data.secure_url;
    } else {
      console.error('Upload failed');
      return null;
    }
  } catch (error) {
    console.error('Cloudinary upload error:', error);
    return null;
  }
};
