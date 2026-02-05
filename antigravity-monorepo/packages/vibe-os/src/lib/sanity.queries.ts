export const projectsQuery = `*[_type == "project"] {
  title,
  slug,
  category,
  mainImage,
  processLogs,
  portfolioPages[] {
    image,
    caption
  }
}`;

export const rantsQuery = `*[_type == "rant"] | order(publishedAt desc) {
  title,
  slug,
  publishedAt,
  mood,
  currentTrack,
  content
}`;

export const systemSettingsQuery = `*[_type == "systemSettings"][0] {
  readmeContent,
  availableStatus,
  activeSocials
}`;
