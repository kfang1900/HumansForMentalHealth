"use client"

import { allStories } from "@/.contentlayer/generated"
import Link from "next/link"
import Image from "next/image"
import { Mdx } from "@/components/mdx-components"
import Masonry from "react-masonry-css"

const breakpointColumnsObj = {
  default: 4,
  1200: 3,
  800: 2,
  400: 1,
}

export default function Home() {
  return (
    <Masonry
      breakpointCols={breakpointColumnsObj}
      className="flex flex-wrap justify-evenly max-w-full px-4 pt-3"
    >
      {allStories.map((story) => (
        <article key={story._id} className="max-w-[800px]">
          <Link href={story.slug}>
            {story.picture && (
              <div className="max-w-[500px] p-4">
                <Image
                  src={story.picture}
                  className="object-cover"
                  width={1000}
                  height={1000}
                  alt={story.name}
                />
              </div>
            )}
            <div className="px-4 mx-auto">
              <div className="flex justify-between items-center">
                <div className="pb-4 space-y-1">
                  <h1 className="text-3xl font-bold">{story.name}</h1>
                  {story.illness && (
                    <p className="text-xl text-slate-600">{story.illness}</p>
                  )}
                </div>
              </div>
              <p className="prose text-black line-clamp-6 font-sans mb-4 -mt-1">
                <Mdx code={story.body.code} />
              </p>
            </div>
          </Link>
        </article>
      ))}
    </Masonry>
  )
}
