import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import databaseService from "../appwrite/dbconfig";

const PostCard = ({ $id, blog_title, blog_img, author_name }) => {
  return (
    <Link
      to={`/post/${$id}`}
      className="block w-full sm:w-2/3 md:w-full lg:w-full p-2"
    >
      <motion.div
        className="bg-white shadow-md rounded-xl overflow-hidden h-full flex flex-col justify-between hover:shadow-lg transition-shadow duration-300"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {blog_img && (
          <img
            src={databaseService.getFilePreview(blog_img)}
            alt={blog_title}
            className="w-full h-48 object-cover"
          />
        )}
        <div className="p-4 flex flex-col gap-2">
          <h3 className="text-lg font-semibold text-gray-800 line-clamp-2">
            {blog_title}
          </h3>
          <p className="text-sm text-gray-600">By {author_name}</p>
          <div className="text-right text-blue-500 text-sm font-medium">
            Read more →
          </div>
        </div>
      </motion.div>
    </Link>
  );
};

export default PostCard;
