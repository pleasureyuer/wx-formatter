import type { VercelRequest, VercelResponse } from '@vercel/node';
import { checkCredentials, successResponse, errorResponse } from './_lib/wechat';

/**
 * GET /api/check - Test WeChat API connection
 * Query params: appId, appSecret
 */
export default async function handler(
  req: VercelRequest,
  res: VercelResponse,
): Promise<void> {
  // Only allow GET
  if (req.method !== 'GET') {
    res.status(405).json(errorResponse('Method not allowed', 405));
    return;
  }

  const { appId, appSecret } = req.query;

  if (!appId || !appSecret) {
    res.status(400).json(errorResponse('Missing appId or appSecret', 400));
    return;
  }

  const appIdStr = Array.isArray(appId) ? appId[0] : appId;
  const appSecretStr = Array.isArray(appSecret) ? appSecret[0] : appSecret;

  if (!appIdStr || !appSecretStr) {
    res.status(400).json(errorResponse('Invalid appId or appSecret', 400));
    return;
  }

  try {
    const result = await checkCredentials(appIdStr, appSecretStr);
    res.status(200).json(successResponse(result));
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Connection check failed';
    res.status(500).json(errorResponse(message, 500));
  }
}
