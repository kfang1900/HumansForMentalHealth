"use client"

import { notFound } from "next/navigation"
import { allStories } from "contentlayer/generated"
import ContactForm from "@/components/contact"
import { useMediaQuery } from "react-responsive"
import { useState } from "react"
import Image from "next/image"
import RoundedTextBlocks from "@/components/RoundedTextBlocks"

import { Metadata } from "next"
import { Mdx } from "@/components/mdx-components"

interface StoryProps {
  params: {
    slug: string[]
  }
}

function getStoryFromParams(params: StoryProps["params"]) {
  const slug = params?.slug?.join("/")
  const story = allStories.find((story) => story.slugAsParams === slug)

  if (!story) {
    null
  }

  return story
}

// export async function generateMetadata({
//   params,
// }: StoryProps): Promise<Metadata> {
//   const story = await getStoryFromParams(params)

//   if (!story) {
//     return {}
//   }

//   return {
//     title: story.name,
//     description: story.illness,
//   }
// }

export function generateStaticParams(): StoryProps["params"][] {
  return allStories.map((story) => ({
    slug: story.slugAsParams.split("/"),
  }))
}

export default function StoryPage({ params }: StoryProps) {
  const [isEmailFormOpen, setIsEmailFormOpen] = useState(false)

  if (!params) {
    console.error("Params is undefined")
    return null
  }

  const story = getStoryFromParams(params)

  if (!story) {
    notFound()
  }

  const openEmailForm = () => {
    setIsEmailFormOpen(true)
  }
  const closeEmailForm = () => {
    setIsEmailFormOpen(false)
  }

  return (
    <div className="max-w-screen-lg mx-auto">
      <article className="">
        {story.picture && (
          <div className="w-screen">
            <Image
              src={story.picture}
              className="object-cover"
              width={1000}
              height={1000}
              alt={story.name}
            />
          </div>
        )}
        <div className="px-4 max-w-[690px] mx-auto">
          <div className="flex justify-between items-center pt-2">
            <div className="py-6 space-y-2">
              <h1 className=" text-4xl font-bold">{story.name}</h1>
              {story.illness && (
                <p className="text-2xl mt-0 text-slate-600">{story.illness}</p>
              )}
            </div>
            <button
              onClick={openEmailForm}
              className="ng-blue-500 text-black px-4 py-2 rounded"
            >
              <Image src="/mail.svg" width={40} height={40} alt="email icon" />
            </button>
          </div>
          <div className="pb-2">
            <h4 className="font-medium">Treatment</h4>
            {story.treatment && (
              <RoundedTextBlocks textList={story.treatment} />
            )}
          </div>
          <div className="pb-2">
            <h4 className="font-medium">Medication</h4>
            {story.medication && (
              <RoundedTextBlocks textList={story.medication} />
            )}
          </div>

          <div className="prose prose-lg pt-3 pb-12 text-black font-sans w-full">
            <Mdx code={story.body.code} />
          </div>
        </div>
        {isEmailFormOpen && (
          <ContactForm
            onClose={closeEmailForm}
            recipientName={story.name}
            recipientEmail={story.email}
          />
        )}
      </article>
    </div>
  )
}
