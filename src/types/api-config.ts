/** WeChat API configuration */
export interface WxApiConfig {
  id: string;
  name: string;
  appId: string;
  appSecret: string;
  createdAt: number;
  updatedAt: number;
}

/** API config form data (for creating/updating) */
export interface WxApiConfigFormData {
  name: string;
  appId: string;
  appSecret: string;
}
