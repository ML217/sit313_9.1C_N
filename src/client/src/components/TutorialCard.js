import React from 'react';
import { Card, Icon } from 'semantic-ui-react';

const TutorialCard = ({ tutorial }) => (
  <Card
    image={tutorial.image}
    header={tutorial.name}
    meta={tutorial.description}
    description={`by ${tutorial.username}`}
    extra={<><Icon name='star' color='yellow' /> {tutorial.rating}</>}
  />
);
export default TutorialCard;