import { useEffect, useState } from "react";
import { Container, PostForm } from "../components";
import databaseService from "../appwrite/dbconfig";
import { useNavigate, useParams } from "react-router-dom";
import SkeletonEditPost from "../components/skeleton/SkeletonEditPost";

const EditPost = () => {
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  const { slug } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (slug) {
      databaseService.getPost(slug).then((post) => {
        if (post) {
          setPost(post);
          setLoading(false);
        }
      });
    } else {
      navigate("/");
    }
  }, [slug, navigate]);

  if (loading) {
    return (
      <div className="w-full py-8 mt-0 bg-gray-200">
        <Container>
          <div className="flex flex-wrap">
            <SkeletonEditPost />
          </div>
        </Container>
      </div>
    );
  }

  return post ? (
    <div className="py-8">
      <Container>
        <PostForm post={post} />
      </Container>
    </div>
  ) : null;
};

export default EditPost;
