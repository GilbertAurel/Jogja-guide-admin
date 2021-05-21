import React, { useState, useEffect } from "react";
import Navbar from "components/Navbar";
import {
  Landscape,
  MenuBook,
  LocalPlay,
  Star,
  Settings,
  AttachMoney,
  Edit,
  Close,
} from "@material-ui/icons";
import { IconButton } from "@material-ui/core";
import AttractionCard from "components/AttractionCard";
import NewsCard from "components/NewsCard";
import EventCard from "components/EventCard";
import PopularCard from "components/PopularCard";
import AttractionForm from "components/AttractionForm";
import NewsForm from "components/NewsForm";
import EventForm from "components/EventForm";

const initialState = {
  attraction: false,
  news: false,
  event: false,
  popular: false,
};

export default function Home({ attractions, news, event, popular }) {
  //#region hooks states
  const [iconSelected, setIconSelected] = useState(initialState);
  const [currentPage, setCurrentPage] = useState("attraction");
  const [editState, setEditState] = useState(false);
  const [addState, setAddState] = useState(false);
  const [showAttraction, setShowAttraction] = useState(attractions);
  const [showNews, setShowNews] = useState(news);
  const [showEvent, setShowEvent] = useState(event);
  const [showPopular, setPopularEvent] = useState(popular);
  //#endregion

  useEffect(() => {
    setIconSelected({
      ...initialState,
      [currentPage]: true,
    });
  }, []);

  const clickHandler = (name) => {
    setIconSelected({
      ...initialState,
      [name]: true,
    });

    setCurrentPage(name);
  };

  const searchHandler = (search) => {
    if (!search) return setShowAttraction(attractions);

    return setShowAttraction(
      attractions.filter((doc) =>
        doc.title.toLowerCase().includes(search.toLowerCase())
      )
    );
  };

  const changeEditState = () => {
    if (addState) setAddState(false);
    setEditState(!editState);
  };

  const changeAddState = () => {
    if (editState) setEditState(false);
    setAddState(!addState);
  };

  const renderBody = () => {
    if (currentPage == "attraction") {
      return (
        <>
          {addState && <AttractionForm />}
          <p className="Card__found-label">
            Found {showAttraction.length} items
          </p>
          {showAttraction.map((item) => AttractionCard(item, editState))}
        </>
      );
    }

    if (currentPage == "news") {
      return (
        <>
          {addState && <NewsForm />}
          <p className="Card__found-label">Found {showNews.length} items</p>
          {showNews.map((item) => NewsCard(item, editState))}
        </>
      );
    }

    if (currentPage == "event") {
      return (
        <>
          {addState && <EventForm />}
          <p className="Card__found-label">Found {showEvent.length} items</p>
          {showEvent.map((item) => EventCard(item, editState))}
        </>
      );
    }

    if (currentPage == "popular") {
      return (
        <>
          {addState && <AttractionForm />}
          <p className="Card__found-label">Found {showPopular.length} items</p>
          {showPopular.map((item) => PopularCard(item, editState))}
        </>
      );
    }
  };

  return (
    <div className="Layout">
      <div className="Layout__left">
        <IconButton onClick={() => clickHandler("attraction")}>
          <Landscape
            style={{ color: iconSelected.attraction ? "#ffd700" : "#fff" }}
          />
        </IconButton>

        <IconButton onClick={() => clickHandler("news")}>
          <MenuBook style={{ color: iconSelected.news ? "#ffd700" : "#fff" }} />
        </IconButton>

        <IconButton onClick={() => clickHandler("event")}>
          <LocalPlay
            style={{ color: iconSelected.event ? "#ffd700" : "#fff" }}
          />
        </IconButton>
        <IconButton onClick={() => clickHandler("popular")}>
          <Star style={{ color: iconSelected.popular ? "#ffd700" : "#fff" }} />
        </IconButton>
        <IconButton onClick={() => console.log("setting")}>
          <Settings style={{ color: "#fff" }} />
        </IconButton>
      </div>

      <div className="Layout__right">
        <Navbar
          title={`${currentPage} collections`}
          editState={changeEditState}
          addState={changeAddState}
          searchHandler={searchHandler}
        />
        <main className="Layout__main">{renderBody()}</main>
      </div>
    </div>
  );
}

export async function getServerSideProps() {
  const resAttractions = await fetch(
    "https://jogja-app.herokuapp.com/attractions/attraction.json"
  );
  const attractions = await resAttractions.json();

  const resNews = await fetch("https://jogja-app.herokuapp.com/news/news.json");
  const news = await resNews.json();

  const resEvent = await fetch(
    "https://jogja-app.herokuapp.com/events/events.json"
  );
  const event = await resEvent.json();

  const resPopular = await fetch(
    "https://jogja-app.herokuapp.com/populars/populars.json"
  );
  const popularIds = await resPopular.json();
  const popular = await attractions.filter((item) =>
    popularIds.some((doc) => item.id === doc.attraction)
  );

  return {
    props: {
      attractions,
      news,
      event,
      popular,
    },
  };
}
