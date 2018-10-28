import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, withRouter } from 'react-router-dom';
import './index.css';
import AuthorQuiz from './AuthorQuiz';
import registerServiceWorker from './registerServiceWorker';
import { shuffle, sample } from 'underscore';
import AddAuthorForm from './AddAuthorForm';
import * as Redux from 'redux';
import * as ReactRedux from 'react-redux';
const authors = [
    {
        name: 'JK Rowling',
        imageUrl: 'images/authors/Jk_Rowling.jpg',
        imageSource: 'Google',
        books: ['Harry Potter and the Goblet of Fire']
    },
    {
        name: 'George RR Martin',
        imageUrl: 'images/authors/george_rr_martin.jpg',
        imageSource: 'Google',
        books: ['Game of Thrones:The Battle of Bastards']
    },
    {
        name: 'Dalton Trumbo',
        imageUrl: 'images/authors/Dalton_Trumbo.jpg',
        imageSource: 'Google',
        books: ['Spartacus:The war of damned', 'Gladiator: Vengeance']
    },
    {
        name: 'JRR Tolkein',
        imageUrl: 'images/authors/jrr_tolkien.jpeg',
        imageSource: 'Google',
        books: ['The Hobbit', 'The Children of Hurin']
    }
];

function getTurnData() {
    const allBooks = authors.reduce((p, c, i) => {
        //console.log(p+c+i+"------");
        return p.concat(c.books);
    }, []);
    const fourRandomBooks = shuffle(allBooks).slice(0, 4);
    const answer = sample(fourRandomBooks);
    return {
        books: fourRandomBooks,
        author: authors.find((author) => author.books.some((title) => title === answer))
    }


}

function resetState() {
    return {
        turnData: getTurnData(authors),
        highlight: ''
    };
}
// const state = {
//     turnData: getTurnData(authors),
//     highlight: ''
// }

let state = resetState();

function onAnswerSelected(answer) {
    const isCorrect = state.turnData.author.books.some((book) => book === answer);
    state.highlight = isCorrect ? 'correct' : 'wrong';
    render();
}


function App() {
    return <AuthorQuiz {...state} onAnswerSelected={onAnswerSelected} onContinue={() => {
        state = resetState();
        render();
    }} />;

}

const AuthorWrapper = withRouter(({ history }) => {
    return <AddAuthorForm onAddAuthor={(author) => {
        authors.push(author);
        history.push('/');

    }} />;
});

function render() {
    ReactDOM.render(<BrowserRouter>
        <React.Fragment>
            <Route exact path="/" component={App} />
            <Route path="/add" component={AuthorWrapper} />
        </React.Fragment>
    </BrowserRouter>, document.getElementById('root'));
}

render();

registerServiceWorker();
