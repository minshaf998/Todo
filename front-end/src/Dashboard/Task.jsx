import React, { useState } from "react";
import { Modal, Card } from "antd";

function Task({ fromNote, id, email }) {
  const [note, setNote] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);

  const deleteTodo = async (id) => {
    await fetch(`http://localhost:8000/api/todo/${id}`, {
      method: "DELETE",
    });
  };

  const showEditModal = () => {
    setIsModalVisible(true);
  };
  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleClick = (id) => {
    fetch(`http://localhost:8000/api/todo/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        note: note,
      }),
    })
      .then((r) => r.json())
      .then((data) => {});
  };

  return (
    <div>
      <li className="todo stack-small">
        <div>
          <div>
            <Card style={{ fontSize: 20 }}>{fromNote}</Card>
            <div className="btn-group">
              <button type="button" className="btn" onClick={showEditModal}>
                Edit
              </button>
              <Modal
                visible={isModalVisible}
                footer={null}
                onCancel={handleCancel}
              >
                <form>
                  <h2 className="label-wrapper">
                    <label htmlFor="new-todo-input" className="label__lg">
                      What needs to be update?
                    </label>
                  </h2>
                  <input
                    type="text"
                    id="new-todo-input"
                    className="input input__lg"
                    name="text"
                    autoComplete="off"
                    onChange={(e) => setNote(e.target.value)}
                  />
                  <button
                    type="submit"
                    className="btn btn__primary btn__lg"
                    onClick={() => {
                      handleClick(id);
                    }}
                  >
                    Update
                  </button>
                </form>
              </Modal>
              <button
                type="button"
                className="btn btn__danger"
                onClick={() => {
                  const confirmBox = window.confirm(
                    "Do you really want to delete" + fromNote
                  );
                  if (confirmBox === true) {
                    deleteTodo(id);
                  }
                }}
              >
                Delete
              </button>
              {/* <div className="c-cb">
                  <input
                    id="todo-0"
                    type="checkbox"
                    defaultChecked={iscompleted}
                    onChange={(e) => {
                      setIsCompleted(e.target.value);
                    }}
                    onClick={handleClickCompleted(item._id)}
                  />

                  <label className="todo-label" htmlFor="todo-0">
                    Completed
                  </label>
                </div> */}
            </div>
            <br />
          </div>
        </div>
      </li>
    </div>
  );
}

export default Task;
