import React, {memo} from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import { CATEGORIES, TAGS, AUTHORS } from '@site/src/data/blogSidebar';

function BlogSidebarDesktop() {
  return (
    <aside className="col col--3">
      <nav className="custom-blog-sidebar custom-scrollbar">
        <div className="sidebar-section margin-bottom--xl">
          <h3 className="sidebar-title">Categories</h3>
          <ul className="sidebar-categories-list">
            {CATEGORIES.map((cat) => (
              <li key={cat.label} className="sidebar-category-item">
                <Link to={cat.path} className="sidebar-category-link">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="category-folder-icon"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path></svg>
                  <span>{cat.label}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="sidebar-section margin-bottom--xl">
          <h3 className="sidebar-title">Authors</h3>
          <ul className="sidebar-categories-list">
            {AUTHORS.map((author) => (
              <li key={author.name} className="sidebar-category-item">
                <Link to={author.path} className="sidebar-category-link">
                  <img src={author.image} alt={author.name} className="sidebar-author-avatar" width={20} height={20} style={{ borderRadius: '50%', objectFit: 'cover' }} />
                  <span>{author.name}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="sidebar-section">
          <h3 className="sidebar-title margin-bottom--md">Tags</h3>
          <div className="sidebar-tags-grid">
            {TAGS.map((tag) => (
              <Link key={tag} to={`/blog/tags/${tag.toLowerCase()}`} className="sidebar-tag-pill">
                {tag}
              </Link>
            ))}
          </div>
        </div>
      </nav>
    </aside>
  );
}

export default memo(BlogSidebarDesktop);
