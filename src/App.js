import React from 'react';
import Header from './components/Header';
import FeaturedArticles from './components/FeaturedArticles';
import FeaturedTutorials from './components/FeaturedTutorials';
import NewsletterSignup from './components/NewsletterSignup';
import Footer from './components/Footer';

function App() {
  return (
    <div>
      <Header />
      < img src="https://picsum.photos/800/200" alt="Banner" style={{ width: '100%' }} />
      <FeaturedArticles />
      <FeaturedTutorials />
      <NewsletterSignup />
      <Footer />
    </div>
  );
}

export default App;
