import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, withRouter } from 'react-router-dom';
import {shuffle, sample} from 'underscore';
import './index.css';
import AuthorQuiz from './AuthorQuiz';
import AddAuthorForm from './component/add-author-form/add-author-form';
import * as serviceWorker from './serviceWorker';

const authors = [
  {
    name: 'Mark Twain',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0c/Mark_Twain_by_AF_Bradley.jpg/375px-Mark_Twain_by_AF_Bradley.jpg',
    imageSource: 'Wikipedia Commons',
    books: ['The Adventures of Huckleberry Finn',
            'Sandstorm',
            'Riverdale']
  },
  {
    name: 'Stephen King',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e3/Stephen_King%2C_Comicon.jpg/330px-Stephen_King%2C_Comicon.jpg',
    imageSource: 'Wikipedia Commons',
    books: ['It',
            'Book 2',
            'Lord of Rings']
  },
  {
    name: 'J. K. Rowling',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/fb/%C3%8Domha_J.K._Rowling.jpg/300px-%C3%8Domha_J.K._Rowling.jpg',
    imageSource: 'Wikipedia Commons',
    books: ['Barak Obama history',
            'Blackfield',
            'Harry Potter']
  }

];

function getTurnData(authors) {
  const allBooks = authors.reduce( function (p, c, i) {
    return p.concat(c.books);
  }, []);
  const fourRandomBooks = shuffle(allBooks).slice(0,3);
  const answer = sample(fourRandomBooks);

  return {
    books: fourRandomBooks,
    author: authors.find((author) =>
      author.books.some((title) => title === answer))
  }
}

let state = resetState();

function resetState() {
  return {
    turnData: getTurnData(authors),
    highlight: ''
  };
};

function onAnswerSelected(answer) {
  const isCorrect = state.turnData.author.books.some((book) => book === answer);
  state.highlight = isCorrect ? 'correct' : 'wrong';
  render();
}

function App() {
  return <AuthorQuiz {...state} onAnswerSelected={onAnswerSelected} onContinue={() => {
    state = resetState();
    render();
  }}/>;
}

const AuthorWrapper = withRouter(({ history }) => 
  <AddAuthorForm onAddAuthor={(author) => {
    authors.push(author);
    history.push('/');
  }} />
);

function render() {
  ReactDOM.render(
    <React.StrictMode>
      <BrowserRouter>
        <Route exact path="/filipegmaia-blog" component={App}></Route>        
        <Route path="/filipegmaia-blog/add" component={AuthorWrapper}></Route>
      </BrowserRouter>
    </React.StrictMode>,
    document.getElementById('root')
  );
}

render();
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
