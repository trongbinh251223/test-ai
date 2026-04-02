import React from 'react';
import {BlogPostProvider} from '@docusaurus/plugin-content-blog/client';
import BlogPostItem from '@theme/BlogPostItem';
export default function BlogPostItems({
  items,
  component: BlogPostItemComponent = BlogPostItem,
}) {
  return (
    <div className="blog-grid-container">
      {items.map(({content: BlogPostContent}) => (
        <BlogPostProvider
          key={BlogPostContent.metadata.permalink}
          content={BlogPostContent}>
          <BlogPostItemComponent>
            <BlogPostContent />
          </BlogPostItemComponent>
        </BlogPostProvider>
      ))}
    </div>
  );
}
