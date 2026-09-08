import {defineArrayMember, defineField, defineType} from 'sanity'

export const pageType = defineType({
  name: 'page',
  title: 'Page',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {source: 'title', maxLength: 96},
      validation: (rule) =>
        rule.required().custom((slug) => {
          const value = slug?.current?.toLowerCase()
          if (!value) return 'Slug is required'
          if (['shop', 'studio', 'api'].includes(value)) {
            return 'That slug is reserved'
          }
          return true
        }),
    }),
    defineField({
      name: 'seoDescription',
      title: 'SEO description',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'heroImage',
      title: 'Hero image',
      type: 'image',
      options: {hotspot: true},
    }),
    defineField({
      name: 'body',
      title: 'Body',
      type: 'array',
      of: [
        defineArrayMember({type: 'block'}),
        defineArrayMember({
          type: 'image',
          options: {hotspot: true},
          fields: [
            defineField({
              name: 'alt',
              title: 'Alt text',
              type: 'string',
            }),
          ],
        }),
      ],
    }),
    defineField({
      name: 'showInNav',
      title: 'Show in navigation',
      type: 'boolean',
      initialValue: true,
    }),
    defineField({
      name: 'products',
      title: 'Products',
      description: 'Choose which products appear on this page.',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'reference',
          to: [{type: 'product'}],
        }),
      ],
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'slug.current',
      media: 'heroImage',
    },
  },
})
