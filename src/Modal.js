import React from "react"
import ReactDOM from "react-dom"
import {Modal, Button} from "react-bootstrap"

const EditModal = React.createClass({
  render() {
    return(
      {modalInstance}
    )
  }
})
const modalInstance = (
  <div className="static-modal">
  <Modal show={this.state.show} onHide{this.hideModal}>
      <Modal.Dialog>
        <Modal.Header>
          <Modal.Title>Edit Form</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <input id="descriptionEdit"/>
          <input id="creditEdit"/>
          <input id="debitEdit"/>

        </Modal.Body>

        <Modal.Footer>
          <Button>Close</Button>
          <Button bsStyle="primary">Save changes</Button>
        </Modal.Footer>

      </Modal.Dialog>
    </Modal>
  </div>
);

module.exports = EditModal;
ReactDOM.render(modalInstance, document.getElementById("root"));