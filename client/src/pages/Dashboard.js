import { useState, useEffect } from "react";
import axios from "axios";
import { useGetUserID } from "../hooks/useGetUserID";
import { Callout } from "@radix-ui/themes";
import { InfoCircledIcon } from "@radix-ui/react-icons";

export const Home = () => {
  const [posts, setPosts] = useState("");
  const [loading, setLoading] = useState(true);
  const userID = useGetUserID();

  useEffect(() => {
    const fetchUserPosts = async () => {
      try {
        // Fetch the user ID from your authentication method
        const userId = userID; // Assuming you store user ID in localStorage

        // Make an API request to fetch user posts
        const response = await axios.get(
          `http://localhost:3001/outfits/posts/${userId}`
        );
        console.log("Response", response);
        setPosts(response.data.posts);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching user posts:", error);
        setLoading(false);
      }
    };

    fetchUserPosts();
  }, []); // Fetch user posts when the component mounts

  return (
    <div className="w-full h-screen flex justify-center items-center">
      <ul>
        {Array.isArray(posts) && posts.length > 0 ? (
          posts.map((post) => (
            <div key={post._id}>
              <img src={post.imageUrl} alt={post.description} />
              <p>{post.description}</p>
              {/* Render other post details as needed */}
            </div>
          ))
        ) : (
          <Callout.Root>
            <Callout.Icon>
              <InfoCircledIcon />
            </Callout.Icon>
            <Callout.Text>no posts found :( add one now!</Callout.Text>
          </Callout.Root>
        )}
      </ul>
    </div>
  );
};

export default Home;
