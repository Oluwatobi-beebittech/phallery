import React from "react";

function Footer() {
    return (
        <section className="h-9 bg-orange-img">
            <div className="bg-dark-trans h-9">
                <div className="container ">
                    <div className="row">
                        <div className="col-12 text-center">
                            <a
                                href=""
                                className="btn btn-lg text-white"
                                rel="noopener"
                                target="_blank"
                            >
                                <span className="fab fa-facebook fa-2x"></span>
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
                            >
                                <span className="fa fa-info-circle"> </span>
                                &nbsp;Image Credits
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Footer;
