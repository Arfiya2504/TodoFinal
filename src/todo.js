import React, { useState, useEffect } from 'react';
import "./style.css";

// Function to get local storage data
const getLocalData = () => {
  const lists = localStorage.getItem("mytodoList");
  if (lists) {
    return JSON.parse(lists);
  } else {
    return [];
  }
};

const Todo = () => {
  const [inputData, setInputData] = useState("");
  const [items, setItems] = useState(getLocalData());
  const [isEditItem, setIsEditItem] = useState(null);
  const [toggleButton, setToggleButton] = useState(false);

  // Save items to local storage whenever items change
  useEffect(() => {
    localStorage.setItem("mytodoList", JSON.stringify(items));
  }, [items]);

  const addItem = () => {
    if (!inputData) {
      alert("Please add item first");
    } else if (inputData && toggleButton) {
      setItems(
        items.map((curElem) => {
          if (curElem.id === isEditItem) {
            return { ...curElem, name: inputData };
          }
          return curElem;
        })
      );

      setInputData("");
      setIsEditItem(null);
      setToggleButton(false);
    } else {
      const myNewInputData = {
        id: new Date().getTime().toString(),
        name: inputData,
      };
      setItems([...items, myNewInputData]);
      setInputData("");
    }
  };

  const editItem = (id) => {
    const itemToEdit = items.find((curElem) => curElem.id === id);
    setInputData(itemToEdit.name);
    setIsEditItem(id);
    setToggleButton(true);
  };

  const deleteItem = (id) => {
    const updatedItems = items.filter((curElem) => curElem.id !== id);
    setItems(updatedItems);
  };

  const removeAll = () => {
    setItems([]);
  };

  return (
    <>
      <div className='main-div'>
        <div className='child-div'>
          <figure>
            <img src="/images/todonew.svg" alt="todologo" />
            <figcaption>Add your List Here !⬇️📝</figcaption>
          </figure>
          <div className='addItems'>
            <input
              type="text"
              placeholder="Add Item ✍️"
              className='form-control'
              value={inputData}
              onChange={(event) => setInputData(event.target.value)}
            />
            {toggleButton ? (
              <i className='fa fa-edit add-btn' onClick={addItem}></i>
            ) : (
              <i className="fa fa-plus add-btn" onClick={addItem}></i>
            )}
          </div>
          <div className="showItems">
            {items.map((curElem) => {
              return (
                <div className='eachItem' key={curElem.id}>
                  <h3>{curElem.name}</h3>
                  <div className="todo-btn">
                    <i className='far fa-edit add-btn' onClick={() => editItem(curElem.id)}></i>
                    <i className='far fa-trash-alt add-btn' onClick={() => deleteItem(curElem.id)}></i>
                  </div>
                </div>
              );
            })}
          </div>
          <div className='showItems'>
            <button className='btn effect04' data-sm-link-text="Remove All" onClick={removeAll}>
              <span>CHECK LIST</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Todo;
