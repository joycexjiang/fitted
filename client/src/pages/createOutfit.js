import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useGetUserID } from "../hooks/useGetUserID";
import { useCookies } from "react-cookie";
import TagInput from "../components/TagInput";
//ICONS
import { Cross1Icon } from "@radix-ui/react-icons";
import { useFloating } from "@floating-ui/react";

export const CreateOutfit = () => {
  //TAGS
  const [tags, setTags] = useState([]);

  const addTag = (newTag) => {
    setTags([...tags, newTag]);
  };

  const removeTag = (indexToRemove) => {
    const updatedTags = tags.filter((_, index) => index !== indexToRemove);
    setTags(updatedTags);
  };

  const [selectedImage, setSelectedImage] = useState(null);
  const userID = useGetUserID();
  const [cookies, _] = useCookies(["access_token"]);

  const navigate = useNavigate();

  const [post, setPost] = useState({
    description: "",
    date: new Date(),
    tags: [],
    imageUrl: selectedImage,
    userOwner: userID, // Replace with an actual user ID from your application
  });

  const handleChange = (event) => {
    const { description, value } = event.target;
    setPost({ ...post, [description]: value });

    // e.preventDefault();
    // // Handle form submission (sending data to the server)
    // const formData = {
    //   description,
    //   date,
    //   tags: tags.split(",").map((tag) => tag.trim()),
    //   imageUrl,
    //   userOwner,
    // };
    // console.log("Form Data:", setPost);
    // Send formData to the server using fetch or any other library (e.g., axios)
  };

  const handleTagsChange = (event, idx) => {
    const { value } = event.target;
    const tags = post.tags;
    tags[idx] = value;
    setPost({ ...post, tags });
    // tags.split(",").map((tag) => tag.trim()), (tags[idx] = value);

    // console.log(post);
    // const tags = addIngredient(e.target.value);
  };

  const addTags = () => {
    const tags = [...post.tags, ""];
    setPost({ ...post, tags });
  };

  const handleImageChange = (e) => {
    const file = URL.createObjectURL(e.target.files[0]);
    setSelectedImage(file);
    console.log("Selected File:", file);
  };

  //   const onDrop = (acceptedFiles) => {
  //     const file = acceptedFiles[0];
  //     // Here, you can handle the image upload logic, such as uploading to a server or displaying the image preview
  //     console.log("Uploaded file:", file);
  //   };

  //   const { getRootProps, getInputProps } = useDropzone({ onDrop });

  const onSubmit = async (event) => {
    event.preventDefault();
    try {
      const formData = new FormData();
      formData.append("image", selectedImage); // Append the selected image to the form data
      formData.append("description", post.description);
      formData.append("date", post.date);
      formData.append("tags", JSON.stringify(post.tags));
      formData.append("userOwner", post.userOwner);

      await axios.post("http://localhost:3001/posts", formData, {
        headers: {
          authorization: cookies.access_token,
          "Content-Type": "multipart/form-data", // Set content type for form data
        },
      });

      alert("post created!");
      navigate("/");
    } catch (error) {
      console.error(error, "error in submitting");
    }
  };

  return (
    <div className="flex min-h-full flex-1  flex-col justify-center px-6 py-12 lg:px-8">
      {/* HEADER */}
      <div className="sm:mx-auto sm:w-full sm:max-w-sm ">
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          create a new post
        </h2>
      </div>
      <div className="flex flex-0 flex-col lg:flex-row justify-center px-6 py-12 lg:px-8">
        <div className="sm:w-1/2">
          {" "}
          {/* Image Upload */}
          <div className="cursor-pointer w-full relative overflow-hidden">
            <label
              htmlFor="imageUpload"
              className="flex justify-center items-center w-full h-full bg-white border-dashed border-4 border-gray-300 rounded-md px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 relative z-10"
              style={{ height: "25rem", position: "relative" }} // Adjust height and other styles as needed
            >
              <span className="block pointer-events-none">
                {selectedImage ? "Uploaded" : "Upload Pic"}
              </span>
              <input
                type="file"
                id="imageUpload"
                name="image"
                accept="image/*"
                onChange={handleImageChange}
                className="absolute inset-0 opacity-0 w-full h-full cursor-pointer top-0 left-0 z-20"
              />
            </label>
          </div>
        </div>

        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" onSubmit={onSubmit}>
            <div>
              <label
                htmlFor="Name"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                description
              </label>
              <div className="mt-2">
                <textarea
                  type="text"
                  id="description"
                  name="description"
                  onChange={handleChange}
                  required
                  className="block w-full p-3 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="date"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                date
              </label>
              <div className="mt-2">
                {/* <input
                type="text"
                id="date"
                name="date"
                // value={date}
                onChange={handleChange}
                className="block w-full p-3 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              /> */}

                <input
                  name="date"
                  onChange={handleChange}
                  type="date"
                  className="block w-full p-3 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
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
                    className="bg-indigo-200 rounded-full px-3 py-1 text-sm text-indigo-800 mr-2 mt-2 flex items-center border border-indigo-300"
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
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                post
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateOutfit;
