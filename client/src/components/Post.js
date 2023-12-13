import React from "react";
import { Flex, Badge, Text, Em } from "@radix-ui/themes";

function Post(props) {
  return (
    <div
      style={{
        ...styles.post,
        ...styles[props.size],
      }}
    >
      <img src={props.imageUrl} alt={props.description} style={styles.image} />

      <Flex direction="column">
        <Text color="gray" size="6">
          <Em>{props.description}</Em>
        </Text>
        <Text color="gray" size="2">
          {new Date(props.date).toLocaleDateString()}
        </Text>
      </Flex>

      <div style={styles.tags}>
        <div style={styles.tagContainer}>
          {props.tags.map((tag, index) => (
            <Badge key={index} style={styles.tag}>
              {tag}
            </Badge>
          ))}
        </div>
      </div>
      {/* Render other post details as needed */}
    </div>
  );
}

const styles = {
  post: {
    margin: 10,
    padding: 10,
  },
  small: {
    gridRowEnd: "span 26",
  },
  medium: {
    gridRowEnd: "span 33",
  },
  large: {
    gridRowEnd: "span 45",
  },
  image: {
    width: "100%",
    height: "auto",
    borderRadius: 8,
    marginBottom: 10,
  },
  tags: {
    marginTop: 10,
  },
  tagContainer: {
    display: "flex",
    flexWrap: "wrap",
  },
  tag: {
    margin: "4px",
  },
};

export default Post;
