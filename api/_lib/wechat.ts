import type {
  WxAccessTokenResponse,
  WxDraftAddResponse,
  WxMediaUploadResponse,
  WxApiResponse,
  CheckConnectionData,
  ServerlessResponse,
} from './types';

/** WeChat API base URL */
const WX_API_BASE = 'https://api.weixin.qq.com/cgi-bin';

/**
 * Get access token from WeChat API.
 * @param appId - WeChat AppID
 * @param appSecret - WeChat AppSecret
 * @returns Access token response
 */
export async function getAccessToken(
  appId: string,
  appSecret: string,
): Promise<WxAccessTokenResponse> {
  const url = `${WX_API_BASE}/token?grant_type=client_credential&appid=${appId}&secret=${appSecret}`;

  const response = await fetch(url);
  const data: WxAccessTokenResponse = await response.json();

  if (data.errcode && data.errcode !== 0) {
    throw new Error(`获取 access_token 失败: ${data.errmsg} (code: ${data.errcode})`);
  }

  return data;
}

/**
 * Add a draft article to WeChat.
 * @param accessToken - Valid access token
 * @param articles - Article data array
 * @returns Draft add response
 */
export async function addDraft(
  accessToken: string,
  articles: Array<{
    title: string;
    content: string;
    digest: string;
    thumb_media_id: string;
    content_source_url: string;
  }>,
): Promise<WxDraftAddResponse> {
  const url = `${WX_API_BASE}/draft/add?access_token=${accessToken}`;

  const response = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ articles }),
  });

  const data: WxDraftAddResponse = await response.json();

  if (data.errcode && data.errcode !== 0) {
    throw new Error(`新建草稿失败: ${data.errmsg} (code: ${data.errcode})`);
  }

  return data;
}

/**
 * Upload image to WeChat material library.
 * @param accessToken - Valid access token
 * @param mediaData - Base64 encoded image data
 * @param filename - Image filename
 * @returns Upload response with URL
 */
export async function uploadImage(
  accessToken: string,
  mediaData: string,
  filename: string,
): Promise<WxMediaUploadResponse> {
  const url = `${WX_API_BASE}/media/uploadimg?access_token=${accessToken}`;

  // Convert base64 to blob
  const byteString = atob(mediaData);
  const ab = new ArrayBuffer(byteString.length);
  const ia = new Uint8Array(ab);
  for (let i = 0; i < byteString.length; i++) {
    ia[i] = byteString.charCodeAt(i);
  }
  const blob = new Blob([ab]);

  const formData = new FormData();
  formData.append('media', blob, filename);

  const response = await fetch(url, {
    method: 'POST',
    body: formData,
  });

  const data: WxMediaUploadResponse = await response.json();

  if (data.errcode && data.errcode !== 0) {
    throw new Error(`上传图片失败: ${data.errmsg} (code: ${data.errcode})`);
  }

  return data;
}

/**
 * Check if WeChat API credentials are valid.
 * @param appId - WeChat AppID
 * @param appSecret - WeChat AppSecret
 * @returns Check result with token expiry info
 */
export async function checkCredentials(
  appId: string,
  appSecret: string,
): Promise<CheckConnectionData> {
  try {
    const tokenResponse = await getAccessToken(appId, appSecret);
    return {
      valid: true,
      tokenExpiresIn: tokenResponse.expires_in,
    };
  } catch {
    return {
      valid: false,
      tokenExpiresIn: 0,
    };
  }
}

/**
 * Create a success serverless response.
 */
export function successResponse<T>(data: T, message: string = 'ok'): ServerlessResponse<T> {
  return { code: 0, data, message };
}

/**
 * Create an error serverless response.
 */
export function errorResponse(message: string, code: number = -1): ServerlessResponse<null> {
  return { code, data: null, message };
}

/**
 * Parse request body from Vercel request.
 */
export async function parseRequestBody<T>(req: Request): Promise<T> {
  const body = await req.json();
  return body as T;
}
