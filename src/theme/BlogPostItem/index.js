import React from 'react';
import clsx from 'clsx';
import { useBlogPost } from '@docusaurus/plugin-content-blog/client';
import BlogPostItemContainer from '@theme/BlogPostItem/Container';
import BlogPostItemHeader from '@theme/BlogPostItem/Header';
import BlogPostItemContent from '@theme/BlogPostItem/Content';
import BlogPostItemFooter from '@theme/BlogPostItem/Footer';
import Link from '@docusaurus/Link';

// apply a bottom margin in list view
function useContainerClassName() {
  const { isBlogPostPage } = useBlogPost();
  return !isBlogPostPage ? 'margin-bottom--xl' : undefined;
}

export default function BlogPostItem({ children, className }) {
  const containerClassName = useContainerClassName();
  const { isBlogPostPage, metadata } = useBlogPost();

  if (!isBlogPostPage) {
    const { permalink, title, description, frontMatter, formattedDate, tags } = metadata;
    const image = frontMatter.image || 'https://images.unsplash.com/photo-1542435503-956c469947f6?auto=format&fit=crop&q=80&w=1000';
    const category = tags && tags.length > 0 ? tags[0].label : (frontMatter.category || 'Technology');

    return (
      <BlogPostItemContainer className={clsx('blog-card', className)}>
        <Link to={permalink} className="blog-card-image-link">
          <div className="blog-card-image" style={{ backgroundImage: `url(${image})` }}></div>
        </Link>
        <div className="blog-card-content-wrapper">
          <div className="blog-card-category-badge">
            {category}
          </div>
          <h2 className="blog-card-title">
            <Link to={permalink}>{title}</Link>
          </h2>
          <div className="blog-card-excerpt line-clamp-2">
            {description}
          </div>
        </div>
      </BlogPostItemContainer>
    );
  }

  return (
    <BlogPostItemContainer className={clsx(containerClassName, className)}>
      <BlogPostItemHeader />
      <BlogPostItemContent>{children}</BlogPostItemContent>
      <BlogPostItemFooter />
    </BlogPostItemContainer>
  );
}
