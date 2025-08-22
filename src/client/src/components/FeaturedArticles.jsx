import React from 'react';
import { Card, Image, Rating } from 'semantic-ui-react';
import articles from '../data/articles';

const FeaturedArticles = () => (
  <>
    <h2>Featured Articles</h2>
    <Card.Group itemsPerRow={3}>
      {articles.map((article, index) => (
        <Card key={index}>
          <Image src={article.image} wrapped ui={false} />
          <Card.Content>
            <Card.Header>{article.title}</Card.Header>
            <Card.Description>{article.description}</Card.Description>
          </Card.Content>
          <Card.Content extra>
            <Rating icon="star" defaultRating={article.rating} maxRating={5} disabled />
            &nbsp; by {article.author}
          </Card.Content>
        </Card>
      ))}
    </Card.Group>
  </>
);

export default FeaturedArticles;