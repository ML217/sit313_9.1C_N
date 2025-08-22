import React from 'react';
import { Card, Icon } from 'semantic-ui-react';

const ArticleCard = ({ article }) => (
  <Card
    image={article.image}
    header={article.name}
    meta={article.description}
    description={`by ${article.author}`}
    extra={<><Icon name='star' color='yellow' /> {article.rating}</>}
  />
);
export default ArticleCard;