import type { Metadata } from "next"
import type { ClientAction, OberonConfig, ServerActions } from "./schema"
import { getTitle } from "./utils"

export async function getMetaData(
  { resolvePath }: OberonConfig,
  { getPageData }: ServerActions,
  path: string[] = [],
  action?: ClientAction,
): Promise<Metadata> {
  const slug = resolvePath(path)

  if (action) {
    return {
      title: getTitle(action, slug),
    }
  }

  const data = await getPageData(slug)

  return {
    title: data?.root.title || "Oberon CMS",
  }
}