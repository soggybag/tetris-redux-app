import React, { Component } from 'react';
import { connect } from 'react-redux';
import '../index.css';

class Footer extends Component {
    // constructor(props) {
    //     super(props)
    //     this.state = { name: "" }
    // }

    render() {
        return (
            <footer class="page-footer">
                <div class="footer-container">
                    <div>
                        <h1>Links</h1>
                        <p class="grey-text text-lighten-4">Like this game? Find out more about the history</p>
                        <ul>
                        <li><a href="https://en.wikipedia.org/wiki/Tetris">The history of Tetris</a></li>
                        <li><a href="https://www.youtube.com/watch?v=_fQtxKmgJC8">Tetris Documentary</a></li>
                        <li><a href="https://mentalfloss.com/article/85866/5-fun-facts-about-tetris">Tetris Trivia</a></li>
                        <li><a href="https://www.youtube.com/watch?v=ViwDUiCzPVU">Tetris: The Grandmaster Showcase AGDQ</a></li>
                        </ul>
                    </div>
                    <div class="row">
                        <p class="grey-text text-lighten-4">Or help contribute to the project</p>
                        <ul>
                        <li><a href="https://reactjs.org/">Created with React</a></li>
                        <li><a href="https://react-redux.js.org/">and Redux</a></li>
                        <li><a href="https://github.com/MakeSchool-Tutorials/web-7-react-redux-tetris-app">Tutorial to make this game</a></li>
                        <li><a href="https://github.com/soggybag/tetris-redux-app/issues">Want to contribute to this project?</a></li>
                        <li><a href="https://github.com/soggybag/tetris-redux-app">Link to this repo</a></li>
                        </ul>
                    </div>
                </div>
            </footer>
        )
    }
}
export default Footer;