/** WeChat API error codes */
export const WX_ERROR_CODES = {
  SUCCESS: 0,
  INVALID_APPID: 40013,
  INVALID_APPSECRET: 40125,
  ACCESS_TOKEN_EXPIRED: 42001,
  ACCESS_TOKEN_INVALID: 40014,
  MISSING_PARAMETER: 41001,
} as const;

/** WeChat API response type */
export interface WxApiResponse {
  errcode: number;
  errmsg: string;
  [key: string]: unknown;
}

/** Access token response */
export interface WxAccessTokenResponse extends WxApiResponse {
  access_token: string;
  expires_in: number;
}

/** Draft add response */
export interface WxDraftAddResponse extends WxApiResponse {
  media_id: string;
}

/** Media upload image response */
export interface WxMediaUploadResponse extends WxApiResponse {
  url: string;
}

/** Serverless API request */
export interface ServerlessRequest {
  appId: string;
  appSecret: string;
  [key: string]: unknown;
}

/** Serverless API response wrapper */
export interface ServerlessResponse<T = unknown> {
  code: number;
  data: T;
  message: string;
}

/** Draft request body */
export interface DraftRequestBody extends ServerlessRequest {
  title: string;
  content: string;
  digest: string;
  thumbMediaId: string;
}

/** Media upload request body */
export interface MediaUploadRequestBody extends ServerlessRequest {
  mediaData: string;
  filename: string;
}

/** Check connection response data */
export interface CheckConnectionData {
  valid: boolean;
  tokenExpiresIn: number;
}
