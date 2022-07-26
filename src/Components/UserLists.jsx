import React from "react";

export default function UserLists({ state, elemRef }) {
  if (Object.keys(state).length === 0) return "";
  return (
    <div className="container">
      {state.map((data) => {
        return (
          <div
            className="card"
            id={data.id}
            tabIndex="0"
            key={data.id}
            ref={elemRef[data.id]}
          >
            <img
              src="https://source.unsplash.com/100x100?potrait"
              alt="Profile Picture"
            />
            <ul className="list">
              <li>ID: {data.id}</li>
              <li>Name: {data.name}</li>
              <li>Username: {data.username}</li>
              <li>Email: {data.email}</li>
              <li>Tel: {data.phone}</li>
            </ul>
            <hr />
            <div className="card-footer">
              <a className="card-link" href={"tel:" + data.phone}>
                Call
              </a>
              <a className="card-link" href={"mailto:" + data.email}>
                Email
              </a>
            </div>
          </div>
        );
      })}
    </div>
  );
}
