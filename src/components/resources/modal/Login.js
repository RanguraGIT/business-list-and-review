import { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import api from "../../config/api";
import key from "../../config/key";

const Login = ({setLogin}) => {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const login = (e) => {
        e.preventDefault();
        api.post("/post/login", {
            email: document.getElementsByName("email")[0].value,
            password: document.getElementsByName("password")[0].value,
        })
        .then((response) => {
            key(response.data.raw.token);
            setLogin(true);
            handleClose();
        })
        .catch((error) => {
            setLogin(false);
            alert(error.data.message);
        });
    }

    return (
        <>
            <button className="btn btn-outline-primary btn-sm me-1" onClick={handleShow}>Login</button>

            <form onSubmit={login}>
                <Modal show={show} onHide={handleClose} aria-labelledby="contained-modal-title-vcenter" centered>
                    <Modal.Header closeButton>
                        <Modal.Title>Login</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <input className="form-control mb-2" name="email" placeholder="Email" type="text" aria-label="Search"/>
                        <input className="form-control" name="password" placeholder="Password" type="password" aria-label="Search"/>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>Close</Button>
                        <Button variant="primary" onClick={login}>Login</Button>
                    </Modal.Footer>
                </Modal>
            </form>
        </>
    );
}

export default Login;