import { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import api from "../../config/api";
import key from "../../config/key";

const Review = ({Id, Refresh, setRefresh}) => {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleReview = (e) => {
        e.preventDefault();
        api.post("/post/rating", {
            business: Id,
            rating: document.getElementsByName("rating")[0].value,
            review: document.getElementsByName("review")[0].value,
        },{
            headers: {
                'Authorization': 'Bearer ' + key('get')
            }
        }).then(() => {
            alert('Review submitted');
            setRefresh(!Refresh);
            handleClose();
        }).catch((error) => {
            alert(error.data.message);
        });
    }
    return (
        <>
            <button className="badge bg-success mt-1" onClick={handleShow}>Write a Review</button>

            <form onSubmit={handleReview}>
                <Modal show={show} onHide={handleClose} aria-labelledby="contained-modal-title-vcenter" centered>
                    <Modal.Header closeButton>
                        <Modal.Title>Cuurrent location is required</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <input className="form-control mb-2" name="rating" placeholder="Rating 1 - 5" type="number" aria-label="Search"/>
                        <textarea className="form-control" name="review" placeholder="Review" type="text" aria-label="Search"/>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>Close</Button>
                        <Button variant="primary" onClick={handleReview}>Confirm</Button>
                    </Modal.Footer>
                </Modal>
            </form>
        </>
    );
}

export default Review;