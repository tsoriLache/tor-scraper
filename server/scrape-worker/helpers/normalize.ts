/* Author - In cases it's Guest, Unknown, Anonymous, etc... 
the author name must be the same, for example: "" (empty string)
*/
const normalizeAuthor = (author: string): string => {
  const commonAnonymousNames = 'Guest,Unknown,Anonymous';
  if (commonAnonymousNames.includes(author)) return 'Anonymous';
  return author;
};

// Title - Same as with Author.
const normalizeTitle = (title: string): string => {
  return title;
};

// Date - UTC Date
const normalizeDate = (date: string): number => {
  return Date.parse(date);
};
// Content - Must be stripped of trailing s
const normalizeContent = (content: string): string => {
  return content.replace(/\s+$/, '');
};

export { normalizeAuthor, normalizeDate, normalizeContent, normalizeTitle };
