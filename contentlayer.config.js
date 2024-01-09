import { defineDocumentType, makeSource } from "contentlayer/source-files"

/** @type {import('contentlayer/source-files').ComputedFields} */
const computedFields = {
  slug: {
    type: "string",
    resolve: (doc) => `/${doc._raw.flattenedPath}`,
  },
  slugAsParams: {
    type: "string",
    resolve: (doc) => doc._raw.flattenedPath.split("/").slice(1).join("/"),
  },
}

export const Page = defineDocumentType(() => ({
  name: "Page",
  filePathPattern: `pages/**/*.mdx`,
  contentType: "mdx",
  fields: {
    title: {
      type: "string",
      required: true,
    },
    description: {
      type: "string",
    },
  },
  computedFields,
}))

export const Post = defineDocumentType(() => ({
  name: "Post",
  filePathPattern: `posts/**/*.mdx`,
  contentType: "mdx",
  fields: {
    title: {
      type: "string",
      required: true,
    },
    description: {
      type: "string",
    },
    date: {
      type: "date",
      required: true,
    },
  },
  computedFields,
}))

export const Story = defineDocumentType(() => ({
  name: "Story",
  filePathPattern: `stories/**/*.mdx`,
  contentType: "mdx",
  fields: {
    name: {
      type: "string",
      required: true,
    },
    email: {
      type: "string",
      required: true,
    },
    illness: {
      type: "string",
    },
    picture: {
      type: "string",
    },
    treatment: {
      type: 'list',
      of: { type: 'string' },
    },
    medication: {
      type: 'list',
      of: { type: 'string' },
    }, 
    discrimination: {
      type: 'string',
    }, 
    institution: {
      type: "string",
    }, 
    class: {
      type: "string",
    }, 
    responsibleIndividuals:{
      type: "string",
    }
  },
  computedFields,
}))

export const Justice = defineDocumentType(() => ({
  name: "Justice",
  filePathPattern: `justice/**/*.mdx`,
  contentType: "mdx",
  fields: {
    isPerson: {
      type: "boolean",
      required: true,
    },
    name: {
      type: "string",
    },
    school: {
      type: "string",
    },
  },
  computedFields,
}))

export default makeSource({
  contentDirPath: "./content",
  documentTypes: [Post, Page, Story, Justice],
})
