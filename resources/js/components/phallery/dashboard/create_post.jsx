import React, { Component } from "react";
import Modal from "react-bootstrap/Modal";

class CreatePost extends Component {
    render() {
        return (
            <React.Fragment>
                <button className="btn btn-outline-success my-3">
                    <span className="fa fa-plus-square"></span>
                    &nbsp;Create a post
                </button>

                <Modal
                    size="lg"
                    show={true}
                    onHide=""
                    ariaLabelledBy="create-post"
                    centered
                >
                    <Modal.Header closeButton className="bg-dark text-white">
                        <Modal.Title id="create-post">
                            <span class="fa fa-edit"></span>&nbsp;Create a post
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <form>
                            <div className="form-row">
                                <div className="form-group col-md-12">
                                    <label htmlFor="card-title">Post</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="card-title"
                                        placeholder="Card Title"
                                        onChange="{}"
                                        value="{}"
                                        maxLength={20}
                                        ariaDescribedBy="cardTitleHelpText"
                                    />
                                    <small
                                        id="cardTitleHelpText"
                                        className="form-text text-muted float-right"
                                    >
                                        {20}/20
                                    </small>
                                </div>
                            </div>

                            <div className="col-md-12 mx-auto text-center">
                                <button
                                    type="submit"
                                    className="btn btn-success"
                                    onClick="{}"
                                >
                                    <span class="fa fa-plus-square"></span>
                                    &nbsp; Create
                                </button>
                            </div>
                        </form>
                    </Modal.Body>
                </Modal>
            </React.Fragment>
        );
    }
}

export default CreatePost;
