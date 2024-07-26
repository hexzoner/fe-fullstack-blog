import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function PostDetails() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editMode, setEditMode] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/posts/${id}`);
        setPost(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [id]);

  function handleDelete() {
    axios
      .delete(`http://localhost:3000/posts/${id}`)
      .then((res) => {
        console.log("Post deleted:", res.data);
        navigate("/");
      })
      .catch((error) => {
        console.error("Error deleting post:", error); // Debug log
        alert("Error", "Failed to delete the post");
      });
  }

  function handleEditing(e) {
    const { name, value } = e.target;
    setPost((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  }

  function handleSave(e) {
    axios
      .put(`http://localhost:3000/posts/${id}`, post)
      .then((res) => {
        console.log("Post updated:", res.data);
        setEditMode(false);
      })
      .catch((error) => {
        console.error("Error updating post:", error); // Debug log
        alert("Error", "Failed to update the post");
      });
  }

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!post) return <div>No post found.</div>;
  if (editMode)
    return (
      <>
        <div className="flex flex-col gap-5 p-4">
          <div className="flex flex-col gap-3">
            <input
              name="title"
              placeholder="Enter title here"
              value={post.title}
              onChange={handleEditing}
              className={`input input-bordered w-full ${
                post.title === "" && "input-error"
              }`}
            />
            <input
              name="author"
              placeholder="Enter author here"
              value={post.author}
              onChange={handleEditing}
              className={`input input-bordered w-full ${
                post.author === "" && "input-error"
              }`}
            />
            <input
              name="cover"
              placeholder="Enter image URL here"
              value={post.cover}
              onChange={handleEditing}
              className={`input input-bordered w-full ${
                post.cover === "" && "input-error"
              }`}
            />
            <textarea
              name="content"
              value={post.content}
              onChange={handleEditing}
              className={`textarea textarea-bordered h-56 resize-none ${
                post.content === "" && "textarea-error"
              }`}
              placeholder="Enter the content here"
            ></textarea>
          </div>
          <div className="flex gap-2 items-end">
            <button
              type="submit"
              className="btn btn-success w-fit px-8"
              onClick={handleSave}
            >
              Save
            </button>
            <button className="btn btn-error" onClick={handleDelete}>
              Delete
            </button>
            <button
              className="btn btn-neutral w-fit px-6"
              onClick={() => {
                window.location.reload();
              }}
            >
              Cancel
            </button>
          </div>
        </div>
      </>
    );

  return (
    <div className="bg-base-100 min-h-screen">
        <div className="text-neutral-content flex justify-center flex-col bg-base-300 bg-opacity-20 backdrop-blur-lg max-w-[1200px] p-8 m-auto mt-20 rounded-lg shadow-lg">
          {post.cover && (
            <img
              src={post.cover}
              alt="Cover"
              className="w-full h-auto max-h-64 object-cover rounded-t-lg"
            />
          )}
          <div className='p-4'>
            <h2 className="text-3xl font-bold">{post.title}</h2>
            <p className="mt-2 text-justify">{post.content}</p>
            {post.author && (
              <p className="mt-4 mb-2">
                <strong className=''>Author:</strong>{" "}
                {post.author}
              </p>
            )}
            <div className="justify-end">
              <button
                className="btn btn-outline"
                onClick={() => {
                  setEditMode(true);
                }}
              >
                Edit
              </button>{" "}
              {/* Edit button */}
              <button
                className="btn btn-outline btn-error"
                onClick={handleDelete}
              >
                Delete
              </button>{" "}
              {/* Delete button */}
            </div>
          </div>
        </div>
      </div>
  );
}

export default PostDetails;
