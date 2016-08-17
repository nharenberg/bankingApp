import React from "react"
import ReactDOM from "react-dom"
import {post, get} from "jquery"


const DisplayTable = React.createClass({
  componentDidMount() {
    get("/credits")
        .then(res => {
          console.log("res", res)
        })
        .catch(err => {
          console.log("err:", err)
        })
  }

  
  render() {
    return (
      <table>
        <tr>
          <th>Description</th>
          <th>Credit</th>
          <th>Debit</th>
          <th>Time</th>
          <th>Edit</th>
          <th>Delete</th>
        </tr>
      </table>
    )
  }


});

module.exports = DisplayTable