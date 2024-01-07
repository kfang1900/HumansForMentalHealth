import React from "react"

interface RoundedTextBlockProps {
  text: string
}

const RoundedTextBlock: React.FC<RoundedTextBlockProps> = ({ text }) => {
  return (
    <div className="flex text-xs items-center justify-center rounded-full bg-gray-200 mr-2 px-3 py-1">
      {text}
    </div>
  )
}

interface RoundedTextBlocksProps {
  textList: string[]
}

const RoundedTextBlocks: React.FC<RoundedTextBlocksProps> = ({ textList }) => {
  return (
    <div className="flex flex-wrap py-2">
      {textList.map((text, index) => (
        <RoundedTextBlock key={index} text={text} />
      ))}
    </div>
  )
}

export default RoundedTextBlocks
