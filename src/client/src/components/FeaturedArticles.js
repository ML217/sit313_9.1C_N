import React from 'react';
import { Card } from 'semantic-ui-react';
import ArticleCard from './ArticleCard';
import articles from '../data/articles';

const FeaturedArticles = () => (
  <div style={{ padding: '2em' }}>
    <h2>Featured Articles</h2>
    <Card.Group itemsPerRow={3}>
      {articles.map((article, idx) => (
        <ArticleCard key={idx} article={article} />
      ))}
    </Card.Group>
  </div>
);
export default FeaturedArticles;