import { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import api from "../../config/api";
import key from "../../config/key";

const Business = ({Refresh, setRefresh}) => {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleReview = (e) => {
        e.preventDefault();
        api.post("/post/business", {            
            name: document.getElementsByName("name")[0].value,
            type: document.getElementsByName("type")[0].value,
            category: document.getElementsByName("category")[0].value,
            email: document.getElementsByName("email")[0].value,
            phone: document.getElementsByName("phone")[0].value,
            website: document.getElementsByName("website")[0].value,
            opening: document.getElementsByName("opening")[0].value,
            closing: document.getElementsByName("closing")[0].value,
            address: document.getElementsByName("address")[0].value,
            latitute: document.getElementsByName("latitue")[0].value,
            longitude: document.getElementsByName("longitude")[0].value,
            price: document.getElementsByName("price")[0].value,
        }, {
            headers: {
                'Authorization': 'Bearer ' + key('get')
            }
        }).then((response) => {
            if(response.data.success !== false){
                alert('Account created');
                handleClose();
                setRefresh(!Refresh);
            }else{
                alert(response.data.message);
            }
        }).catch((error) => {
            alert(error.data.raw.message);
        });
    }
    return (
        <>
            <button className="btn btn-outline-primary btn-sm me-1" onClick={handleShow}>Create new business</button>

            <form onSubmit={handleReview}>
                <Modal show={show} onHide={handleClose} aria-labelledby="contained-modal-title-vcenter" centered>
                    <Modal.Header closeButton>
                        <Modal.Title>New Business</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <input className="form-control mb-2" name="name" placeholder="Name" type="text"/>
                        <input className="form-control mb-2" name="type" placeholder="Term" type="text"/>
                        <input className="form-control mb-2" name="category" placeholder="Category" type="text"/>
                        <input className="form-control mb-2" name="email" placeholder="Email" type="email"/>
                        <input className="form-control mb-2" name="phone" placeholder="Phone" type="text"/>
                        <input className="form-control mb-2" name="website" placeholder="Website" type="text"/>
                        <input className="form-control mb-2" name="opening" placeholder="Opening" type="time"/>
                        <input className="form-control mb-2" name="closing" placeholder="closing" type="time"/>
                        <textarea className="form-control mb-2" name="address" placeholder="Address" type="text"/>
                        <input className="form-control mb-2" name="latitue" placeholder="Latitute" type="text"/>
                        <input className="form-control mb-2" name="longitude" placeholder="Longitude" type="text"/>
                        <input className="form-control mb-2" name="price" placeholder="Price 1 - 4" type="number"/>
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

export default Business;