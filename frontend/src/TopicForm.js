import React from "react";
import "./TopicForm.css"; // Assurez-vous de créer un fichier TopicForm.css pour les styles

function TopicForm({ onCreateItem }) {
  function handleSubmit(e) {
    e.preventDefault();
    const title = e.target.title.value;
    const description = e.target.description.value;
    if (!title.trim() || !description.trim()) {
      alert("Please fill in both title and description fields.");
      return;
    }
    onCreateItem({ title, description });
    e.target.title.value = "";
    e.target.description.value = "";
  }

  return (
    <div className="topic-form-container">
      <h2>Add New Topic</h2>
      <form onSubmit={handleSubmit} className="topic-form">
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input type="text" id="title" name="title" required />
        </div>
        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea id="description" name="description" rows="5" required></textarea>
        </div>
        <button type="submit" className="btn-add">Add</button>
      </form>
    </div>
  );
}

export default TopicForm;
