import { useEffect, useState } from "react";
import api from "../config/api";
import Filter from "../resources/Filter";
import Login from "../resources/modal/Login";
import Map from "../resources/Maps";
import Nav from "../resources/Navbar";
import Search from "../resources/Search";
import Card from "../resources/Card";
import key from "../config/key";
import Register from "../resources/modal/Register";
import Business from "../resources/modal/Business";

function Home() {
  const [varLocation, setLocation] = useState({ lat: 0, lng: 0 });
  const [varSearch, setSearch] = useState("");
  const [varOrder, setOrder] = useState("distance");
  const [varRating, setRating] = useState(null);
  const [varPrice, setPrice] = useState(null);
  const [varBusinesses, setBusinesses] = useState([]);
  const [varLogin, setLogin] = useState(false);
  const [varRefresh, setRefresh] = useState(false);
  const [varPlace, setPlace] = useState([]);

  useEffect(() => {
    let url  = "/search/business?";
        url += "distance";
        url += "&latitute=" + varLocation.lat;
        url += "&longitude=" + varLocation.lng;
        url += "&sort=" + varOrder;
        url += "&rating=" + varRating;
        url += "&search=" + varSearch;
        url += "&price=" + varPrice;
        url += "&open";

    api.get(url)
      .then((response) => {
        setBusinesses(response.data.raw);
      })

    if (key('get') !== null) {
      setLogin(true);
    }
  }, [
    varLocation, 
    varSearch, 
    varOrder, 
    varRating, 
    varPrice, 
    varRefresh
  ]);

  useEffect(() => {
    const newMarkers = varBusinesses.map((business, index) => {
        return {
            position: {lat: business.business_latitute, lng: business.business_longitude},
            label: business.business_name
        };
    });
    
    setPlace([...varPlace, ...newMarkers]);
}, [varBusinesses])

  const handleLogout = () => {
    setLogin(false);
    key('logout');
  }

  return (
    <div className="w-100">
      <Nav />
      <div className="row w-100 m-0">
        <div className="col-lg-6 col-md-6 col-sm-12 px-3 py-3">
          <div className="position-relative">
            <Search setLocation={setLocation} setSearch={setSearch}/>
            
            <div className="d-flex w-100 mb-2">
              <div className="d-flex flex-row bd-highlight me-auto">
                <Filter 
                  Order={varOrder} 
                  setOrder={setOrder} 
                  Rating={varRating} 
                  setRating={setRating} 
                  Price={varPrice} 
                  setPrice={setPrice} 
                />
              </div>

              <div className="d-flex flex-row bd-highlight">
                {
                  varLogin === false ? (
                    <>
                      <Login setLogin={setLogin}/>
                      <Register/>
                    </>
                  ) : (
                    <>
                      <Business Refresh={varRefresh} setRefresh={setRefresh}/>
                      <button className="btn btn-outline-secondary btn-sm me-1" onClick={handleLogout}>Logout</button>
                    </>
                  )
                }
              </div>
            </div>
          </div>

          <div className="mx-1" style={{overflowY: 'scroll', height: '81vh'}}>
            {
              varBusinesses.map((business) => {
                return (
                  <Card 
                    Title={business.business_name}
                    Rating={business.business_rating}
                    Price={business.business_price}
                    DataReview={business.business_review}
                    Distance={business.business_distance}
                    Website={business.business_website}
                    Phone={business.business_phone}
                    Address={business.business_address}
                    Open={business.business_open}
                    Login={varLogin}
                    Id={business.business_id}
                    Refresh={varRefresh}
                    setRefresh={setRefresh}
                    Image={"https://picsum.photos/300/200"}
                  />
                );
              })
            }
          </div>
        </div>

        <div className="col-lg-6 col-md-6 col-sm-12 p-0">
          <Map Location={varLocation} BusinessPlace={varBusinesses}/>
        </div>
      </div>
    </div>
  );
}

export default Home;