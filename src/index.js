import React from "react"
import ReactDOM from "react-dom"
import {post, get} from "jquery"
import InputForm  from "./InputForm"
import DisplayTable from "./DisplayTable"

const App = React.createClass({
  render() {
    return (
      <div>
      <InputForm />
      <DisplayTable />
      </div>
    )
  }
})


ReactDOM.render(
  <App />,

  document.getElementById("root")
);