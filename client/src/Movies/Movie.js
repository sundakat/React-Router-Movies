import React, { Component } from 'react';
import axios from 'axios';
import MovieCard from './MovieCard';

export default class Movie extends Component {
  constructor(props) {
    super(props)
    this.state = {
      movie: null
    }
  }

  componentDidMount() {
    // change this line to grab the id passed on the URL
    const id = this.props.match.params.id
    this.fetchMovie(id)
  }

  fetchMovie = (id) => {
    axios
      .get(`http://localhost:5000/api/movies/${id}`)
      .then((response) => {
        this.setState(() => ({ movie: response.data }))
      })
      .catch((error) => {
        console.error(error)
      })
  }

  componentWillReceiveProps(newProps) {
    if (this.props.match.params.id !== newProps.match.params.id) {
      this.fetchMovie(newProps.match.params.id)
    }
  }

  saveMovie = () => {
    const addToSavedList = this.props.addToSavedList
    if (!this.props.savedList.includes(this.state.movie) && this.props.match.params.id !== this.state.movie.id) {
      addToSavedList(this.state.movie)
    } else {
      return null
    }
  }

  render() {
    const movie = this.state.movie
    if (!movie) {
      return <div>Loading movie information...</div>
    } else {
      return (
        <div>
          <MovieCard
            key={movie.id}
            movie={movie}
            title={movie.title}
            director={movie.director}
            metascore={movie.metascore}
            stars={movie.stars}
            addToSavedList={this.saveMovie}
            clearList={this.props.clearList}
            savedList={this.props.savedList}
          />
        </div>
      )
    }
  }
}
