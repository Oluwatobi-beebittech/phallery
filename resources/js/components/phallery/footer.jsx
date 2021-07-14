import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";

function Footer() {
    const [showModal, setShowModal] = useState(false);
    return (
        <section className="h-9 bg-orange-img">
            <div className="bg-dark-trans h-9">
                <div className="container ">
                    <div className="row">
                        <div className="col-12 text-center">
                            <a
                                href="mailto:akanjioluwatobishadrach@yahoo.com"
                                className="btn btn-lg text-white"
                                rel="noopener"
                                target="_blank"
                            >
                                <span className="fas fa-envelope fa-2x"></span>
                            </a>
                            <a
                                href="https://www.linkedin.com/in/oluwatobiakanji/"
                                className="btn btn-lg text-white"
                                rel="noopener"
                                target="_blank"
                            >
                                <span className="fab fa-linkedin fa-2x"></span>
                            </a>
                            <a
                                href="https://github.com/Oluwatobi-beebittech"
                                className="btn btn-lg text-white"
                                rel="noopener"
                                target="_blank"
                            >
                                <span className="fab fa-github fa-2x"></span>
                            </a>
                            <a
                                href=""
                                className="btn btn-sm btn-outline-dark text-white"
                                rel="noopener"
                                target="_blank"
                                onClick={e => {
                                    e.preventDefault();
                                    setShowModal(true);
                                }}
                            >
                                <span className="fa fa-info-circle"> </span>
                                &nbsp;Image Credits
                            </a>
                        </div>
                    </div>
                </div>
            </div>

            <Modal
                size="lg"
                show={showModal}
                onHide={() => setShowModal(false)}
                aria-labelledby="image-credits"
                centered
            >
                <Modal.Header closeButton className="bg-dark text-white">
                    <Modal.Title id="image-credits">
                        <span className="fa fa-image"></span>&nbsp;Image Credits
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body></Modal.Body>
            </Modal>
        </section>
    );
}

export default Footer;
