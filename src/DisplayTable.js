import React from "react"
import ReactDOM from "react-dom"
import {post, get, ajax} from "jquery"
import Moment from "moment"


const DisplayTable = React.createClass({
  getInitialState() {
    return {
      data: null,
      totalD: 0,
      totalC: 0
    }
    
  },

  deleteInput(e) {
    e.persist();
    ajax(`/credits/${e.target.id}`, {method: 'DELETE'})
        .then(res => {
          console.log("TARGET",e.target);
          const newData = this.state.data.filter(dataElement => (e.target.id !== dataElement._id))
          this.setState({data: newData})
        })
    console.log("e.target.id:", e.target.id)
  },

  componentDidMount() {
        get("/credits")
        .then(res => {
          this.setState({data: res})
          console.log("res:", res);
          res.forEach(transactions => {
            this.setState({
              totalD: this.state.totalD+transactions.debit,
              totalC: this.state.totalC+transactions.credit
            })
          })
        })
        .catch(err => {
          console.log("err:", err)
        })

  },

  render() {
    let tableData;
    if (this.state.data){
      tableData = this.state.data.map((transactions, index) => {
      return(
        <tr key={index}>
          <td>{transactions.description}</td>
          <td>{transactions.credit}</td>
          <td>{transactions.debit}</td>
          <td>{Moment().format("MMMM Do YYYY, h:mm:ss a")}</td>
          <td><button id={transactions._id} onClick={this.deleteInput} className="deleteButton">Delete</button></td>
        </tr>
      )
    }
    )}

    console.log("state:", this.state)
    return (
      <table className="table">
        <tbody>
          <tr>
            <th>Description</th>
            <th>Credit</th>
            <th>Debit</th>
            <th>Time</th>
            <th>Delete</th>
          </tr>
          {tableData}
          <tr className="sumData">Total Funds: ${this.state.totalC-this.state.totalD}</tr>
        </tbody>
      </table>
    )
  }


});

module.exports = DisplayTable