import React from "react";
import { CiGift } from "react-icons/ci";
import { MdDelete, MdEmail } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import "../styles/UserCard.css";
import userUnknow from "../images/desconocido.png";

export default function UserCard({ user, openEdit, deleteUser }) {
  return (
    <div className="card">
      <div className="card__header">
        <img className="card__img" width={50} src={user?.image_url ? user.image_url : userUnknow}  alt="user image" />
        <h3 className="card__name"> {user?.first_name} {user?.last_name}</h3>
      </div>
      
      <div className="card__info">
        <div>
          <span className="card__label">Correo: </span>
          <span className="card__data">
            <MdEmail className="icon--mail" /> {user?.email}
          </span>
        </div>
        <div>
          <span className="card__label">Cumpleaños: </span>
          <span className="card__data">
            <CiGift className="icon--gift" /> {user?.birthday}
          </span>
        </div>
      </div>
      <div className="card__btns">
        <button
          className="btn btn--edit"
          onClick={() => {
            openEdit(user);
          }}
        >
          <FaEdit />
        </button>
        <button
          className="btn btn--erase"
          onClick={() => {
            deleteUser(user?.id);
          }}
        >
          <MdDelete />
        </button>
      </div>
    </div>
  );
}
