import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import databaseService from "../appwrite/dbconfig";
import { Container, PostCard } from "../components";
import SkeletonPostCard from "../components/skeleton/SkeletonPostCard";
import { useSelector } from "react-redux";

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const authStatus = useSelector((state) => state.auth.status);

  useEffect(() => {
    databaseService.getPosts().then((posts) => {
      if (posts) {
        setPosts(posts.documents);
        setLoading(false);
      }
    });
  }, []);

  if (!authStatus) {
    return (
      <div className="w-full  py-8 mt-0 text-center bg-fuchsia-400">
        <Container>
          <div className="flex flex-wrap ">
            <div className="p-2 w-full">
              <h1 className="text-2xl font-bold hover:text-gray-500">
                Login to read posts
              </h1>
            </div>
          </div>
        </Container>
      </div>
    );
  }

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

  return (
    <div className="w-full py-8 bg-orange-200">
      <Container>
        <div className="flex  flex-col sm:flex-row justify-center items-center sm:justify-start">
          {posts.map((post) => (
            <div key={post.$id} className="p-2 sm:w-1/4 w-3/4">
              <Link to="/login">
                <PostCard {...post} />
              </Link>
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
};

export default Home;
