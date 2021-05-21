import React, { useState } from "react";
import { Button } from "@material-ui/core";
import axios from "axios";
import router from "next/router";

const initialData = {
  title: "",
  category: [],
  rating: "",
  priceRating: "",
  description: "",
  address: "",
  googleMaps: "",
  latitude: null,
  longitude: null,
  image: null,
};

function AttractionForm() {
  const [formData, setFormData] = useState(initialData);

  const resetButton = () => {
    setFormData(initialData);
  };

  const submitHanlder = (event) => {
    event.preventDefault();

    const data = new FormData();
    data.append("image", formData.image);
    data.append("title", formData.title);
    data.append("rating", formData.rating);
    {
      formData.category.map((categoryItem) =>
        data.append("category", categoryItem)
      );
    }
    data.append("priceRating", formData.priceRating);
    data.append("description", formData.description);
    data.append("address", formData.address);
    data.append("latitude", formData.latitude);
    data.append("longitude", formData.longitude);

    const config = {
      headers: { "content-type": "multipart/form-data`" },
    };

    axios
      .post("http://localhost:3008/attractions/", data, config)
      .then(() => {
        alert("attraction successfully added!");
        router.reload();
      })
      .catch((error) => {
        alert(error.response.data.error);
      });
  };

  const checkboxHandler = (el) => {
    if (!formData.category.includes(el)) {
      setFormData({
        ...formData,
        category: [...formData.category, el],
      });
    } else {
      const newArr = formData.category.filter((item) => item !== el);
      setFormData({
        ...formData,
        category: newArr,
      });
    }
  };

  const googleMapsHandler = (el) => {
    const urlArray = el.split("!");
    const latitude = urlArray[urlArray.length - 2].slice(2);
    const longitude = urlArray[urlArray.length - 1].slice(2);

    setFormData({
      ...formData,
      latitude,
      longitude,
    });
  };

  return (
    <form className="Form" onSubmit={submitHanlder}>
      <div className="Form__left">
        <section>
          <label>Title</label>
          <input
            type="text"
            name="title"
            placeholder="title"
            value={formData.title}
            onChange={(el) =>
              setFormData({ ...formData, title: el.target.value })
            }
          />
        </section>

        <section>
          <label>Rating</label>
          <input
            type="number"
            min={0}
            max={5}
            step={0.1}
            name="rating"
            placeholder="0.0-5.0"
            value={formData.rating}
            onChange={(el) =>
              setFormData({ ...formData, rating: el.target.value })
            }
          />
        </section>

        <section>
          <label>Categories</label>
          <div className="Form__categories">
            <div>
              <input
                type="checkbox"
                id="category"
                name="category"
                value="arts"
                checked={formData.category.includes("arts")}
                onChange={(el) => checkboxHandler(el.target.value)}
              />
              <label for="category">Arts</label>
            </div>

            <div>
              <input
                type="checkbox"
                id="category"
                name="category"
                value="culinary"
                checked={formData.category.includes("culinary")}
                onChange={(el) => checkboxHandler(el.target.value)}
              />
              <label for="vehicle1">Culinary</label>
            </div>

            <div>
              <input
                type="checkbox"
                id="category"
                name="category"
                value="keraton"
                checked={formData.category.includes("keraton")}
                onChange={(el) => checkboxHandler(el.target.value)}
              />
              <label for="vehicle1">Keraton</label>
            </div>

            <div>
              <input
                type="checkbox"
                id="category"
                name="category"
                value="nature"
                checked={formData.category.includes("nature")}
                onChange={(el) => checkboxHandler(el.target.value)}
              />
              <label for="vehicle1">Nature</label>
            </div>

            <div>
              <input
                type="checkbox"
                id="category"
                name="category"
                value="shopping"
                checked={formData.category.includes("shopping")}
                onChange={(el) => checkboxHandler(el.target.value)}
              />
              <label for="vehicle1">Shopping</label>
            </div>
          </div>
        </section>
      </div>

      <div className="Form__middle">
        <section>
          <label>Price rating</label>
          <select
            name="priceRating"
            onChange={(el) =>
              setFormData({ ...formData, priceRating: el.target.value })
            }
            value={formData.priceRating}
          >
            <option>affordable</option>
            <option>fair</option>
            <option>expensive</option>
          </select>
        </section>

        <section>
          <label>Address</label>
          <input
            type="text"
            name="address"
            placeholder="address"
            value={formData.address}
            onChange={(el) =>
              setFormData({ ...formData, address: el.target.value })
            }
          />
        </section>

        <section>
          <label>Google map url</label>
          <input
            type="text"
            name="map"
            placeholder="google map url"
            onChange={(el) => googleMapsHandler(el.target.value)}
          />
        </section>
      </div>

      <div className="Form__right">
        <section>
          <label>Description</label>
          <textarea
            name="description"
            placeholder="description"
            value={formData.description}
            onChange={(el) =>
              setFormData({ ...formData, description: el.target.value })
            }
          />
        </section>

        <section>
          <label>Upload image</label>
          <input
            type="file"
            name="image"
            placeholder="upload photo"
            onChange={(el) =>
              setFormData({ ...formData, image: el.target.files[0] })
            }
          />
        </section>
      </div>

      <div className="Form__button">
        <Button onClick={() => resetButton()}>Reset</Button>
        <Button type="submit">Submit</Button>
      </div>
    </form>
  );
}

export default AttractionForm;
