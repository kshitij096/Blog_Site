import { useEffect, useState } from "react";
import databaseService from "../appwrite/dbconfig";
import { Container, PostCard } from "../components";
import SkeletonPostCard from "../components/skeleton/SkeletonPostCard";
import Pagination from "../components/Pagination/Pagination";

const AllPosts = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const POSTS_PER_PAGE = 10;

  const fetchPosts = async (pageNumber = 1) => {
    setLoading(true);
    const offset = (pageNumber - 1) * POSTS_PER_PAGE;

    const queries = [
      databaseService.Query.equal("status", "active"),
      databaseService.Query.limit(POSTS_PER_PAGE),
      databaseService.Query.offset(offset),
    ];

    try {
      const result = await databaseService.getPosts(queries);
      if (result) {
        setPosts(result.documents);
        setTotalPages(Math.ceil(result.total / POSTS_PER_PAGE));
      }
    } catch (error) {
      console.error("Error fetching posts:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts(page);
  }, [page]);

  return (
    <div className="w-full py-8 px-4 sm:px-6 md:px-8 bg-orange-100 min-h-screen">
      <Container>
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-6">
          All Blog Posts
        </h1>

        {loading ? (
          <div className=" grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {Array.from({ length: 4 }).map((_, index) => (
              <SkeletonPostCard key={index} />
            ))}
          </div>
        ) : posts.length === 0 ? (
          <div className="text-center text-gray-600 text-lg py-12">
            No posts available right now.
          </div>
        ) : (
          <>
            <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {posts.map((post) => (
                <PostCard
                  key={post.$id}
                  $id={post.$id}
                  blog_title={post.blog_title}
                  blog_img={post.blog_img}
                  author_name={post.author_name || "Unknown"}
                />
              ))}
            </div>
            <div className="mt-10 flex justify-center">
              <Pagination
                page={page}
                setPage={setPage}
                totalPages={totalPages}
                disabled={loading}
              />
            </div>
          </>
        )}
      </Container>
    </div>
  );
};

export default AllPosts;
