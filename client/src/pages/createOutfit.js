import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useGetUserID } from "../hooks/useGetUserID";
import TagInput from "../components/TagInput";
import { Button, Card, Text } from "@radix-ui/themes";

//ICONS
import { Cross1Icon } from "@radix-ui/react-icons";
import { useFloating } from "@floating-ui/react";
import Datepicker from "react-tailwindcss-datepicker";
import { FileUploader } from "baseui/file-uploader";
const token = localStorage.getItem("token");

export const CreateOutfit = () => {
  const navigate = useNavigate();

  //DATEPICKER
  const [date, setDateValue] = useState({
    startDate: new Date(),
    endDate: new Date().setMonth(11),
  });

  const handleDateValueChange = (newValue) => {
    console.log("newValue:", newValue);
    setDateValue(newValue);
  };

  //TAGS
  const [tags, setTags] = useState([]);

  const addTag = (newTag) => {
    setTags([...tags, newTag]);
  };

  const removeTag = (indexToRemove) => {
    const updatedTags = tags.filter((_, index) => index !== indexToRemove);
    setTags(updatedTags);
  };

  const handleTagsChange = (event, idx) => {
    const { value } = event.target;
    const updatedTags = [...tags]; // Make a copy of the current tags array
    updatedTags[idx] = value; // Update the value at the specified index
    setPost({ ...post, tags: updatedTags }); // Update the post state with the updated tags
  };

  const addTags = () => {
    const updatedTags = [...tags, ""];
    setTags(updatedTags);
    setPost({ ...post, tags: updatedTags });
  };

  //IMAGE UPLOAD
  const [selectedImage, setSelectedImage] = useState(null);

  // Get user ID from localStorage
  const userID = useGetUserID();

  //form submission?
  const [post, setPost] = useState({
    description: "",
    date: new Date(),
    tags: [],
    imageUrl: "",
    userOwner: userID,
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setPost({ ...post, [name]: value });
  };

  const handleImageChange = (e) => {
    const file = URL.createObjectURL(e.target.files[0]);
    setSelectedImage(file);
    setPost({ ...post, imageUrl: file });
    console.log("Selected File:", file);
  };

  const onSubmit = async (event) => {
    event.preventDefault();

    try {
      const formattedPost = {
        description: post.description,
        date: post.date,
        tags: tags,
        imageUrl: post.imageUrl,
        userOwner: post.userOwner, // Assuming this holds the user ID
      };

      console.log("Formatted Post:", formattedPost);

      // Send outfit post data to your backend
      const response = await axios.post(
        "http://localhost:3001/outfits/",
        formattedPost,
        {
          headers: {
            // Include any necessary headers
            Authorization: `Bearer ${token}`, // Include authorization token if required
          },
        }
      );

      // Assuming the response.data contains the newly created outfit
      const createdOutfitId = response.data._id;

      // Now update the user's posts array with the created outfit's ID
      await axios.put(`http://localhost:3001/outfits/${userID}/addpost`, {
        postId: createdOutfitId,
      });

      navigate("/");
      console.log("Outfit post created:", response.data);
    } catch (error) {
      console.error(error, "error in submitting");
    }
  };

  return (
    <div className="flex min-h-full flex-1 items-center flex-col justify-center px-6 py-12 lg:px-8">
      {/* HEADER */}
      <div className="sm:mx-auto sm:w-full sm:max-w-sm ">
        <h2 className="text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          create a new post
        </h2>
      </div>

      <div className="flex flex-0 space-y-6 mt-6 w-2/5 flex-col items-center">
        {/* Image Upload */}
        <div className="w-full sm:mx-auto sm:w-full sm:max-w-sm">
          <div className="flex min-h-full flex-1 justify-center items-center space-y-6 flex-col px-6 py-12 lg:px-8 bg-gray-100 border-2 border-dashed border-gray-300 rounded-lg">
            <Text size="1">add files here to upload </Text>
            <Button variant="soft" color="crimson" radius="full">
              <label
                htmlFor="imageUpload"
                className="ImageUploadLabel"
                style={{ cursor: "pointer" }} // Apply cursor pointer on hover
              >
                {selectedImage ? "uploaded!" : "browse files"}
              </label>
              <input
                type="file"
                id="imageUpload"
                name="image"
                accept="image/*"
                onChange={handleImageChange}
                style={{ display: "none" }}
              />
            </Button>
          </div>
        </div>

        <div className="w-full sm:mx-auto sm:w-full sm:max-w-sm">
          {/* // */}
          <form className="space-y-6" onSubmit={onSubmit}>
            <div>
              <label className="block text-sm font-medium leading-6 text-gray-900">
                description
              </label>
              <div className="mt-2">
                <textarea
                  type="text"
                  id="description"
                  name="description"
                  onChange={handleChange}
                  placeholder={"write a description of this outfit °•. ✿ .•°"}
                  required
                  className=" w-full p-3 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium leading-6 text-gray-900">
                date
              </label>
              <div className="mt-2">
                <Datepicker
                  primaryColor={"fuchsia"}
                  asSingle={true}
                  useRange={false}
                  value={date}
                  onChange={handleDateValueChange}
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="tags"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                tags
              </label>
              <div className="mt-2 flex flex-wrap ">
                {tags.map((tag, idx) => (
                  <div
                    key={idx}
                    className="bg-indigo-200 rounded-full px-3 py-1 text-sm text-indigo-800 mr-2 mt-2 flex items-centerborder-indigo-300"
                  >
                    <span>{tag}</span>
                    <button
                      type="button"
                      onClick={() => removeTag(idx)}
                      className="ml-2 focus:outline-none text-indigo-600 hover:text-indigo-800"
                    >
                      <Cross1Icon />
                    </button>
                  </div>
                ))}
                <TagInput onAddTag={addTag} />{" "}
                {/* Render the TagInput component */}
              </div>
            </div>

            <div>
              <Button
                type="submit"
                color="crimson"
                variant="soft"
                highContrast
                radius="md"
                className="flex w-full"
              >
                post
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateOutfit;
