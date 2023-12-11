import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

function CreateOutfit() {
  const [post, setPost] = useState({
    description: "",
    date: new Date(),
    tags: [],
    imageUrl: "",
    userOwner: 0, // Replace with an actual user ID from your application
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
    // tags.split(",").map((tag) => tag.trim()), (tags[idx] = value);
    setPost({ ...post, tags });
    // console.log(post);
    // const tags = addIngredient(e.target.value);
  };

  const addTags = () => {
    setPost({ ...post });
  };

  //   const onDrop = (acceptedFiles) => {
  //     const file = acceptedFiles[0];
  //     // Here, you can handle the image upload logic, such as uploading to a server or displaying the image preview
  //     console.log("Uploaded file:", file);
  //   };

  //   const { getRootProps, getInputProps } = useDropzone({ onDrop });
  console.log(post);

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          create a new post
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-6" onSubmit={handleChange}>
          <div>
            <label
              htmlFor="Name"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              description
            </label>
            <div className="mt-2">
              <input
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
              <input
                type="text"
                id="date"
                name="date"
                // value={date}
                onChange={handleChange}
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
            <div className="mt-2">
              {post.tags.map((tag, idx) => (
                <input
                  key={idx}
                  type="text"
                  id="tags"
                  name="tags"
                  value={tag}
                  onChange={(event) => handleTagsChange(event, idx)}
                  placeholder="Separate tags with commas"
                  className="block w-full p-3 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              ))}
            </div>
          </div>

          {/* //add tags ?? */}

          <button onClick={addTags} type="button">
            {" "}
            add ingredient{" "}
          </button>

          <div>
            <label
              htmlFor="imageUrl"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              upload image
            </label>
            <div className="mt-2">
              <input
                // value={imageUrl}
                type="text"
                onChange={handleChange}
                id="image"
                name="image"
                className="block w-full p-3 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
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
  );
}

export default CreateOutfit;
