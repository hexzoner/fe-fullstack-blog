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
    <div className="min-h-screen max-w-[900px] m-auto">
      <div className="bg-base-200 py-2 my-8 rounded-2xl max-w-[700px] m-auto">
        <p className="mt-4 text-2xl font-semibold text-left w-full max-w-xl m-auto">Create new Post</p>
        <form onSubmit={onSubmit} action="submit" className="mt-4 flex flex-col gap-3 pb-4">
          <InputField name="title" label="Title" placeholder="Enter title here" value={newPost.title} onChange={onChange} error={error} />
          <InputField name="author" label="Author" placeholder="Enter author here" value={newPost.author} onChange={onChange} error={error} />
          <InputField name="cover" label="Image URL" placeholder="Enter image URL here" value={newPost.cover} onChange={onChange} error={error} />
          <label className="form-control w-full max-w-xl m-auto ">
            <div className="label pb-0">
              <span className="label-text">Blog Content:</span>
            </div>
            <textarea
              name="content"
              value={newPost.content}
              onChange={onChange}
              className={`textarea textarea-bordered h-56 resize-none ${error && newPost.content == "" && "textarea-error"}`}
              placeholder="Enter the content here"></textarea>
          </label>
          <button type="submit" className="btn btn-outline btn-success mt-6 w-full max-w-[10rem] m-auto">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

const InputField = ({ label, placeholder, name, value, onChange, error }) => {
  return (
    <label className="form-control w-full max-w-xl m-auto">
      <div className="label pb-0">
        <span className="label-text">{label}:</span>
      </div>
      <input onChange={onChange} value={value} name={name} type="text" placeholder={placeholder} className={`input input-bordered w-full ${error && value == "" && "input-error"}`} />
    </label>
  );
};
