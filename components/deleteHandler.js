import axios from "axios";
import router from "next/router";

export default function deleteHandler(id, collection) {
  axios
    .delete(`http://localhost:3008/${collection}/delete/${id}`)
    .then(() => {
      alert("item has been deleted!");
      router.reload();
    })
    .catch(() => alert("delete process failed!"));
}
