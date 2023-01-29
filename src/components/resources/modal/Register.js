import { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import api from "../../config/api";

const Register = () => {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleReview = (e) => {
        e.preventDefault();
        api.post("/post/user", {
            name: document.getElementsByName("name")[0].value,
            email: document.getElementsByName("email")[0].value,
            password: document.getElementsByName("password")[0].value,
        }).then((response) => {
            if(response.data.success !== false){
                alert('Account created');
                handleClose();
            }else{
                alert(response.data.message);
            }
        }).catch((error) => {
            alert(error.data.raw.message);
        });
    }
    return (
        <>
            <button className="btn btn-outline-secondary btn-sm me-1" onClick={handleShow}>Register</button>

            <form onSubmit={handleReview}>
                <Modal show={show} onHide={handleClose} aria-labelledby="contained-modal-title-vcenter" centered>
                    <Modal.Header closeButton>
                        <Modal.Title>Register account</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <input className="form-control mb-2" name="name" placeholder="Name" type="text"/>
                        <input className="form-control mb-2" name="email" placeholder="Email" type="text"/>
                        <input className="form-control mb-2" name="password" placeholder="Min 8 character, 1 number" type="password"/>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>Close</Button>
                        <Button variant="primary" onClick={handleReview}>Submit</Button>
                    </Modal.Footer>
                </Modal>
            </form>
        </>
    );
}

export default Register;