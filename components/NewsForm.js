import React, { useState } from "react";
import { Button } from "@material-ui/core";
import axios from "axios";
import router from "next/router";

const initialData = {
  headline: "",
  body: "",
  location: "",
  image: null,
};

function NewsForm() {
  const [formData, setFormData] = useState(initialData);

  const resetButton = () => {
    setFormData(initialData);
  };

  const submitHanlder = (event) => {
    event.preventDefault();

    const data = new FormData();
    data.append("image", formData.image);
    data.append("headline", formData.headline);
    data.append("location", formData.location);
    data.append("body", formData.body);

    const config = {
      headers: { "content-type": "multipart/form-data`" },
    };

    axios
      .post("http://localhost:3008/news/", data, config)
      .then(() => {
        alert("news successfully added!");
        router.reload();
      })
      .catch((error) => {
        alert(error.response.data.error);
      });
  };

  return (
    <form className="Form" onSubmit={submitHanlder}>
      <div className="Form__left">
        <section>
          <label>Headline</label>
          <input
            type="text"
            name="title"
            placeholder="title"
            value={formData.headline}
            onChange={(el) =>
              setFormData({ ...formData, headline: el.target.value })
            }
          />
        </section>

        <section>
          <label>Location</label>
          <input
            type="text"
            name="rating"
            placeholder="location"
            value={formData.location}
            onChange={(el) =>
              setFormData({ ...formData, location: el.target.value })
            }
          />
        </section>
      </div>

      <div className="Form__right">
        <section>
          <label>Body</label>
          <textarea
            name="description"
            placeholder="description"
            value={formData.body}
            onChange={(el) =>
              setFormData({ ...formData, body: el.target.value })
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

export default NewsForm;
