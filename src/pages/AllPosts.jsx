import { useState, useEffect } from "react";
import databaseService from "../appwrite/dbconfig";
import { Container, PostCard } from "../components";
import SkeletonPostCard from "../components/skeleton/SkeletonPostCard";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";

const AllPosts = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    databaseService.getPosts().then((posts) => {
      if (posts) {
        setPosts(posts.documents);
        setLoading(false);
      }
    });
  }, []);

  const slideLeft = () => {
    var slider = document.getElementById("slider");
    slider.scrollLeft = slider.scrollLeft - 500;
  };
  const slideRight = () => {
    var slider = document.getElementById("slider");
    slider.scrollLeft = slider.scrollLeft + 500;
  };

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
    <div className="w-full py-8 px-20 bg-orange-200">
      <Container>
        <div
          id="slider"
          className="flex relative  group flex-col sm:flex-row justify-center items-center sm:justify-start "
        >
          <MdChevronLeft
            onClick={slideLeft}
            className="bg-white left-0 rounded-full absolute opacity-50 hover:opacity-100 cursor-pointer z-10 hidden group-hover:block"
            size={40}
          />
          {posts.map((post) => (
            <div key={post.$id} className="p-2 sm:w-1/4 w-3/4">
              <PostCard {...post} />
            </div>
          ))}
          <MdChevronRight
            onClick={slideRight}
            className="bg-white right-0 rounded-full absolute opacity-50 hover:opacity-100 cursor-pointer z-10 hidden group-hover:block"
            size={40}
          />
        </div>
      </Container>
    </div>
  );
};

export default AllPosts;
