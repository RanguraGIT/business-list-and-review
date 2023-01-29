import { Card, Carousel } from "react-bootstrap";
import { FaComment, FaDirections, FaDollarSign, FaLink, FaMapMarkedAlt, FaPhoneSquareAlt, FaRegStar, FaStar, FaStarHalfAlt } from "react-icons/fa";
import Review from "./modal/Review";

function resCard({Id, Title, Open, Rating, Price, DataReview, Address, Distance, Website, Phone, Image, Refresh, setRefresh, Login}) {
    let rating = {
        1: <><FaStar /></>, 
        1.5: <><FaStar /><FaStarHalfAlt /></>, 
        2: <><FaStar /><FaStar /></>, 
        2.5: <><FaStar /><FaStar /><FaStarHalfAlt /></>,
        3: <><FaStar /><FaStar /><FaStar /></>, 
        3.5: <><FaStar /><FaStar /><FaStar /><FaStarHalfAlt /></>,
        4: <><FaStar /><FaStar /><FaStar /><FaStar /></>,
        4.5: <><FaStar /><FaStar /><FaStar /><FaStar /><FaStarHalfAlt /></>,
    };
    
    let price = {
        1: <><FaDollarSign /></>,
        2: <><FaDollarSign /><FaDollarSign /></>,
        3: <><FaDollarSign /><FaDollarSign /><FaDollarSign /></>,
        4: <><FaDollarSign /><FaDollarSign /><FaDollarSign /><FaDollarSign /></>,
    };

    let convRating = rating[Rating] || <FaRegStar />;
    let convPrice = price[Price] || price[4];
    let convDistance = Math.floor(Distance) === 0 ? Distance.toFixed(2) * 1000 + ' m' : Distance.toFixed(2) + ' km';
    let convOpen = Open ? <span className="badge bg-success">Open</span> : <span className="badge bg-danger">Closed</span>;

    return (
        <Card className="mb-2 w-100">
            <Card.Body>
                <div className="row">
                    <div className="col-9 px-2 flex-grow-1 bd-highlight">
                        <Card.Title className="mb-0">
                            <div className="d-flex">
                                <a href={`/business/${Id}`} className="flex-grow-1 bd-highlight" style={{ textDecoration: 'none' }}>{Title}</a>
                                <div className="bd-highlight">{convOpen}</div>
                            </div>
                        </Card.Title>
                        <Card.Text>
                            <div className="d-flex flex-column bd-highlight">
                                <div className="d-flex flex-row bd-highlight mb-2">
                                    <div className="d-flex flex-column bd-highlight pe-5">
                                        <small>{convRating}</small>
                                        <small>{convPrice}</small>
                                    </div>
                                    <div className="d-flex flex-column bd-highlight me-auto">
                                        <small><FaComment className="me-2"/>{DataReview + ' Review'}</small>
                                        <small><FaDirections className="me-2"/>{convDistance}</small>
                                    </div>
                                </div>
                                <div className="d-flex flex-column bd-highlight">
                                    <small className="mb-auto"><FaMapMarkedAlt style={{width: '20px'}}/> {Address}</small>
                                </div>
                            </div>
                        </Card.Text>
                        <small><FaLink style={{width: '20px'}}/> {Website} | <FaPhoneSquareAlt style={{width: '20px'}}/> {Phone}</small>
                        {
                            Login ? (
                                <div className="d-flex flex-column bd-highlight">
                                    <Review Id={Id} Refresh={Refresh} setRefresh={setRefresh}/>
                                </div>
                            ) : <></>
                        }
                    </div>
                    <div className="col-3 d-flex align-items-center" style={{hight: '100%'}}>
                        <Carousel>
                            <Carousel.Item>
                                <img
                                    className="d-block w-100"
                                    src={Image}
                                    alt="First slide"
                                />
                            </Carousel.Item>
                            <Carousel.Item>
                                <img
                                    className="d-block w-100"
                                    src={Image}
                                    alt="First slide"
                                />
                            </Carousel.Item>
                            <Carousel.Item>
                                <img
                                    className="d-block w-100"
                                    src={Image}
                                    alt="First slide"
                                />
                            </Carousel.Item>
                        </Carousel>
                    </div>
                </div>
            </Card.Body>
        </Card>
    )
}

export default resCard;