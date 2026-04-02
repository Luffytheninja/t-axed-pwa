const rantSchema = {
  name: 'rant',
  title: 'Rant',
  type: 'document',
  fields: [
    { name: 'title', title: 'Title', type: 'string' },
    { name: 'slug', title: 'Slug', type: 'slug', options: { source: 'title' } },
    { name: 'publishedAt', title: 'Published At', type: 'datetime' },
    { name: 'mood', title: 'Mood', type: 'string' },
    { name: 'currentTrack', title: 'Current Track', type: 'string' },
    { name: 'content', title: 'Content', type: 'array', of: [{ type: 'block' }] },
  ],
};

export default rantSchema;
