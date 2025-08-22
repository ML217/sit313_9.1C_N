import React from 'react';
import { Card, Image, Rating } from 'semantic-ui-react';
import tutorials from '../data/tutorials';

const FeaturedTutorials = () => (
  <>
    <h2>Featured Tutorials</h2>
    <Card.Group itemsPerRow={3}>
      {tutorials.map((tutorial, index) => (
        <Card key={index}>
          <Image src={tutorial.image} wrapped ui={false} />
          <Card.Content>
            <Card.Header>{tutorial.title}</Card.Header>
            <Card.Description>{tutorial.description}</Card.Description>
          </Card.Content>
          <Card.Content extra>
            <Rating icon="star" defaultRating={tutorial.rating} maxRating={5} disabled />
            &nbsp; by {tutorial.username}
          </Card.Content>
        </Card>
      ))}
    </Card.Group>
  </>
);

export default FeaturedTutorials;