export const useGetUserID = () => {
  return window.localStorage.getItem("token");
};
