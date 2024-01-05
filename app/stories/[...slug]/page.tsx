import { notFound } from "next/navigation"
import { allStories } from "contentlayer/generated"
import { useMediaQuery } from "react-responsive"

import { Metadata } from "next"
import { Mdx } from "@/components/mdx-components"

interface StoryProps {
  params: {
    slug: string[]
  }
}

async function getStoryFromParams(params: StoryProps["params"]) {
  const slug = params?.slug?.join("/")
  const story = allStories.find((story) => story.slugAsParams === slug)

  if (!story) {
    null
  }

  return story
}

export async function generateMetadata({
  params,
}: StoryProps): Promise<Metadata> {
  const story = await getStoryFromParams(params)

  if (!story) {
    return {}
  }

  return {
    title: story.name,
    description: story.illness,
  }
}

export async function generateStaticParams(): Promise<StoryProps["params"][]> {
  return allStories.map((story) => ({
    slug: story.slugAsParams.split("/"),
  }))
}

export default async function StoryPage({ params }: StoryProps) {
  const story = await getStoryFromParams(params)

  if (!story) {
    notFound()
  }

  return (
    <div className="">
      <article className="py-6 prose dark:prose-invert">
        <h1 className="mb-2">{story.name}</h1>
        {story.illness && (
          <p className="text-xl mt-0 text-slate-700 dark:text-slate-200">
            {story.illness}
          </p>
        )}
        <hr className="my-4" />
        <Mdx code={story.body.code} />
      </article>
    </div>
  )
}
