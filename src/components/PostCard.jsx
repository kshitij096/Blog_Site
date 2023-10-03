import databaseService from "../appwrite/dbconfig";
import { Link } from "react-router-dom";

const PostCard = ({ $id, blog_title, blog_img }) => {
  return (
    <Link to={`/post/${$id}`}>
      <div className="w-full bg-gray-100 rounded-xl p-4">
        <div className="w-full justify-center mb-4">
          <img
            className="rounded-xl"
            src={databaseService.getFilePreview(blog_img)}
            alt={blog_title}
          />
        </div>
        <h2 className="text-xl font-bold">{blog_title}</h2>
      </div>
    </Link>
  );
};

export default PostCard;
