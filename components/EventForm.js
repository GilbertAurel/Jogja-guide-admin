import React, { useState } from "react";
import { Button } from "@material-ui/core";
import axios from "axios";
import router from "next/router";

const initialData = {
  title: "",
  category: [],
  location: "",
  date: "",
  detailURL: "",
  image: null,
};

function EventForm() {
  const [formData, setFormData] = useState(initialData);

  const resetButton = () => {
    setFormData(initialData);
  };

  const submitHanlder = (event) => {
    event.preventDefault();

    const data = new FormData();
    data.append("image", formData.image);
    data.append("title", formData.title);
    data.append("location", formData.location);
    {
      formData.category.map((categoryItem) =>
        data.append("category", categoryItem)
      );
    }
    data.append("date", formData.date);
    data.append("detailURL", formData.detailURL);

    const config = {
      headers: { "content-type": "multipart/form-data`" },
    };

    axios
      .post("http://localhost:3008/events/", data, config)
      .then(() => {
        alert("event successfully added!");
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
          <label>Date</label>
          <input
            type="date"
            name="date"
            placeholder="date"
            value={formData.date}
            onChange={(el) =>
              setFormData({ ...formData, date: el.target.value })
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
          <label>Location</label>
          <input
            type="text"
            name="location"
            placeholder="location"
            value={formData.location}
            onChange={(el) =>
              setFormData({ ...formData, location: el.target.value })
            }
          />
        </section>

        <section>
          <label>Webssite URL</label>
          <input
            type="text"
            name="address"
            placeholder="address"
            value={formData.detailURL}
            onChange={(el) =>
              setFormData({ ...formData, detailURL: el.target.value })
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

export default EventForm;
