import { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
import databaseService from "../appwrite/dbconfig";
import { Container, PostCard } from "../components";
import SkeletonPostCard from "../components/skeleton/SkeletonPostCard";
import { useSelector } from "react-redux";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const userData = useSelector((state) => state.auth.status);
  const [initialLoad, setInitialLoad] = useState(true); // Add this state to track the initial loading state

  useEffect(() => {
    databaseService.getPosts().then((posts) => {
      if (posts) {
        setPosts(posts.documents);
        setLoading(false);
        setInitialLoad(false);
      }
    });
  }, []);

  if (initialLoad) {
    return null; // Return null while the initial loading is true to avoid displaying any content
  }

  if (!userData) {
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

  if (posts?.length === 0) {
    return (
      <div className="w-full py-8 mt-0 text-center bg-gray-200">
        <Container>
          <div className="flex flex-wrap">
            <h1 className="text-2xl font-bold hover:text-gray-500">
              {userData && "No posts. Kindly Add a post "}
            </h1>
          </div>
        </Container>
      </div>
    );
  }

  const slideLeft = () => {
    var slider = document.getElementById("slider");
    slider.scrollLeft = slider.scrollLeft - 500;
  };
  const slideRight = () => {
    var slider = document.getElementById("slider");
    slider.scrollLeft = slider.scrollLeft + 500;
  };

  return (
    <div className="w-full py-8 bg-orange-200">
      {loading ? (
        <Container>
          <div className="flex flex-wrap">
            <SkeletonPostCard />
            <SkeletonPostCard />
            <SkeletonPostCard />
            <SkeletonPostCard />
          </div>
        </Container>
      ) : (
        <Container>
          <div className="relative flex items-center group">
            <MdChevronLeft
              onClick={slideLeft}
              className="bg-white left-0 rounded-full absolute opacity-50 hover:opacity-100 cursor-pointer z-10 hidden group-hover:block"
              size={40}
            />
            <div
              id={"slider"}
              className="w-full flex h-full overflow-x-scroll whitespace-nowrap scroll-smooth scrollbar-hide relative"
            >
              {posts.map((post) => (
                <div key={post.$id} className="p-2 sm:w-1/3">
                  <PostCard {...post} />
                </div>
              ))}
            </div>
            <MdChevronRight
              onClick={slideRight}
              className="bg-white right-0 rounded-full absolute opacity-50 hover:opacity-100 cursor-pointer z-10 hidden group-hover:block"
              size={40}
            />
          </div>
        </Container>
      )}
    </div>
  );
};

export default Home;
