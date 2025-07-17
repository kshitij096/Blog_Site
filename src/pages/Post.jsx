/* ✅ UPDATED: Post.jsx to allow public view but protect full content + toast on login prompt */

import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import databaseService from "../appwrite/dbconfig";
import { Button, Container } from "../components";
import parse from "html-react-parser";
import { useSelector } from "react-redux";
import SkeletonPostCard from "../components/skeleton/SkeletonPostCard";
import toast, { Toaster } from "react-hot-toast";

export default function Post() {
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  const { slug } = useParams();
  const navigate = useNavigate();

  const [userChecked, setUserChecked] = useState(false);
  const userData = useSelector((state) => state.auth.userData);

  // Add this to useEffect
  useEffect(() => {
    if (slug) {
      databaseService.getPost(slug).then((post) => {
        if (post) {
          setPost(post);
          setLoading(false);
        } else navigate("/");
      });
    } else navigate("/");
  }, [slug, navigate]);

  useEffect(() => {
    if (userData !== undefined) {
      setUserChecked(true);
    }
  }, [userData]);

  if (loading) {
    return (
      <div className="w-full py-8 mt-0 bg-gray-200">
        <Container>
          <div className="flex flex-wrap justify-center items-center">
            <SkeletonPostCard />
          </div>
        </Container>
      </div>
    );
  }

  // const deletePost = () => {
  //   databaseService.deletePost(post.$id).then((status) => {
  //     if (status) {
  //       databaseService.deleteFile(post.blog_img);
  //       navigate("/");
  //     }
  //   });
  // };

  // const isAuthor = post && userData ? post.userID === userData.$id : false;

  const handleLoginRedirect = () => {
    toast("Please login to read the full post", {
      icon: "🔒",
      position: "top-center",
      duration: 2000,
    });
    navigate("/login");
  };

  return post ? (
    <div className="py-8 bg-orange-300">
      <Container>
        <Toaster />
        <div className="w-full sm:w-96 mx-auto flex justify-center mb-4 relative border rounded-xl p-2">
          <img
            src={databaseService.getFilePreview(post.blog_img)}
            alt={post.blog_title}
            className="rounded-xl w-full sm:w-96"
          />

          {/* {isAuthor && (
            <div className="absolute right-6 top-6">
              <Link to={`/edit-post/${post.$id}`}>
                <Button bgColor="bg-green-500" className="mr-3" text="Edit" />
              </Link>
              <Button bgColor="bg-red-500" text="Delete" onClick={deletePost} />
            </div>
          )} */}
        </div>
        <div className="w-full mb-6">
          <h1 className="text-2xl font-bold text-center">{post.blog_title}</h1>
        </div>
        <div className="browser-css text-center">
          {userChecked ? (
            userData ? (
              parse(post.blog_content)
            ) : (
              <div className="text-center">
                <p className="text-lg font-medium mb-4 text-red-700">
                  Please login to read the full content.
                </p>
                <Button text="Login" onClick={handleLoginRedirect} />
              </div>
            )
          ) : (
            <p className="text-gray-600">Checking login status...</p>
          )}
        </div>
      </Container>
    </div>
  ) : null;
}
