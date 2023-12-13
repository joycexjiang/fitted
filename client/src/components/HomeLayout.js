import React from "react";
import Post from "./Post";
import { Callout } from "@radix-ui/themes";
import { InfoCircledIcon } from "@radix-ui/react-icons";

function HomeLayout({ posts }) {
  const getRandomSize = () => {
    const sizes = ["small", "medium", "large"];
    return sizes[Math.floor(Math.random() * sizes.length)];
  };

  return (
    <div style={styles.post_container}>
      {posts.length > 0 ? (
        posts.map((post) => (
          <Post
            key={post._id}
            size={getRandomSize()}
            imageUrl={post.imageUrl}
            description={post.description}
            tags={post.tags}
            date={post.date}
            // Add other necessary props from the post object
          />
        ))
      ) : (
        <div className="min-w-full min-h-full justify-center px-6 py-12">
          <Callout.Root>
            <Callout.Icon>
              <InfoCircledIcon />
            </Callout.Icon>
            <Callout.Text>no posts found :( add one now!</Callout.Text>
          </Callout.Root>
        </div>
      )}
    </div>
  );
}

const styles = {
  post_container: {
    margin: 0,
    padding: 0,
    width: "80vw",
    position: "absolute",
    left: "50%",
    transform: "translateX(-50%)",
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, 250px)",
    gridAutoRows: "10px",
  },
};

export default HomeLayout;
