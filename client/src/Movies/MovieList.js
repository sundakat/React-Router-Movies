import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import MovieCard from './MovieCard';

export default class MovieList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      movies: []
    }
  }

  componentDidMount() {
    axios
      .get('http://localhost:5000/api/movies')
      .then((response) => {
        this.setState(() => ({ movies: response.data }))
      })
      .catch((error) => {
        console.error('Server Error', error)
      })
  }

  render() {
    return (
      <div className="movie-list">
        {this.state.movies.map((movie) => (
          <Link to={`/movies/${movie.id}`}>
            <MovieCard
              key={movie.id}
              movie={movie}
              title={movie.title}
              director={movie.director}
              metascore={movie.metascore}
              stars={movie.stars}
              addToSavedList={this.props.addToSavedList}
              clearList={this.props.clearList}
            />
          </Link>
        ))}
      </div>
    )
  }
}

