import { useCallback } from "react";
import { useForm } from "react-hook-form";
import { Button, Input, SelectField, RTE } from "./index";
import databaseService from "../../appwrite/dbconfig";
import { useNavigate } from "react-router-dom";
import { UseSelector } from "react-redux/";

const PostForm = () => {
  const {} = useForm();

  return <div>PostForm</div>;
};

export default PostForm;
