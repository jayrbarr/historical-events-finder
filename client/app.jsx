import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import ReactPaginate from 'react-paginate';
import $ from 'jquery';
import SearchForm from './SearchForm.jsx';

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      term: '',
      offset: 0,
      limit: 5,
    };
  }

  handleChange(e) {
    this.setState({
      term: e.target.value,
    });
  }

  loadEvents() {
    fetch(`http://localhost:3000/events?q=${this.state.term}&_start=${this.state.offset}&_limit=${this.state.limit}`)
    .then(response => {
      const pages = response.headers.get("X-Total-Count");
      this.setState({
        pageCount: Math.ceil( pages / this.state.limit ),
      });
      return response.json();
    })
    .then(data => 
        this.setState({
          term: '',
          data,
        }));
    // $.ajax({
    //   url: 'http://localhost:3000/events',
    //   data: {
    //     _limit: this.props.limit,
    //     _start: this.state.offset,
    //     q: this.state.term,
    //   },
    //   dataType: 'json',
    //   type: 'GET',
    //   success: data => {
    //     this.setState({
    //       data: data,
    //       pageCount: Math.ceil(data.meta.total_count / data.meta.limit),
    //     });
    //   },
    //   error: (xhr, status, err) => {
    //     console.error(this.props.url, status, err.toString()); // eslint-disable-line
    //   },
    // });
  }


  handleSubmit(e) {
    e.preventDefault();
    this.loadEvents();
  }

  handlePageClick(data) {
    let selected = data.selected;
    let offset = Math.ceil(selected * this.state.limit);

    this.setState({ offset }, () => {
      this.loadEvents();
    });
  }

  render() {
    const data = this.state.data.map((obj, i) => (
      <ul key={i.toString()}>
        <li>date: {obj.date}</li>
        <li>description: {obj.description}</li>
        <li>category1: {obj.category1}</li>
        <li>category2: {obj.category2}</li>
        <li>granularity: {obj.granularity}</li>
      </ul>
    ) )
    return (
      <div>
        <SearchForm handleSubmit={(e)=>this.handleSubmit(e)} term={this.state.term} handleChange={(e)=>this.handleChange(e)} />
        <div>{data}</div>
        <ReactPaginate
          previousLabel={'previous'}
          nextLabel={'next'}
          breakLabel={'...'}
          breakClassName={'break-me'}
          pageCount={this.state.pageCount}
          marginPagesDisplayed={2}
          pageRangeDisplayed={5}
          onPageChange={(e)=>this.handlePageClick(e)}
          containerClassName={'pagination'}
          subContainerClassName={'pages pagination'}
          activeClassName={'active'}
        />
      </div>
    );
  }
}

function start() {
  ReactDOM.render( <Search />, document.getElementById('app')
  );
}

start();
