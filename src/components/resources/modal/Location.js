import { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { FaMapMarkedAlt } from "react-icons/fa";

const Location = ({setLocation}) => {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    function getCurrentLocation() {
        navigator.geolocation.getCurrentPosition(function(position) {
            setLocation({ lat: position.coords.latitude, lng: position.coords.longitude });
            handleClose();
        }, function(error){
            handleClose();
        }, {timeout:10000});
    }

    return (
        <>
            <Button variant="primary" onClick={handleShow} className="me-1">
                <FaMapMarkedAlt />
            </Button>

            <Modal show={show} onHide={handleClose} aria-labelledby="contained-modal-title-vcenter" centered>
                <Modal.Header closeButton>
                    <Modal.Title>Cuurrent location is required</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>We need your location to provide better service. Would you like to share your location?</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>Close</Button>
                    <Button variant="primary" onClick={getCurrentLocation}>Confirm</Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default Location;