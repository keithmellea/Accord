import React, { useState } from "react";
import Modal from '@material-ui/core/Modal';

import './About.css'

const About = () => {
    const [open, setOpen] = useState(false);

    // functions to handle opening and closing modal
    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div>
            <Modal
                open={open}
                onClose={handleClose}
            >
                <div id="modal-devs">
                    <h1>Developers</h1>
                    <div className="developer-grid">
                        <div className="developer-card">
                            <p className="developer-name">Keith Mellea</p>
                            <a className="dev_link" href="https://github.com/keithmellea"><i class="fab fa-github"></i> GitHub</a>
                            <a className="dev_link" href="https://www.linkedin.com/in/keith-mellea-8b9b13a6/"><i class="fab fa-linkedin"></i> LinkedIn</a>
                        </div>
                        <div className="developer-card">
                            <p className="developer-name">Hector Crespo</p>
                            <a className="dev_link" href="https://github.com/crespohector"><i class="fab fa-github"></i> GitHub</a>
                            <a className="dev_link" href="https://www.linkedin.com/in/hector-crespo-b0b5b019a/"><i class="fab fa-linkedin"></i> LinkedIn</a>
                            <a className="dev_link" href="https://crespohector.github.io/">Portfolio</a>
                        </div>
                        <div className="developer-card">
                            <p className="developer-name">Hieu Ma</p>
                            <a className="dev_link" href="https://github.com/Hieu-Ma"><i class="fab fa-github"></i> GitHub</a>
                            <a className="dev_link" href="https://www.linkedin.com/in/hieu-ma/"><i class="fab fa-linkedin"></i> LinkedIn</a>
                            <a className="dev_link" href="https://hieu-ma.github.io/">Portfolio</a>
                        </div>
                        <div className="developer-card">
                            <p className="developer-name">Jose Solis</p>
                            <a className="dev_link" href="https://github.com/Tonomatic"><i class="fab fa-github"></i> GitHub</a>
                            <a className="dev_link" href="https://www.linkedin.com/in/jose-solis-17940b71/"><i class="fab fa-linkedin"></i> LinkedIn</a>
                            <a className="dev_link" href="https://tonomatic.github.io/">Portfolio</a>
                        </div>
                    </div>
                    
                    <div>
                        <a className="project_repo-link" href="https://github.com/keithmellea/Accord"><i class="fab fa-github"></i></a>
                    </div>
                </div>
            </Modal>
            <span className="about_span" onClick={handleOpen}>About</span>
        </div>
    );
};

export default About;
