import { useState } from "react";
import { ButtonGroup, Dropdown } from "react-bootstrap";
import { FaRegStar, FaStar } from "react-icons/fa";

function Filter({Order, setOrder, Rating, setRating, Price, setPrice}){
    const [DisplayOrder, setDisplayOrder] = useState('Distance');
    const handleOrder = (item, display) => {
        setDisplayOrder(display);
        setOrder(item);
    }

    const [DisplayRating, setDisplayRating] = useState(null);
    const handleRating = (item) => {
        setDisplayRating(item ? ': ' + item : item);
        setRating(item);
    }

    const [DisplayPrice, setDisplayPrice] = useState(null);
    const handlePrice = (item) => {
        setDisplayPrice(price(item));
        setPrice(item);
    }

    const price = (item) => {
        switch(item){
            case '1':
                return ': $';
            case '2':
                return ': $$';
            case '3':
                return ': $$$';
            case '4':
                return ': $$$$';
            default:
                return null;
        }
    }

    return (
        <div className="d-flex flex-row bd-highlight me-auto">
            <Dropdown
                as={ButtonGroup}
                size="sm"
                variant="secondary"
                className="mx-1"
            >
                <Dropdown.Toggle variant="success" id="dropdown-basic">
                    Sort : {DisplayOrder} <i className="fas fa-caret-down"></i>
                </Dropdown.Toggle>

                <Dropdown.Menu>
                    <Dropdown.Item onClick={() => handleOrder('relevant', 'Relevant')} key={1}>Relevant</Dropdown.Item>
                    <Dropdown.Item onClick={() => handleOrder('distance', 'Distance')} key={2}>Distance</Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>

            <Dropdown
                as={ButtonGroup}
                size="sm"
                variant="secondary"
                className="mx-1"
            >
                <Dropdown.Toggle variant="success" id="dropdown-basic">
                    Rating {DisplayRating} <i className="fas fa-caret-down"></i>
                </Dropdown.Toggle>

                <Dropdown.Menu>
                    <Dropdown.Item onClick={() => handleRating(null)}  key={0}><FaRegStar /></Dropdown.Item>
                    <Dropdown.Item onClick={() => handleRating('1')}  key={1}><FaStar /></Dropdown.Item>
                    <Dropdown.Item onClick={() => handleRating('2')}  key={2}><FaStar /><FaStar /></Dropdown.Item>
                    <Dropdown.Item onClick={() => handleRating('3')}  key={3}><FaStar /><FaStar /><FaStar /></Dropdown.Item>
                    <Dropdown.Item onClick={() => handleRating('4')}  key={4}><FaStar /><FaStar /><FaStar /><FaStar /></Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>

            <Dropdown
                as={ButtonGroup}
                size="sm"
                variant="secondary"
                className="mx-1"
            >
                <Dropdown.Toggle variant="success" id="dropdown-basic">
                    Price {DisplayPrice}<i className="fas fa-caret-down"></i>
                </Dropdown.Toggle>

                <Dropdown.Menu>
                    <Dropdown.Item onClick={() => handlePrice('1')} key={1}>$</Dropdown.Item>
                    <Dropdown.Item onClick={() => handlePrice('2')} key={2}>$$</Dropdown.Item>
                    <Dropdown.Item onClick={() => handlePrice('3')} key={3}>$$$</Dropdown.Item>
                    <Dropdown.Item onClick={() => handlePrice('4')} key={4}>$$$$</Dropdown.Item>
                    <Dropdown.Item onClick={() => handlePrice(null)} key={0}>$ - $$$$</Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
        </div>
    )
}

export default Filter;