import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Card from "../components/Card";
import { BASE_URL } from "../url";

const Home = () => {
  const [searchData, setSearchData] = useState("");
  const [foodCat, setFoodCat] = useState([]);
  const [foodItem, setFoodItem] = useState([]);

  const loadData = async () => {
    try {
      let response = await fetch(`${BASE_URL}/api/foodData`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      response = await response.json();
      console.log("response:", response);

      if (response) {
        setFoodItem(response[0] || []);
        setFoodCat(response[1] || []);
      }
    } catch (error) {
      console.error("Error loading data:", error);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <div>
      {/* Navbar */}
      <div>
        <Navbar />
      </div>
      {/* Page Body */}
      <div>
        <div
          id="carouselExampleIndicators"
          className="carousel slide"
          data-bs-ride="carousel"
          style={{ objectFit: "contain !important" }}
        >
          <div className="carousel-inner" id="carousel">
            <div className="carousel-caption" style={{ zIndex: "10" }}>
              <div className="d-flex justify-content-center">
                <input
                  className="form-control me-2"
                  type="search"
                  placeholder="Search"
                  aria-label="Search"
                  value={searchData}
                  onChange={(e) => {
                    setSearchData(e.target.value);
                  }}
                />
              </div>
            </div>
            <div
              className="carousel-item active"
              style={{ objectFit: "contain !important", height: "600px" }}
            >
              <img
                src="https://source.unsplash.com/random/600×100/?burger"
                className="d-block w-100"
                style={{ filter: "brightness(30%)" }}
                alt="..."
              />
            </div>
            <div
              className="carousel-item"
              style={{ objectFit: "contain !important", height: "600px" }}
            >
              <img
                src="https://source.unsplash.com/random/600×100/?pasta"
                className="d-block w-100"
                style={{ filter: "brightness(30%)" }}
                alt="..."
              />
            </div>
            <div
              className="carousel-item"
              style={{ objectFit: "contain !important", height: "600px" }}
            >
              <img
                src="https://source.unsplash.com/random/600×100/?pizza"
                className="d-block w-100 "
                style={{ filter: "brightness(30%)" }}
                alt="..."
              />
            </div>
          </div>
          <button
            className="carousel-control-prev"
            type="button"
            data-bs-target="#carouselExampleIndicators"
            data-bs-slide="prev"
          >
            <span
              className="carousel-control-prev-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button
            className="carousel-control-next"
            type="button"
            data-bs-target="#carouselExampleIndicators"
            data-bs-slide="next"
          >
            <span
              className="carousel-control-next-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>
      </div>
      <div className="container">
        {foodCat !== [] ? (
          foodCat.map((data) => {
            return (
              <div className="row mb-3" key={data._id}>
                <div className="fs-3 m-4">{data.CategoryName}</div>
                <hr />
                {foodItem !== [] > 0 ? (
                  foodItem
                    .filter(
                      (item) =>
                        item.CategoryName === data.CategoryName &&
                        item.name.toLowerCase().includes(searchData.toLowerCase())
                    )
                    .map((filterItems) => {
                      return (
                        <div key={filterItems._id} className="col-12 col-md-6 col-lg-3">
                          <Card foodItems={filterItems} options={filterItems.options[0]} />
                        </div>
                      );
                    })
                ) : (
                  <div>No Such Data found</div>
                )}
              </div>
            );
          })
        ) : (
          <div>Loading...</div>
        )}
      </div>
      {/* Footer */}
      <div>
        <Footer />
      </div>
    </div>
  );

};

export default Home;








{/* <div className="container">
{" "}

{foodCat !== []
  ? foodCat.map((data) => {
      return (
        // justify-content-center
        <div className="row mb-3">
          <div key={data.id} className="fs-3 m-3">
            {data.CategoryName}
          </div>
          <hr
            id="hr-success"
            style={{
              height: "4px",
              backgroundImage:
                "-webkit-linear-gradient(left,rgb(0, 255, 137),rgb(0, 0, 0))",
            }}
          />
          {foodItems !== [] ? (
            foodItems
              .filter(
                (items) =>
                  items.CategoryName === data.CategoryName &&
                  items.name
                    .toLowerCase()
                    .includes(search.toLowerCase())
              )
              .map((filterItems) => {
                return (
                  <div
                    key={filterItems.id}
                    className="col-12 col-md-6 col-lg-3"
                  >
                    {console.log(filterItems.url)}
                    <Card
                      foodName={filterItems.name}
                      item={filterItems}
                      options={filterItems.options[0]}
                      ImgSrc={filterItems.img}
                    ></Card>
                  </div>
                );
              })
          ) : (
            <div> No Such Data </div>
          )}
        </div>
      );
    })
  : ""}
</div> */}