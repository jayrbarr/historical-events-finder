import React from 'react';
import ReactDOM from 'react-dom';
import SearchForm from './SearchForm.jsx';

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      term: '',
    };
  }

  handleChange(e) {
    this.setState({
      term: e.target.value,
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    console.log('Submit: ' + this.state.term);
    fetch(`http://localhost:3000/events?q=${this.state.term}`)
    .then(response => response.json())
    .then(data => 
        this.setState({
          term: '',
          data,
        }));
  }

  render() {
    const data = this.state.data.map((obj, i) => (
      <ul key={i.toString()}>
        <li>date: {obj.date}</li>
        <li>description: {obj.description}</li>
        <li>category1: {obj.category1}</li>
        <li>category2: {obj.category2}</li>
        <li>granulariy: {obj.granularity}</li>
      </ul>
    ) )
    return (
      <div>
        <SearchForm handleSubmit={(e)=>this.handleSubmit(e)} term={this.state.term} handleChange={(e)=>this.handleChange(e)} />
        <div>{data}</div>
      </div>
    );
  }
}

function start() {
  ReactDOM.render( <Search />, document.getElementById('app')
  );
}

start();
