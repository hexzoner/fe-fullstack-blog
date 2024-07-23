import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import defaultPlaceholder from "./assets/placeholder-image.jpg";

export default function Home() {
  const [posts, setPosts] = useState([]);
  const url = "http://localhost:3000/posts";
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    document.querySelector("html").setAttribute("data-theme", "dim");
    setLoading(true);
    axios
      .get(url, { params: { limit: 16 } })
      .then((res) => {
        setPosts(res.data);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen text-center flex flex-col items-center justify-center ">
        <span className="loading loading-spinner loading-lg scale-150"></span>
      </div>
    );
  }

  return (
    <div className="bg-base-100 min-h-screen">
      {posts.length == 0 ? (
        <div className="flex justify-center">
          <div className="bg-neutral-content p-10 rounded-lg shadow-2xl mt-20">
            <h2 className="text-3xl text-neutral font-bold">Welcome to Fullstack Blog</h2>
            <p className="mt-2 text-neutral text-center">No Blogs available at the moment.</p>
          </div>
        </div>
      ) : (
        <div className="py-12 grid grid-cols-4 max-w-[1200px] m-auto gap-3">
          {posts.map((post) => {
            return <PostCard key={post.id} post={post} />;
          })}
        </div>
      )}
    </div>
  );
}

const PostCard = ({ post: { id, title, author, content, cover, date } }) => {
  const [noImage, setNoImage] = useState(false);

  function handleError(e) {
    // e.target.src = defaultPlaceholder;
    setNoImage(true);
  }

  const _date = new Date(date);
  const _localDate = _date.toLocaleString("en-GB", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
    timeZone: "Europe/London",
  });
  // const formattedDate = date.split("T")[0];
  // const formattedTime = date.split("T")[1].slice(0, 5);

  return (
    <Link to={`post/${id}`}>
      <div className="card bg-base-300 max-w-96 shadow-xl h-[24rem] hover:cursor-pointe border-2 border-primary border-opacity-0 hover:border-opacity-60">
        <figure>{noImage ? <NoImage /> : <img onError={handleError} className="object-cover w-full h-48" src={cover} alt={title} />}</figure>
        <div className="card-body">
          <h2 className="card-title text-base text-ellipsis overflow-hidden">{title}</h2>
          <p className="text-sm text-ellipsis overflow-hidden max-h-16">{content}</p>
          <div className="card-actions justify-end">
            <div className="badge badge-outline badge-success">By: {author}</div>
            <div className="badge badge-outline badge-warning">Posted on: {_localDate}</div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export function NoImage() {
  return (
    <svg className="fill-current stroke-none" width="200px" height="200px" viewBox="0 -0.5 17 17" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
      <g transform="translate(0.000000, 2.000000)">
        <path d="M13.438,11.944 L2.557,11.944 C1.163,11.944 0.029,10.781 0.029,9.353 L0.029,2.603 C0.029,1.173 1.164,0.012 2.557,0.012 L13.438,0.012 C14.831,0.012 15.965,1.173 15.965,2.603 L15.965,9.353 C15.965,10.781 14.83,11.944 13.438,11.944 L13.438,11.944 Z M2.237,0.979 C1.537,0.979 0.965,1.593 0.965,2.35 L0.965,9.668 C0.965,10.425 1.537,11.039 2.237,11.039 L13.754,11.039 C14.456,11.039 15.027,10.425 15.027,9.668 L15.027,2.35 C15.027,1.593 14.456,0.979 13.754,0.979 L2.237,0.979 L2.237,0.979 Z"></path>
        <ellipse cx="5.471" cy="3.461" rx="1.471" ry="1.461"></ellipse>
        <path d="M11.234,3.037 L13.994,9.988 L2.021,9.988 L5.497,5.98 L8.614,6.924 L11.234,3.037 Z"></path>
      </g>
    </svg>
  );
}
