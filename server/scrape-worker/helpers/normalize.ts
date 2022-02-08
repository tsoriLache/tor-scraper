/* Author - In cases it's Guest, Unknown, Anonymous, etc... 
the author name must be the same, for example: "" (empty string)
*/
const normalizeAuthor = () => {};

// Title - Same as with Author.

// Date - UTC Date
const normalizeDate = (date: string): number => {
  return Date.parse(date);
};
// Content - Must be stripped of trailing s
const normalizeContent = (content: string): string => {
  return content.replace(/\s+$/, '');
};

export { normalizeAuthor, normalizeDate, normalizeContent };
