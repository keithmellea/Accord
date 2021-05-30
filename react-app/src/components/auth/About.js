import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Redirect, NavLink, Link } from "react-router-dom";
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
                <div id="modal">
                    <h1>Developers</h1>
                    <div className="developer-grid">
                        <div className="developer-card">
                            <p className="developer-name">Keith Mellea</p>
                            <a href="https://github.com/keithmellea">
                            <i class="fab fa-github-square"></i>GitHub</a>
                        </div>
                        <div className="developer-card">
                            <p className="developer-name">Hector Crespo</p>
                            <a href="https://github.com/crespohector">GitHub</a>
                        </div>
                        <div className="developer-card">
                            <p className="developer-name">Hieu Ma</p>
                            <a href="https://github.com/Hieu-Ma">GitHub</a>
                        </div>
                        <div className="developer-card">
                            <p className="developer-name">Jose Solis</p>
                            <a href="https://github.com/Tonomatic">GitHub</a>
                        </div>
                    </div>
                </div>
            </Modal>

            <span className="about_span" onClick={handleOpen}>About</span>
        </div>
    );
};

export default About;
