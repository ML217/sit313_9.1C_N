import React from 'react';
import { Card } from 'semantic-ui-react';
import TutorialCard from './TutorialCard';
import tutorials from '../data/tutorials';

const FeaturedTutorials = () => (
  <div style={{ padding: '2em' }}>
    <h2>Featured Tutorials</h2>
    <Card.Group itemsPerRow={3}>
      {tutorials.map((tutorial, idx) => (
        <TutorialCard key={idx} tutorial={tutorial} />
      ))}
    </Card.Group>
  </div>
);
export default FeaturedTutorials;