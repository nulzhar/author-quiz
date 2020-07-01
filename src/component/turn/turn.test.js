import React from 'react';
import ReactDOM from 'react-dom';
import App from '../../AuthorQuiz';
import Enzyme, {mount, shallow, render} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
Enzyme.configure({ adapter: new Adapter() });

const state = {
    turnData: {
      books: ['book1', 'book2', 'book3', 'book4', 'book5', 'book6'],
      author: {
        name: 'Charles Dickens',
        imageUrl: 'images/authors/charlesdickens.jpg',
        imageSource: 'Wikipedia Commons',
        books: ['Book1', 'book6']
      },
    },
    highlight: 'none'
  };

describe("when no answer has been selected", () => {
    let wrapper;
    beforeAll(() => {
        wrapper = mount(<App {...state} onAnswerSelected={() => { }} />);
    });

    it("Should have no background color", () => {
        // Assert
        expect(wrapper.find("div.row.turn").props().style.backgroundColor).toBe('');
    });
});

describe("when the wrong answer has been selected", () => {
    let wrapper;
    beforeAll(() => {
        wrapper = mount(<App {...(Object.assign({}, state, {highlight: 'wrong'}))} onAnswerSelected={() => { }} />);
    });

    it("Should have a red background color", () => {
        // Assert
        expect(wrapper.find("div.row.turn").props().style.backgroundColor).toBe('red');
    });
});

describe("when the correct answer has been selected", () => {
    let wrapper;
    beforeAll(() => {
        wrapper = mount(<App {...(Object.assign({}, state, {highlight: 'correct'}))} onAnswerSelected={() => { }} />);
    });

    it("Should have a green background color", () => {
        // Assert
        expect(wrapper.find("div.row.turn").props().style.backgroundColor).toBe('green');
    });
});


describe("when the first answer is selected", () => {
    let wrapper;
    let handleAnswerSelected = jest.fn();
    beforeAll(() => {
        wrapper = mount(<App {...state} onAnswerSelected={handleAnswerSelected} />);
        wrapper.find('.answer').first().simulate('click');
    });

    it("onAnswerSelected should be called", () => {
        // Assert
        expect(handleAnswerSelected).toHaveBeenCalled();
    });

    it("Should receive the Book1", () => {
        // Assert
        expect(handleAnswerSelected).toHaveBeenCalledWith("book1");
    }); 
});