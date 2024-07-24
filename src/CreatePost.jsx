import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function CreatePost() {
  const url = "http://localhost:3000/posts";
  const nav = useNavigate();

  const emptyPost = { title: "", author: "", cover: "", content: "", date: new Date().toISOString() };
  const [newPost, setNewPost] = useState(emptyPost);
  const [error, setError] = useState(false);

  function onSubmit(e) {
    e.preventDefault();
    setError(false);

    if (newPost.title == "" || newPost.author == "" || newPost.cover == "" || newPost.content == "") {
      setError(true);
    } else {
      console.log(newPost);
      axios
        .post(url, newPost)
        .then((res) => {
          setNewPost(emptyPost);
          nav("/");
        })
        .catch((err) => {
          console.log(err);
          alert(err.message);
        })
        .finally(() => {});
    }
  }

  function onChange(e) {
    setError(false);
    // console.log(e.target.value);

    setNewPost({ ...newPost, [e.target.name]: e.target.value });
  }

  return (
    <div className="text-center min-h-screen max-w-[1000px] m-auto">
      <p className="mt-6 text-2xl font-semibold">Create new Post</p>
      <form onSubmit={onSubmit} action="submit" className="mt-8">
        <InputField name="title" label="Title" placeholder="Enter title here" value={newPost.title} onChange={onChange} error={error} />
        <InputField name="author" label="Author" placeholder="Enter author here" value={newPost.author} onChange={onChange} error={error} />
        <InputField name="cover" label="Image URL" placeholder="Enter image URL here" value={newPost.cover} onChange={onChange} error={error} />

        <label className="form-control max-w-lg m-auto my-3">
          <div className="label">
            <span className="label-text">Blog Content</span>
          </div>
          <textarea
            name="content"
            value={newPost.content}
            onChange={onChange}
            className={`textarea textarea-bordered h-40 resize-none ${error && newPost.content == "" && "textarea-error"}`}
            placeholder="Enter the content here"></textarea>
        </label>

        <button type="submit" className="btn btn-outline btn-success mt-6">
          Submit
        </button>
      </form>
    </div>
  );
}

const InputField = ({ label, placeholder, name, value, onChange, error }) => {
  return (
    <label className="form-control w-full max-w-lg m-auto my-1">
      <div className="label">
        <span className="label-text">{label}:</span>
      </div>
      <input onChange={onChange} value={value} name={name} type="text" placeholder={placeholder} className={`input input-bordered w-full ${error && value == "" && "input-error"}`} />
    </label>
  );
};
