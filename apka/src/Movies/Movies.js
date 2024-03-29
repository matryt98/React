import React, { Component } from "react";
import axios from "axios";
import "../Styles/App.css";
import "../Styles/Table.css"

axios.defaults.baseURL = "http://localhost:7777/";

class Movies extends Component {
  constructor(props) {
    super(props);
    this.state = {
      MoviesList: []
    };
    this.getMovies = this.getMovies.bind(this);
  }

  componentDidMount = () => {
    this.getMovies();
  }

    async getMovies () {
      await axios.get("/movies")
      .then((response)=>{
        console.log("response",response.data);

        this.setState({
          MoviesList: response.data
        })
      })
      .catch((error)=>{
        console.log("error",error)
      })
  }

    async deleteClick (id) {
    
    await this.props.deleteMovie(id).then(
     window.location.reload());
    
  }

  render(){
    let movies = this.state.MoviesList;
    return(
      <div className="App">
        <h1>Filmy</h1>
        <table className="t-table">
          <tbody>
          <tr>
            <th>Tytuł</th>
            <th>Czas trwania (h)</th>
            <th>Opis</th>
            <th></th>
            <th></th>
          </tr>
          {movies.map((x,key)=>{
            return(
              <tr key={key}>
                <td>{x.title}</td>
                <td>{x.duration}</td>
                <td>{x.description}</td>
                <td>
                  <a href={"/editmovie/"+x.id}>Edytuj</a>
                </td>
                <td>
                  <i className="delete-icon" onClick={this.deleteClick.bind(this, x.id)}/>
                </td>
              </tr>
            )})
          }
          </tbody>
        </table>
        <a href={"/addmovie/"}><button className="App-button">Dodaj</button></a>
      </div>
    );
  }
}
export default Movies;