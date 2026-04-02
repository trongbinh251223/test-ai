const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');
const yaml = require('js-yaml');

const blogDir = path.resolve(__dirname, '../blog');
const outputFile = path.resolve(__dirname, '../src/data/blogSidebar.js');

function kebabCase(str) {
  return str.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
}

function syncBlogData() {
  if (!fs.existsSync(blogDir)) {
    console.warn('Blog directory not found.');
    return;
  }
  
  const files = fs.readdirSync(blogDir).filter(f => f.endsWith('.md') || f.endsWith('.mdx'));
  
  const allTags = new Set();
  const definedAuthors = new Set();
  let authorsData = {};

  // Try parsing authors.yml
  const authorsFile = path.resolve(blogDir, 'authors.yml');
  if (fs.existsSync(authorsFile)) {
    const content = fs.readFileSync(authorsFile, 'utf8');
    try {
      authorsData = yaml.load(content) || {};
    } catch(e) {
      console.error('Error parsing authors.yml', e);
    }
  }

  files.forEach(file => {
    const content = fs.readFileSync(path.join(blogDir, file), 'utf8');
    try {
      const { data } = matter(content);

      if (data.tags) {
        data.tags.forEach(tag => {
          if (typeof tag === 'string') allTags.add(tag);
          else if (tag.label) allTags.add(tag.label);
        });
      }

      if (data.authors) {
        const authorsList = Array.isArray(data.authors) ? data.authors : [data.authors];
        authorsList.forEach(author => {
          if (typeof author === 'string') definedAuthors.add(author);
          else if (author.key) definedAuthors.add(author.key);
          else if (author.name) definedAuthors.add(author.name);
        });
      } else if (data.author) {
        definedAuthors.add(data.author);
      }
    } catch (e) {
      // ignore
    }
  });

  const tagsArray = Array.from(allTags).sort();
  // Using up to 5 tags as functional "categories" for the UI template
  const categories = tagsArray.slice(0, 5).map(tag => ({
    label: tag,
    path: `/blog/tags/${kebabCase(tag)}`
  }));

  const authorsArray = Array.from(definedAuthors).map(authorKey => {
    const authorInfo = authorsData[authorKey] || {};
    let urlPath = `/blog/authors/${kebabCase(authorKey)}`;
    if (authorInfo.page && typeof authorInfo.page.permalink === 'string') {
      let slug = authorInfo.page.permalink;
      if (slug.startsWith('/')) slug = slug.substring(1);
      urlPath = `/blog/authors/${slug}`;
    } else if (authorInfo.page === false) {
      urlPath = '#'; // disabled author page
    }
    return {
      name: authorInfo.name || authorKey,
      path: urlPath,
      image: authorInfo.image_url || authorInfo.imageURL || 'https://avatars.githubusercontent.com/u/0?v=4'
    };
  }).filter(a => a.path !== '#');

  const fileContent = `// AUTO GENERATED FILE (DO NOT EDIT MANUALLY)
// Run "npm run sync-blog-data" or "npm start" to re-generate from your blog posts.
export const CATEGORIES = ${JSON.stringify(categories, null, 2)};

export const TAGS = ${JSON.stringify(tagsArray, null, 2)};

export const AUTHORS = ${JSON.stringify(authorsArray, null, 2)};
`;

  fs.writeFileSync(outputFile, fileContent);
  console.log('Successfully synced blog sidebar data from raw posts!');
}

syncBlogData();
