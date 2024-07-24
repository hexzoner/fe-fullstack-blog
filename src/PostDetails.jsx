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
        <div className="bg-white p-10 rounded-lg shadow-2xl mt-20">
          <h2 className="text-3xl text-gray-900 font-bold">Post Details</h2>
          <p className="mt-2 text-gray-600">This is the post details page</p>
        </div>
      </div>
    </div>
  );
}

export default PostDetails;
