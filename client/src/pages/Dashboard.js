import React, { useState, useEffect } from "react";
import axios from "axios";
import { useGetUserID } from "../hooks/useGetUserID";
import { Callout } from "@radix-ui/themes";
import { InfoCircledIcon } from "@radix-ui/react-icons";
import "../App.css";
import HomeLayout from "../components/HomeLayout.js";

export const Home = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const userID = useGetUserID();

  useEffect(() => {
    const fetchUserPosts = async () => {
      try {
        const userId = userID;
        const response = await axios.get(
          `http://localhost:3001/outfits/posts/${userId}`
        );
        console.log("Fetched posts:", response.data.posts); // Log fetched posts
        setPosts(response.data.posts);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching user posts:", error);
        setLoading(false);
      }
    };

    fetchUserPosts();
  }, [userID]); // Include userID as a dependency in useEffect

  console.log("Posts:", posts); // Log posts state

  return (
    <div className="min-w-full min-h-full justify-center px-6 py-12 lg:px-8">
      <HomeLayout posts={posts} />
    </div>
  );
};

export default Home;
