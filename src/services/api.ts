import type { PushRequest, PushResponse, ApiResponse, CheckConnectionResponse, UploadImageResponse } from '../types/push';

/** Base URL for API calls */
const API_BASE = '/api';

/**
 * Push an article to WeChat draft box.
 * @param request - The push request data
 * @returns Push response with media ID
 */
export async function pushToDraft(request: PushRequest): Promise<PushResponse> {
  const response = await fetch(`${API_BASE}/draft`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(request),
  });

  const result: ApiResponse<{ mediaId: string }> = await response.json();

  if (result.code !== 0) {
    return {
      code: result.code,
      message: result.message,
      mediaId: '',
    };
  }

  return {
    code: 0,
    message: '推送成功',
    mediaId: result.data.mediaId,
  };
}

/**
 * Test WeChat API connection.
 * @param appId - WeChat AppID
 * @param appSecret - WeChat AppSecret
 * @returns Whether the connection is valid
 */
export async function testConnection(
  appId: string,
  appSecret: string,
): Promise<boolean> {
  const response = await fetch(
    `${API_BASE}/check?appId=${encodeURIComponent(appId)}&appSecret=${encodeURIComponent(appSecret)}`,
  );

  const result: ApiResponse<CheckConnectionResponse> = await response.json();

  return result.code === 0 && result.data.valid;
}

/**
 * Upload an image to WeChat material library.
 * @param appId - WeChat AppID
 * @param appSecret - WeChat AppSecret
 * @param file - Image file to upload
 * @returns Uploaded image URL
 */
export async function uploadImage(
  appId: string,
  appSecret: string,
  file: File,
): Promise<string> {
  // Convert file to base64
  const mediaData = await fileToBase64(file);

  const response = await fetch(`${API_BASE}/media`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      appId,
      appSecret,
      mediaData,
      filename: file.name,
    }),
  });

  const result: ApiResponse<UploadImageResponse> = await response.json();

  if (result.code !== 0) {
    throw new Error(result.message);
  }

  return result.data.url;
}

/**
 * Convert a File to base64 string.
 * @param file - The file to convert
 * @returns Base64 encoded string
 */
function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string;
      // Remove data URL prefix (e.g., "data:image/png;base64,")
      const base64 = result.split(',')[1] || '';
      resolve(base64);
    };
    reader.onerror = () => {
      reject(new Error('Failed to read file'));
    };
    reader.readAsDataURL(file);
  });
}
