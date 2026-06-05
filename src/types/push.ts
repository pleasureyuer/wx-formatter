/** Push to draft request payload */
export interface PushRequest {
  title: string;
  content: string;
  digest: string;
  thumbMediaId: string;
  appId: string;
  appSecret: string;
}

/** Push to draft response */
export interface PushResponse {
  code: number;
  message: string;
  mediaId: string;
}

/** API response wrapper */
export interface ApiResponse<T> {
  code: number;
  data: T;
  message: string;
}

/** Connection check response */
export interface CheckConnectionResponse {
  valid: boolean;
  tokenExpiresIn: number;
}

/** Upload image response */
export interface UploadImageResponse {
  url: string;
}
