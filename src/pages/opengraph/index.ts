import { componentToPng } from "@utils/opengraph";
import OpengraphImage from "@components/opengraph/OpengraphImage";

export const prerender = false;

export async function GET({ request }: { request: Request }) {
  const query = new URL(request.url).searchParams;

  const title = query.get('title');
  const subtitle = query.get('subtitle');

  if (!title) {
    return new Response('Title query param is mandatory', { status: 400 });
  }

  return componentToPng(OpengraphImage, { title, subtitle })
}
