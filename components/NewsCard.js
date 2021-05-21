import { Star, AttachMoney, Edit, Close, Room } from "@material-ui/icons";
import { IconButton } from "@material-ui/core";
import deleteHandler from "components/deleteHandler";

export default function NewsCard(item, editState) {
  return (
    <div className="Card" key={`${item.id}`}>
      <div className="Card__image">
        <img src={`https://jogja-app.herokuapp.com/${item.imageURL}`} alt="" />
      </div>

      <div className="Card__info">
        <h1>{item.headline}</h1>
        <p>{item.date}</p>
        <section>
          <Room style={{ color: "#1687a7", fontSize: "12px" }} />
          <p>{item.location}</p>
        </section>
      </div>

      <div className="Card__description">
        <p>body:</p>
        <p>{item.body}</p>
      </div>

      {editState && (
        <div className="Card__buttons">
          <IconButton>
            <Edit style={{ color: "#1687a7" }} />
          </IconButton>

          <IconButton onClick={() => deleteHandler(item.id, "news")}>
            <Close style={{ color: "#de5246" }} />
          </IconButton>
        </div>
      )}
    </div>
  );
}
