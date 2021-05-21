import { Star, AttachMoney, Edit, Close } from "@material-ui/icons";
import { IconButton } from "@material-ui/core";
import deleteHandler from "components/deleteHandler";

export default function RenderAttractionCard(item, editState) {
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
          <Star style={{ color: "#ffd700", fontSize: "12px" }} />
          <p>{item.rating}</p>
        </section>
        <section>
          <AttachMoney style={{ color: "#a4c639", fontSize: "12px" }} />
          <p>{item.price}</p>
        </section>
      </div>

      <div className="Card__location">
        <section>
          <p>address: </p>
          <p>{item.address}</p>
        </section>

        <section>
          <p>latitude: </p>
          <p>{item.coordinate.latitude}</p>
        </section>

        <section>
          <p>longitude: </p>
          <p>{item.coordinate.longitude}</p>
        </section>
      </div>

      <div className="Card__description">
        <p>description:</p>
        <p>{item.description}</p>
      </div>

      {editState && (
        <div className="Card__buttons">
          <IconButton>
            <Edit style={{ color: "#1687a7" }} />
          </IconButton>

          <IconButton onClick={() => deleteHandler(item.id, "attractions")}>
            <Close style={{ color: "#de5246" }} />
          </IconButton>
        </div>
      )}
    </div>
  );
}
