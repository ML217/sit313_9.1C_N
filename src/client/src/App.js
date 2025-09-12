import React from 'react';
import {BrowserRouter as Router, Routes, Route, Link} from 'react-router-dom';
import Header from './components/Header';
import FeaturedArticles from './components/FeaturedArticles';
import FeaturedTutorials from './components/FeaturedTutorials';
import NewsletterSignup from './components/NewsletterSignup';
import Footer from './components/Footer';
import NewPost from './pages/NewPost';
import PostForm from './components/PostForm';
import Login from './pages/Login';
import Signup from './pages/Signup';
import LoginSignupPage from './pages/Login';


function App() {
 return (
   <Router>
     <div>
         <Header />
           < img src="https://images.pexels.com/photos/1109541/pexels-photo-1109541.jpeg"
              alt="Banner"
              style={{ width: '100%' }}
   />

    <Routes>
     <Route path="/" element={
      <>
    <FeaturedArticles />
    <FeaturedTutorials />
    <NewsletterSignup />
 </>
 } />
 
     <Route path="/post" element={<PostForm />} />
     <Route path="/login" element={<Login/>} />
     <Route path="/signup" element={< Signup/>} />

      </Routes>

       <Footer />
     </div>
   </Router>
 );
}

export default App;