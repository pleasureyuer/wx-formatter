import type { VercelRequest, VercelResponse } from '@vercel/node';
import { getAccessToken, addDraft, successResponse, errorResponse } from './_lib/wechat';
import type { DraftRequestBody } from './_lib/types';

/**
 * POST /api/draft - Create a new draft article
 * Body: { appId, appSecret, title, content, digest, thumbMediaId }
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

  const body = req.body as DraftRequestBody;

  if (!body.appId || !body.appSecret) {
    res.status(400).json(errorResponse('Missing appId or appSecret', 400));
    return;
  }

  if (!body.title || !body.content) {
    res.status(400).json(errorResponse('Missing title or content', 400));
    return;
  }

  try {
    // Step 1: Get access token
    const tokenData = await getAccessToken(body.appId, body.appSecret);

    // Step 2: Create draft
    const draftData = await addDraft(tokenData.access_token, [
      {
        title: body.title,
        content: body.content,
        digest: body.digest || '',
        thumb_media_id: body.thumbMediaId || '',
        content_source_url: '',
      },
    ]);

    res.status(200).json(
      successResponse({
        mediaId: draftData.media_id,
      }),
    );
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Failed to create draft';
    res.status(500).json(errorResponse(message, 500));
  }
}
