const projectSchema = {
  name: 'project',
  title: 'Project',
  type: 'document',
  fields: [
    { name: 'title', title: 'Title', type: 'string' },
    { name: 'slug', title: 'Slug', type: 'slug', options: { source: 'title' } },
    {
      name: 'category',
      title: 'Category',
      type: 'string',
      options: { list: ['Product', 'Visual ID', 'UI/UX'] },
    },
    { name: 'mainImage', title: 'Main Image', type: 'image', options: { hotspot: true } },
    { name: 'processLogs', title: 'Process Logs', type: 'array', of: [{ type: 'string' }] },
    {
      name: 'portfolioPages',
      title: 'Portfolio Pages',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'image', type: 'image' },
            { name: 'caption', type: 'string' },
          ],
        },
      ],
    },
  ],
};

export default projectSchema;
