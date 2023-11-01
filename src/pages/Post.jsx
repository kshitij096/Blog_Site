import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import databaseService from "../appwrite/dbconfig";
import { Button, Container } from "../components";
import parse from "html-react-parser";
import { useSelector } from "react-redux";
import SkeletonPostCard from "../components/skeleton/SkeletonPostCard";

export default function Post() {
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  const { slug } = useParams();
  const navigate = useNavigate();

  const userData = useSelector((state) => state.auth.userData);
  // console.log(userData);

  const isAuthor = post && userData ? post.userID === userData.$id : false;
  // console.log(post);

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

  if (loading) {
    return (
      <div className="w-full py-8 mt-0 bg-gray-200">
        <Container>
          <div className="flex flex-wrap">
            <SkeletonPostCard />
            <SkeletonPostCard />
            <SkeletonPostCard />
            <SkeletonPostCard />
          </div>
        </Container>
      </div>
    );
  }

  const deletePost = () => {
    databaseService.deletePost(post.$id).then((status) => {
      if (status) {
        databaseService.deleteFile(post.blog_img);
        navigate("/");
      }
    });
  };

  return post ? (
    <div className="py-8 bg-orange-300">
      <Container>
        <div className="w-96 mx-auto flex justify-center  mb-4 relative border rounded-xl p-2">
          <img
            src={databaseService.getFilePreview(post.blog_img)}
            alt={post.blog_title}
            className="rounded-xl w-96"
          />

          {isAuthor && (
            <div className="absolute right-6 top-6">
              <Link to={`/edit-post/${post.$id}`}>
                <Button bgColor="bg-green-500" className="mr-3">
                  Edit
                </Button>
              </Link>
              <Button bgColor="bg-red-500" onClick={deletePost}>
                Delete
              </Button>
            </div>
          )}
        </div>
        <div className="w-full mb-6 ">
          <h1 className="text-2xl font-bold text-center">{post.blog_title}</h1>
        </div>
        <div className="browser-css text-center">
          {parse(post.blog_content)}
        </div>
      </Container>
    </div>
  ) : null;
}
