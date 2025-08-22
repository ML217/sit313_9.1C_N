import React, { useState } from 'react';
import { Form, Radio, Input, TextArea, Button, Segment } from 'semantic-ui-react';

const PostForm = () => {
  const [postType, setPostType] = useState('');
  const [formData, setFormData] = useState({
    title: '',
    abstract: '',
    content: '',
    description: '',
    tags: ''
  });

  const handleChange = (e, { name, value }) => {
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = () => {
    console.log('Post submitted:', { postType, ...formData });
    alert(`Your ${postType} has been submitted!`);
  };

  return (
    <Segment>
      <h3>New Post</h3>
      
      <Form onSubmit={handleSubmit}>
        <Form.Field>
          <label>Select Post Type:</label>
          <Radio
            label="Question"
            name="postType"
            value="question"
            checked={postType === 'question'}
            onChange={() => setPostType('question')}
          />
          <Radio
            label="Article"
            name="postType"
            value="article"
            checked={postType === 'article'}
            onChange={() => setPostType('article')}
            style={{ marginLeft: '1em' }}
          />
        </Form.Field>

        <Segment>
          <strong>What do you want to ask or share</strong>
          <p>This section is designed based on the type of the post. It is rendered conditionally.</p >
        </Segment>

        {postType === 'question' && (
          <>
            <Form.Field
              control={Input}
              label="Title"
              placeholder="Start your question with how, what, why, etc."
              name="title"
              value={formData.title}
              onChange={handleChange}
            />
            <Form.Field
              control={TextArea}
              label="Describe your problem"
              name="description"
              value={formData.description}
              onChange={handleChange}
            />
          </>
        )}

        {postType === 'article' && (
          <>
            <Form.Field
              control={Input}
              label="Title"
              placeholder="Enter the article title"
              name="title"
              value={formData.title}
              onChange={handleChange}
            />
            <Form.Field
              control={Input}
              label="Abstract"
              name="abstract"
              value={formData.abstract}
              onChange={handleChange}
            />
            <Form.Field
              control={TextArea}
              label="Content"
              name="content"
              value={formData.content}
              onChange={handleChange}
            />
            <Form.Field
              control={Input}
              label="Tags"
              placeholder="e.g. React, Semantic UI"
              name="tags"
              value={formData.tags}
              onChange={handleChange}
            />
          </>
        )}

        <Button color="blue" type="submit">
          Post
        </Button>
      </Form>
    </Segment>
  );
};

export default PostForm;