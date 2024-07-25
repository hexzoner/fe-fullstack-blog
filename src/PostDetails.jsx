import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

 function PostDetails() {
    const { id } = useParams(); 
    const [post, setPost] = useState(null); 
    const [loading, setLoading] = useState(true); 
    const [error, setError] = useState(null); 

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

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!post) return <div>No post found.</div>;
   
  return (
    <div className="bg-gradient-to-r from-green-400 to-blue-500 min-h-screen">
      <div className="flex justify-center">
        <div className="flex bg-white bg-opacity-20 backdrop-blur-lg min-w-[900px] m-auto mt-20">
          {post.cover && (
              <img
                src={post.cover}
                alt="Cover"
                className="w-1/3 p-4 rounded-t-lg" 
              />
          )}
          <div className='w-2/3'>
            <h2 className="text-3xl text-gray-900 font-bold">{post.title}</h2>
            <p className="mt-2 text-gray-600">{post.content}</p>
            {post.author && (
              <p className="mt-4 text-gray-500">
                <strong className='text-slate-800'>Author:</strong> {post.author}
              </p>
            )}
            <div className="justify-end">
              <button className="btn border-0 bg-green-400 hover:bg-green-600 text-white ml-2">Edit</button> {/* Edit button */}
              <button className="btn border-0 bg-cyan-600 hover:bg-sky-700 text-white ml-2">Delete</button> {/* Delete button */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PostDetails;
