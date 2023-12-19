import User from "../models/user";

export const formateData = (string: string) => {
  const array = string.trim().split(" ");

  for (let i = 0; i < array.length; i++) {
    array[i] =
      array[i][0].toUpperCase() + array[i].slice(1).toLocaleLowerCase();
  }

  return array.join(" ");
};

export const findUser = async (email: string) => {
  const user = User.findOne({ email });
  return user;
};
