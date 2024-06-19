import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

import Spinner from "../../components/spinner/spinner";

export default function Post() {
  const [post, setPost] = useState('');
  const [loading, setLoading] = useState(true as boolean);
  let { postId } = useParams();

  useEffect(() => {
    axios
      .get(`https://blog-api-guskirb.adaptable.app/posts/${postId}`)
      .then((data) => {
        setPost(data.data);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <Spinner />;
  }

  return (
    <div>
    
    </div>
    );
}
