import { useCallback, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Button, Input, RTE, SelectField } from "../index";
import databaseService from "../../appwrite/dbconfig";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";

export default function PostForm({ post }) {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    control,
    getValues,
    formState: { errors },
  } = useForm({
    defaultValues: {
      blog_title: post?.blog_title || "",
      slug: post?.$id || "",
      blog_content: post?.blog_content || "",
      status: post?.status || "active",
      author_name: post?.author_name || "",
    },
  });

  const navigate = useNavigate();
  const userData = useSelector((state) => state.auth.userData);

  const submit = async (data) => {
    try {
      const file = data.image?.[0]
        ? await databaseService.uploadFile(data.image[0])
        : null;

      if (post) {
        const updatedPost = await databaseService.updatePost(post.$id, {
          blog_title: data.blog_title,
          blog_content: data.blog_content,
          blog_img: file ? file.$id : post.blog_img,
          status: data.status,
          author_name: data.author_name,
        });

        if (file) {
          databaseService.deleteFile(post.blog_img);
        }

        if (updatedPost) {
          toast.success("Post updated successfully!");
          navigate(`/post/${updatedPost.$id}`);
        }
      } else {
        const newPost = {
          blog_title: data.blog_title,
          slug: data.slug,
          blog_content: data.blog_content,
          blog_img: file ? file.$id : "",
          status: data.status,
          userID: userData?.$id,
          author_name: data.author_name,
        };

        const createdPost = await databaseService.createPost(newPost);

        if (createdPost) {
          toast.success("Post created successfully!");
          navigate(`/post/${createdPost.$id}`);
        }
      }
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
      console.error("Error submitting post:", error);
    }
  };

  const slugTransform = useCallback((value) => {
    return value
      ?.trim()
      .toLowerCase()
      .replace(/[^a-zA-Z\d\s]+/g, "-")
      .replace(/\s/g, "-");
  }, []);

  useEffect(() => {
    const subscription = watch((value, { name }) => {
      if (name === "blog_title") {
        setValue("slug", slugTransform(value.blog_title), {
          shouldValidate: true,
        });
      }
    });

    return () => subscription.unsubscribe();
  }, [watch, slugTransform, setValue]);

  return (
    <form
      onSubmit={handleSubmit(submit)}
      className="flex flex-wrap  gap-6 bg-white shadow-md rounded-lg p-6"
    >
      <div className="w-full md:w-2/4">
        <Input
          label="Title"
          placeholder="Enter blog title"
          className="mb-4"
          {...register("blog_title", { required: "Title is required" })}
        />
        {errors.blog_title && (
          <p className="text-red-500 text-sm">{errors.blog_title.message}</p>
        )}

        <Input
          label="Slug"
          placeholder="Slug"
          className="mb-4"
          {...register("slug", { required: "Slug is required" })}
          onInput={(e) =>
            setValue("slug", slugTransform(e.currentTarget.value), {
              shouldValidate: true,
            })
          }
        />
        {errors.slug && (
          <p className="text-red-500 text-sm">{errors.slug.message}</p>
        )}

        <RTE
          label="Content"
          name="blog_content"
          control={control}
          defaultValue={getValues("blog_content")}
        />
      </div>

      <div className="w-full  md:w-1/4">
        <Input
          label="Featured Image"
          type="file"
          className="mb-4"
          accept="image/png, image/jpg, image/jpeg, image/gif"
          {...register("image", { required: !post && "Image is required" })}
        />
        {errors.image && (
          <p className="text-red-500 text-sm">{errors.image.message}</p>
        )}
        {post && (
          <div className="w-full mb-4">
            <img
              src={databaseService.getFilePreview(post.blog_img)}
              alt={post.blog_title}
              className="rounded-lg w-full h-40 object-cover"
            />
          </div>
        )}
        <Input
          label="Author Name"
          placeholder="Enter author name"
          className="mb-4"
          {...register("author_name", { required: true })}
        />

        {errors.author_name && (
          <p className="text-red-500 text-sm">{errors.author_name.message}</p>
        )}
        <SelectField
          options={["active", "inactive"]}
          label="Status"
          className="mb-4"
          {...register("status", { required: "Status is required" })}
        />
        {errors.status && (
          <p className="text-red-500 text-sm">{errors.status.message}</p>
        )}
        <Button
          type="submit"
          bgColor={post ? "bg-green-500" : "bg-blue-600"}
          className="w-full"
          text={post ? "Update" : "Submit"}
        />
      </div>
    </form>
  );
}
