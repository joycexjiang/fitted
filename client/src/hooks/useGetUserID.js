// export const useGetUserID = () => {
//   return localStorage.getItem("userID");
// };

export const useGetUserID = () => {
  const storedUser = localStorage.getItem("user");
  if (storedUser) {
    const user = JSON.parse(storedUser);
    console.log(user._id);
    return user._id; // Assuming the user object has the "_id" field
  }
  return null; // or handle the case where the user ID is not found
};
