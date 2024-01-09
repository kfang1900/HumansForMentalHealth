"use client"

import { notFound } from "next/navigation"
import { allJustices } from "contentlayer/generated"
import { useState } from "react"
import Image from "next/image"
import { Mdx } from "@/components/mdx-components"

interface JusticeProps {
  params: {
    slug: string[]
  }
}
interface Justice {
  isPerson: boolean
}

function getJusticeFromParams(
  params: JusticeProps["params"]
): Justice | undefined {
  if (!params) {
    return undefined
  }
  const slug = params?.slug?.slice(-1)[0]
  const justice = allJustices.find((justice) => justice.slugAsParams === slug)

  if (!justice) {
    null
  }

  return justice
}

// export function generateStaticParams(): JusticeProps["params"][] {
//   return allJustices.map((justice) => ({
//     slug: justice.slugAsParams.split("/"),
//   }))
// }

export default function JusticePage({ params }: JusticeProps) {
  if (!params) {
    console.error("Params is undefined")
    return null
  }

  const justice = getJusticeFromParams(params)

  if (justice?.isPerson) {
    return <div>yay</div>
  } else {
    return <div>no</div>
  }
}
