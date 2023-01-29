import React, { useEffect, useState } from "react";
import { Carousel } from "react-bootstrap";
import { FaDollarSign, FaLink, FaPhoneSquareAlt, FaRegStar, FaStar, FaStarHalfAlt } from "react-icons/fa";
import { useParams } from "react-router-dom";
import api from "../config/api";
import Nav from "../resources/Navbar";

function Business() {
  let rating = {
      1: <><FaStar /></>, 
      1.5: <><FaStar /><FaStarHalfAlt /></>, 
      2: <><FaStar /><FaStar /></>, 
      2.5: <><FaStar /><FaStar /><FaStarHalfAlt /></>,
      3: <><FaStar /><FaStar /><FaStar /></>, 
      3.5: <><FaStar /><FaStar /><FaStar /><FaStarHalfAlt /></>,
      4: <><FaStar /><FaStar /><FaStar /><FaStar /></>,
      4.5: <><FaStar /><FaStar /><FaStar /><FaStar /><FaStarHalfAlt /></>,
      5: <><FaStar /><FaStar /><FaStar /><FaStar /><FaStar /></>,
  };

  let price = {
      1: <><FaDollarSign /></>,
      2: <><FaDollarSign /><FaDollarSign /></>,
      3: <><FaDollarSign /><FaDollarSign /><FaDollarSign /></>,
      4: <><FaDollarSign /><FaDollarSign /><FaDollarSign /><FaDollarSign /></>,
  };

  const { id } = useParams();
  const [varBusiness, setBusiness] = useState({});
  
  let convRating = rating[varBusiness.business_rating] || <FaRegStar />;
  let convPrice = price[varBusiness.business_price] || price[4];

  useEffect(() => {
    api.get("/business/" + id)
      .then((response) => {
        setBusiness(response.data.raw);
      })
  }, [id]);

  return (
    <>
      <Nav />
      <div className="row w-100 m-0">
        <div className="col-lg-6 col-md-6 col-sm-12 px-3 py-3">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title mb-0">{varBusiness.business_name}</h5>
              <div className="d-flex flex-column">
                <small>{convRating}</small>
                <small>{convPrice}</small>
              </div>
              <h6 className="card-subtitle my-2 text-muted">{varBusiness.business_address}</h6>
              <div className="d-flex flex-column bd-highlight">
                <small><FaLink style={{width: '20px'}}/> {varBusiness.business_website} | <FaPhoneSquareAlt style={{width: '20px'}}/> {varBusiness.business_phone}</small>
              </div>
            </div>
          </div>

          {
            varBusiness.link_rating !== null && varBusiness.link_rating !== undefined && varBusiness.link_rating.map((item, index) => {
              return (
                <div className="card mt-3" key={index}>
                  <div className="card-body">
                    <h5 className="card-title mb-0">
                      <small>{rating[item.rating]}</small>
                    </h5>
                    <h6 className="card-subtitle my-2 text-muted">{item.rating_review}</h6>
                  </div>
                </div>
              )
            })
          }
        </div>
        
        <div className="col-lg-6 col-md-6 col-sm-12 px-3 py-3">
          <Carousel>
              <Carousel.Item>
                  <img
                      className="d-block w-100"
                      src={"https://picsum.photos/300/200"}
                      alt="First slide"
                  />
              </Carousel.Item>
              <Carousel.Item>
                  <img
                      className="d-block w-100"
                      src={"https://picsum.photos/300/200"}
                      alt="First slide"
                  />
              </Carousel.Item>
              <Carousel.Item>
                  <img
                      className="d-block w-100"
                      src={"https://picsum.photos/300/200"}
                      alt="First slide"
                  />
              </Carousel.Item>
          </Carousel>
        </div>
      </div>
    </>
  );
}

export default Business;