import type { VercelRequest, VercelResponse } from '@vercel/node';
import { getAccessToken, uploadImage, successResponse, errorResponse } from './_lib/wechat';
import type { MediaUploadRequestBody } from './_lib/types';

/**
 * POST /api/media - Upload image to WeChat material library
 * Body: { appId, appSecret, mediaData, filename }
 */
export default async function handler(
  req: VercelRequest,
  res: VercelResponse,
): Promise<void> {
  // Only allow POST
  if (req.method !== 'POST') {
    res.status(405).json(errorResponse('Method not allowed', 405));
    return;
  }

  const body = req.body as MediaUploadRequestBody;

  if (!body.appId || !body.appSecret) {
    res.status(400).json(errorResponse('Missing appId or appSecret', 400));
    return;
  }

  if (!body.mediaData || !body.filename) {
    res.status(400).json(errorResponse('Missing mediaData or filename', 400));
    return;
  }

  try {
    // Step 1: Get access token
    const tokenData = await getAccessToken(body.appId, body.appSecret);

    // Step 2: Upload image
    const uploadData = await uploadImage(
      tokenData.access_token,
      body.mediaData,
      body.filename,
    );

    res.status(200).json(
      successResponse({
        url: uploadData.url,
      }),
    );
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Failed to upload image';
    res.status(500).json(errorResponse(message, 500));
  }
}
