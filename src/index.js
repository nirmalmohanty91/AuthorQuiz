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

function getTurnData(authors) {
    const allBooks = authors.reduce((p, c, i) => {
        return p.concat(c.books);
    }, []);
    console.log('Turn Data:'+allBooks);
    const fourRandomBooks = shuffle(allBooks).slice(0, 4);
    const answer = sample(fourRandomBooks);
    return {
        books: fourRandomBooks,
        author: authors.find((author) => author.books.some((title) => title === answer))
    }


}



function reducer(state = { authors, turnData: getTurnData(authors), highlight: '' }, action) {

    switch (action.type) {
        case 'ANSWER_SELECTED':
            console.log(action, state.authors);
            const isCorrect = state.turnData.author.books.some((book) => book === action.answer);
            console.log(isCorrect);
            return Object.assign({}, state, { highlight: isCorrect ? 'correct' : 'wrong' });

        case 'CONTINUE':
            return Object.assign({}, state, { highlight: '', turnData: getTurnData(state.authors) });

        case 'ADD_AUTHOR':
            console.log(state.authors, action.author);
            console.log(state.authors.concat([action.author]));
            return Object.assign({}, state, { authors: state.authors.concat([action.author])});

        default:
            return state;

    }

}


let store = Redux.createStore(reducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());



// function App() {
//     return <ReactRedux.Provider store={store}><AuthorQuiz /></ReactRedux.Provider>;

// }

// const AuthorWrapper = withRouter(({ history }) => {
//     return <ReactRedux.Provider store={store}>
//         <AddAuthorForm onAddAuthor={(author) => {
//             authors.push(author);
//             history.push('/');

//         }} /></ReactRedux.Provider>;
// });

ReactDOM.render(<BrowserRouter>
<ReactRedux.Provider store={store}>
    <React.Fragment>
        <Route exact path="/" component={AuthorQuiz} />
        <Route path="/add" component={AddAuthorForm} />
    </React.Fragment>
    </ReactRedux.Provider>
</BrowserRouter>, document.getElementById('root'));


registerServiceWorker();
