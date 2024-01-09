"use client"

import { notFound } from "next/navigation"
import { allStories } from "contentlayer/generated"
import ContactForm from "@/components/contact"
import { useState } from "react"
import Image from "next/image"
import RoundedTextBlocks from "@/components/RoundedTextBlocks"
import { Metadata } from "next"
import { Mdx } from "@/components/mdx-components"

// prevent Google/Bing from indexing Kevin's page
import Head from "next/head"

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
      <Head>
        {story.name === "Kevin Fang" && (
          <meta name="robots" content="noindex, nofollow" />
        )}
      </Head>
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
        <div className="px-5 max-w-[660px] mx-auto">
          <div className="flex justify-between items-center pt-2 my-1 md:my-8">
            <div className="py-6 space-y-2 md:space-y-4">
              <h1 className="text-5xl md:text-7xl font-bold">{story.name}</h1>
              {story.illness && (
                <p className="text-3xl md:text-4xl text-slate-600">
                  {story.illness}
                </p>
              )}
            </div>
            <button onClick={openEmailForm} className="text-black rounded pl-2">
              <Image
                src="/mail.svg"
                width={64}
                height={64}
                className="md:w-20 md:h-20"
                alt="email icon"
              />
            </button>
          </div>
          <div className="pb-2 md:pb-4">
            {story.treatment && (
              <>
                <h4 className="font-medium md:text-2xl md:mb-1">Treatment</h4>
                <RoundedTextBlocks textList={story.treatment} />
              </>
            )}
          </div>
          <div className="pb-2">
            {story.medication && (
              <>
                <h4 className="font-medium md:text-2xl md:mb-1">Medication</h4>
                <RoundedTextBlocks textList={story.medication} />
              </>
            )}
          </div>
          {story.discrimination && (
            <div className="border-4 text-lg border-yale rounded-lg p-5 my-6 md:my-10 md:p-8 bg-skin md:text-xl">
              <div className="mb-4 md:mb-6">
                <span className="font-semibold">Discrimination:</span>{" "}
                {story.discrimination}
              </div>
              <div className="mb-4 md:mb-6">
                <span className="font-semibold">Insitution:</span>{" "}
                {story.institution}
              </div>
              <div className="mb-4 md:mb-6">
                <span className="font-semibold">Class:</span> {story.class}
              </div>
              <div>
                <span className="font-semibold">Responsible Individuals:</span>{" "}
                {story.responsibleIndividuals}
              </div>
            </div>
          )}
          <div className="prose prose-lg pt-3 pb-12 font-medium prose-p:leading-[1.6rem] md:prose-p:leading-[1.82rem] text-lg md:text-xl text-black font-sans w-full">
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
