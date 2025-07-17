import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import databaseService from "../appwrite/dbconfig";
import { Container, Button } from "../components";
import SkeletonPostCard from "../components/skeleton/SkeletonPostCard";
import { Query } from "appwrite";
import toast, { Toaster } from "react-hot-toast";

const MyPosts = () => {
  const [myPosts, setMyPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const userData = useSelector((state) => state.auth.userData);
  const navigate = useNavigate();

  useEffect(() => {
    if (!userData) {
      toast.error("You must be logged in to access your posts.");
      navigate("/login");
      return;
    }

    const fetchMyPosts = async () => {
      try {
        const myRes = await databaseService.getPosts([
          Query.equal("userID", userData.$id),
        ]);
        if (myRes) setMyPosts(myRes.documents);
      } catch (error) {
        // console.error("Failed to load user's posts:", error);
        toast.error("Error loading your posts. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchMyPosts();
  }, [userData, navigate]);

  const handleDelete = (post) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this post?"
    );
    if (!confirmDelete) return;

    databaseService.deletePost(post.$id).then((status) => {
      if (status) {
        databaseService.deleteFile(post.blog_img);
        setMyPosts((prev) => prev.filter((p) => p.$id !== post.$id));
        toast.success("Post deleted successfully");
      } else {
        toast.error("Failed to delete the post");
      }
    });
  };

  return (
    <div className="w-full py-8 bg-orange-100 min-h-screen">
      <Container>
        <Toaster />
        <h2 className="text-xl font-semibold text-center mb-4">My Posts</h2>
        {loading ? (
          <div className="flex flex-wrap gap-4 justify-center">
            <SkeletonPostCard />
            <SkeletonPostCard />
          </div>
        ) : myPosts.length === 0 ? (
          <p className="text-center text-lg">
            You haven&apos;t created any posts yet.
          </p>
        ) : (
          <div className="flex flex-wrap gap-6 justify-center">
            {myPosts.map((post) => (
              <div
                key={post.$id}
                className="border rounded-lg p-4 w-80 bg-white shadow-md"
              >
                <img
                  src={databaseService.getFilePreview(post.blog_img)}
                  alt={post.blog_title}
                  className="rounded w-full h-40 object-cover mb-3"
                />
                <h2 className="font-bold text-lg mb-2">{post.blog_title}</h2>
                <div className="flex justify-between">
                  <Link to={`/edit-post/${post.$id}`}>
                    <Button
                      text="Edit"
                      bgColor="bg-green-500"
                      className="mr-2"
                    />
                  </Link>
                  <Button
                    text="Delete"
                    bgColor="bg-red-500"
                    onClick={() => handleDelete(post)}
                  />
                </div>
              </div>
            ))}
          </div>
        )}
      </Container>
    </div>
  );
};

export default MyPosts;
