import { Star, AttachMoney, Edit, Close, Room } from "@material-ui/icons";
import { IconButton } from "@material-ui/core";
import deleteHandler from "components/deleteHandler";

export default function EventCard(item, editState) {
  return (
    <div className="Card" key={`${item.id}`}>
      <div className="Card__image">
        <img src={`https://jogja-app.herokuapp.com/${item.imageURL}`} alt="" />
      </div>

      <div className="Card__info">
        <h1>{item.title}</h1>
        <div className="Card__info-categories">
          {item.category.map((category) => (
            <p>{category}</p>
          ))}
        </div>
        <section>
          <Room style={{ color: "#1687a7", fontSize: "12px" }} />
          <p>{item.location}</p>
        </section>
      </div>

      <div className="Card__location">
        <section>
          <p>date: </p>
          <p>{item.date}</p>
        </section>

        <section>
          <p>url: </p>
          <p>{item.detailURL}</p>
        </section>
      </div>

      {editState && (
        <div className="Card__buttons">
          <IconButton>
            <Edit style={{ color: "#1687a7" }} />
          </IconButton>

          <IconButton onClick={() => deleteHandler(item.id, "events")}>
            <Close style={{ color: "#de5246" }} />
          </IconButton>
        </div>
      )}
    </div>
  );
}
