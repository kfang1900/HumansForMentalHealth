import { allStories } from "@/.contentlayer/generated"
import Link from "next/link"
import Image from "next/image"
import { Mdx } from "@/components/mdx-components"

allStories.map((value) => {
  console.log(value.picture)
})

export default function Home() {
  return (
    <div className="">
      {allStories.map((story) => (
        <article key={story._id} className="mb-8 ml-6">
          <div>
            {story.picture && (
              <Image src="/UT.jpeg" width={100} height={100} alt={story.name} />
            )}
          </div>
          <div className="font-bold text-2xl">
            <Link href={story.slug}>
              <h2>{story.name}</h2>
            </Link>
          </div>
          <div className="text-sm text-gray-500 font-medium">
            {story.illness && <p>{story.illness}</p>}
          </div>
          <div className="prose">
            <Mdx code={story.body.code} />
          </div>
        </article>
      ))}
    </div>
  )
}
