import React from "react"
import ReactDOM from "react-dom"
import {post, get, ajax} from "jquery"
import Moment from "moment"
import {Modal, Button} from "react-bootstrap"
//import EditModal from "./Modal"


const DisplayTable = React.createClass({
  getInitialState() {
    return {
      data: null,
      totalD: 0,
      totalC: 0,
      editDescription: '',
      editCredit: 0,
      editDebit: 0,
      showEditForms: false,
      show: false
    }
    
  },

  editInput(transaction) {
    this.setState({
      editDescription: transaction.description, 
      editCredit: transaction.credit, 
      editDebit: transaction.debit, 
      show: true})
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
    let close = () => this.setState({show: false});
    let tableData;
    if (this.state.data){
      tableData = this.state.data.map((transactions, index) => {
      return(
        <tr key={index}>
          <td>{transactions.description}</td>
          <td>{transactions.credit}</td>
          <td>{transactions.debit}</td>
          <td>{Moment().format("MMMM Do YYYY, h:mm:ss a")}</td>
          <td><button id={transactions._id} onClick={this.deleteInput} className="deleteButton btn-danger">Delete</button></td>
          <td><button id={transactions._id} onClick={this.editInput.bind(null, transactions)} className="editButton">Edit</button></td>
        </tr>
      )
    }
    )}

    console.log("state:", this.state)
    return (
      <div>
        <table className="table">
          <tbody>
            <tr>
              <th>Description</th>
              <th>Credit</th>
              <th>Debit</th>
              <th>Time</th>
              <th>Delete</th>
              <th>Edit</th>
            </tr>
            {tableData}
            <tr className="sumData"><td>Total Funds: ${this.state.totalC-this.state.totalD}</td></tr>
          </tbody>
        </table>

        <Modal show={this.state.show} onHide={close}>
          <Modal.Header>
            <Modal.Title>Edit Form</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <input id="descriptionEdit" value={this.state.editDescription}/>
            <input id="creditEdit" value={this.state.editCredit}/>
            <input id="debitEdit" value={this.state.editDebit}/>

          </Modal.Body>

          <Modal.Footer>
            <Button onClick={close}>Close</Button>
            <Button bsStyle="primary">Save changes</Button>
          </Modal.Footer>

        </Modal>

      </div>
    )
  }



});

module.exports = DisplayTable