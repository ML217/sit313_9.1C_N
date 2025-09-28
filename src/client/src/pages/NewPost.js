import React, { useState } from 'react';
import { Controlled as CodeMirror } from 'react-codemirror2';
import ReactMarkdown from 'react-markdown';
import { db } from '../firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/material.css';
import 'codemirror/mode/markdown/markdown';

const NewPost = () => {
  const [abstract, setAbstract] = useState('');
  const [content, setContent] = useState('');
  const [postType, setPostType] = useState('question');
  const [imageUrl, setImageUrl] = useState('');
  const [tags, setTags] = useState('');
  const [preview, setPreview] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await addDoc(collection(db, 'posts'), {
        abstract,
        content,
        postType,
        imageUrl,
        tags: tags.split(',').map(tag => tag.trim()), // Store tags as array
        createdAt: serverTimestamp()
      });
      alert('Post submitted successfully!');
      setAbstract('');
      setContent('');
      setPostType('question');
      setImageUrl('');
      setTags('');
      setPreview(false);
    } catch (err) {
      console.error('Error submitting post:', err);
      alert('Failed to submit post.');
    }
  };

  return (
    <div className="new-post">
      <h2>Create New Post</h2>
      <form onSubmit={handleSubmit}>
        <label>Abstract:</label>
        <input
          type="text"
          value={abstract}
          onChange={(e) => setAbstract(e.target.value)}
          required
        />

        <label>Post Type:</label>
        <select value={postType} onChange={(e) => setPostType(e.target.value)}>
          <option value="question">Question</option>
          <option value="article">Article</option>
        </select>

        <label>Tags (comma-separated):</label>
        <input
          type="text"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
          placeholder="e.g. firebase, react, markdown"
        />

        <label>Image URL (optional):</label>
        <input
          type="text"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
        />

        <label>Content:</label>
        <CodeMirror
          value={content}
          options={{
            mode: 'markdown',
            theme: 'material',
            lineNumbers: true
          }}
          onBeforeChange={(editor, data, value) => {
            setContent(value);
          }}
        />

        <div style={{ margin: '10px 0' }}>
          <button type="button" onClick={() => setPreview(!preview)}>
            {preview ? 'Hide Preview' : 'Show Preview'}
          </button>
        </div>

        {preview && (
          <div className="preview">
            <h3>Markdown Preview:</h3>
            <ReactMarkdown>{content}</ReactMarkdown>
          </div>
        )}

        <button type="submit">Submit Post</button>
      </form>
    </div>
  );
};

export default NewPost;