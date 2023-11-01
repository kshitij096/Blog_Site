import { useState, useEffect } from "react";
import databaseService from "../appwrite/dbconfig";
import { Container, PostCard } from "../components";
import SkeletonPostCard from "../components/skeleton/SkeletonPostCard";

const AllPosts = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {}, []);
  databaseService.getPosts([]).then((posts) => {
    if (posts) {
      setPosts(posts.documents);
      setLoading(false);
    }
  });

  if (loading) {
    return (
      <div className="w-full py-8 mt-0 bg-gray-200">
        <Container>
          <div className="flex flex-wrap ">
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
        <div className="flex flex-wrap flex-col sm:flex-row justify-center items-center sm:justify-start ">
          {posts.map((post) => (
            <div key={post.$id} className="p-2 wsm:w-1/4 w-3/4">
              <PostCard {...post} />
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
};

export default AllPosts;
