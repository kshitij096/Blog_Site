import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import databaseService from "../appwrite/dbconfig";
import { Container, PostCard, Button } from "../components";
import SkeletonPostCard from "../components/skeleton/SkeletonPostCard";

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const userLoggedIn = useSelector((state) => state.auth.status);

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await databaseService.getPosts();
      if (response) {
        setPosts(response.documents.slice(0, 3)); // Only first 3 posts
      }
      setLoading(false);
    };

    fetchPosts();
  }, []);

  return (
    <div className="bg-orange-100 w-full min-h-screen pt-8 pb-16">
      {/* Banner for guests */}
      {!userLoggedIn && (
        <div className="bg-yellow-100 text-center py-3 mb-4">
          <p className="text-sm text-gray-800">
            Want to read full articles?{" "}
            <Link to="/login" className="underline text-blue-600">
              Login
            </Link>{" "}
            or{" "}
            <Link to="/signup" className="underline text-blue-600">
              Sign up
            </Link>
            .
          </p>
        </div>
      )}

      <Container>
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-2">
          Welcome to the Blog ✨
        </h1>
        <p className="text-center text-gray-600 mb-8 text-base">
          Dive into featured posts curated just for you!
        </p>

        {/* Featured Posts */}
        {loading ? (
          <div className="flex flex-wrap justify-center">
            <SkeletonPostCard />
            <SkeletonPostCard />
            <SkeletonPostCard />
          </div>
        ) : posts.length === 0 ? (
          <div className="text-center py-10 text-gray-600 text-lg font-medium">
            No posts available.
          </div>
        ) : (
          <div className="flex flex-wrap justify-center">
            {posts.map((post) => (
              <div key={post.$id} className="p-2 w-full  md:w-1/3 lg:w-1/4">
                <PostCard {...post} />
              </div>
            ))}
          </div>
        )}

        {/* CTA Button */}
        <div className="text-center mt-10">
          <Link to="/all-posts">
            <Button text="View All Posts" />
          </Link>
        </div>
      </Container>
    </div>
  );
};

export default Home;
