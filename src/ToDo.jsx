import React, { useState, useEffect } from "react";
import Logo from "./Logo.png";
import "./App.css";

//get data from local storage
const getData = () => {
  let list = localStorage.getItem("lists");

  if (list) {
    return JSON.parse(localStorage.getItem("lists"));
  }
  return [];
};

const ToDo = () => {
  const [inputData, setInputData] = useState("");
  const [items, setItems] = useState(getData());
  const [toggleSubmit, setToggleSubmit] = useState(true);
  const [editItemId, setEditItemId] = useState(null);

  //set data in local storage
  useEffect(() => {
    localStorage.setItem("lists", JSON.stringify(items));
  }, [items]);

  const addItems = () => {
    const data = inputData.trimStart();
    if (!data) {
    } else if (data && !toggleSubmit) {
      setItems(
        items.map((value) => {
          if (value.id === editItemId) {
            return { ...value, name: data };
          }
          return value;
        })
      );

      setToggleSubmit(true);
      setInputData("");
      setEditItemId(null);
    } else {
      setItems([
        ...items,
        { id: new Date().getTime().toString(), name: inputData },
      ]);
      setInputData("");
    }
  };

  const editItem = (id) => {
    const item = items.find((element) => element.id === id);
    setInputData(item.name);
    setEditItemId(id);

    setToggleSubmit(false);
  };

  const deleteItem = (id) => {
    const newList = items.filter((item) => {
      return item.id !== id;
    });
    setItems(newList);
  };

  const removeAll = () => {
    setItems([]);
  };

  return (
    <>
      <div className="main-div">
        <div className="child-div">
          <figure>
            <img src={Logo} alt="2022 Todo List Logo" />
            <figcaption>Add Your List Here ✌</figcaption>
          </figure>

          <div className="addItems">
            <input
              type="text"
              placeholder="✍ Add Items here..."
              value={inputData}
              onChange={(e) => setInputData(e.target.value)}
            />
            {toggleSubmit ? (
              <i
                className="fa fa-plus add-btn"
                title="Add Items"
                onClick={addItems}
              ></i>
            ) : (
              <i
                className="far fa-edit add-btn"
                title="Update Items"
                onClick={addItems}
              ></i>
            )}
          </div>

          <div className="showItems">
            {items.map((value) => {
              return (
                <div className="eachItem">
                  <h3>{value.name}</h3>
                  <div className="todo-btn">
                    <i
                      className="far fa-edit add-btn"
                      title="Edit Items"
                      onClick={() => editItem(value.id)}
                    ></i>
                    <i
                      className="far fa-trash-alt add-btn"
                      title="Delete Items"
                      onClick={() => deleteItem(value.id)}
                    ></i>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="showItems">
            <button
              className="btn effect04"
              data-sm-link-text="Remove All"
              onClick={removeAll}
            >
              <span>CHECK LIST</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ToDo;
