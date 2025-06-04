import { componentToPng } from "@utils/opengraph";
import CoolLinksOpengraphImage from "@components/opengraph/CoolLinksOpengraphImage";

export const prerender = false;

export async function GET({ request }: { request: Request }) {
  const query = new URL(request.url).searchParams;

  const title = query.get('title');
  const date = query.get('date');

  if (!title) {
    return new Response('Title query param is mandatory', { status: 400 });
  }

  let dateObj: Date | undefined;
  if (date) {
    try {
      dateObj = new Date(date);
    } catch (e) {
      return new Response('Date query param is invalid', { status: 400 });
    }
  }

  return componentToPng(CoolLinksOpengraphImage, { title, date: dateObj, willRenderWithSatori: true })
}
