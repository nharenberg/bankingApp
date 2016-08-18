import React from "react"
import ReactDOM from "react-dom"
import {post, get} from "jquery"
//import EditModal from "./Modal"

const InputForm = React.createClass({

getInitialState() {
    return {
      description: '',
      credit: '',
      debit: ''
    }
  },
  submitForm(e) {
    e.preventDefault();
    console.log("state:", this.state);
    post("/credits", this.state)
      .then(res => {
        console.log("res", res)
      })
      .catch(err => {
        console.log("err:", err)
      })
    this.setState({
      description: '',
      credit: '',
      debit: ''
      })
  },
  render() {
    return (
      <div>

        <h1>Banking App</h1>
        <div id= "newTransInput">
          <form id= "newTransForm" onSubmit= {this.submitForm}>
            <input value={this.state.description} onChange={e => this.setState({description: e.target.value})} type="text" id="description" placeholder="Description"/>
            <input value={this.state.credit} onChange={e => this.setState({credit: e.target.value})} type="number" id="creditInput" placeholder="Credit"/>
            <input value={this.state.debit} onChange={e => this.setState({debit: e.target.value})} type="number" id="debititInput" placeholder="Debit"/>
            <br />
            <button className ="btn btn-primary transferButton">Transfer Funds</button>
          </form>
        </div>
        <br />
      </div>
    )
  }
});
module.exports = InputForm