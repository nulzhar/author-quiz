import React from 'react';
import './bootstrap.min.css';

import './AuthorQuiz.css';
import Hero from './component/hero/hero';
import Turn from './component/turn/turn';
import Continue from './component/continue/continue';
import Footer from './component/footer/footer';
import { Link } from 'react-router-dom';

function AuthorQuiz({turnData, highlight, onAnswerSelected, onContinue}) {
  return (
    <div className="container-fluid">
      <Hero></Hero>
      <Turn {...turnData} highlight={highlight} onAnswerSelected={onAnswerSelected}></Turn>
      <Continue show={highlight === 'correct'} onContinue={onContinue}></Continue>
      <p>
        <Link to="/filipegmaia-blog/add">Add an Author</Link>
      </p>
      <Footer></Footer>
    </div>
  );
}

export default AuthorQuiz;
