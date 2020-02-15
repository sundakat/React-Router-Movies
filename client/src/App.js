import React, { Component } from 'react';

import SavedList from './Movies/SavedList';
import MovieList from './Movies/MovieList';
import Movie from './Movies/Movie';
import { Route } from 'react-router-dom';

export default class App extends Component {
  constructor() {
    super()
    this.state = {
      savedList: []
    }
  }

  addToSavedList = (movie) => {
    let savedList = this.state.savedList
    if (!savedList.includes(movie)) {
      savedList.push(movie)
      this.setState({ savedList })
    }
  }

  clearList = () => {
    this.setState({
      savedList: []
    })
  }

  render() {
    return (
      <div>
        <SavedList list={this.state.savedList} clearList={this.clearList} />
        <Route exact path="/" component={MovieList} />
        <Route
          path="/movies/:id"
          render={(props) => (
            <Movie
              {...props}
              addToSavedList={(movie) => { this.addToSavedList(movie) }}
              savedList={this.state.savedList}
              clearList={this.clearList}
            />
          )}
        />
      </div>
    )
  }
}
