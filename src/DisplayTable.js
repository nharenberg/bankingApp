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
      show: false,
      descriptionEditTemp: null,
      creditEditTemp: null,
      debitEditTemp: null
    }
    
  },

  editInput(transaction) {
    //console.log("this:", this);
    console.log("transaction:", transaction);
    this.setState({
      editDescription: transaction.description, 
      editCredit: transaction.credit, 
      editDebit: transaction.debit, 
      show: true})
  },

  saveEdit() {
    console.log('this.state:', this.state);
    let newObj = {
      // description: '',
      // debit: null,
      // credit: null
    }
    if(this.state.descriptionEditTemp){
      newObj.description = this.state.descriptionEditTemp
    }
    if(this.state.creditEditTemp){
      newObj.credit = this.state.creditEditTemp
    }
    if(this.state.debitEditTemp){
      newObj.debit = this.state.debitEditTemp
    }
    console.log("newObj:", newObj);

    ajax({
      url: '',
      type: "PUT",
      data: newObj,
      success: (err, newData) => {
        console.log("data:", data);
      }
    })
  },

  deleteInput(e) {
    e.persist();
    ajax(`/credits/${e.target.id}`, {method: 'DELETE'})
        .then(res => {
          //console.log("TARGET",e.target);
          const newData = this.state.data.filter(dataElement => (e.target.id !== dataElement._id))
          this.setState({data: newData})
        })
    console.log("e.target.id:", e.target.id)
  },

  componentDidMount() {
        get("/credits")
        .then(res => {
          this.setState({data: res})
          //console.log("res:", res);
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

    //console.log("state:", this.state)
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
            <input onChange={(e) => {this.setState({descriptionEditTemp: e.target.value})}} id="descriptionEdit" placeholder={this.state.editDescription}/>
            <input onChange={(e) => {this.setState({creditEditTemp: e.target.value})}} id="creditEdit" placeholder={this.state.editCredit}/>
            <input onChange={(e) => {this.setState({debitEditTemp: e.target.value})}} id="debitEdit" placeholder={this.state.editDebit}/>

          </Modal.Body>

          <Modal.Footer>
            <Button onClick={close}>Close</Button>
            <Button onClick={this.saveEdit} bsStyle="primary">Save changes</Button>
          </Modal.Footer>

        </Modal>

      </div>
    )
  }



});

module.exports = DisplayTable