import { useEffect, useState } from 'react'
import { fetchPosts } from '../services/post-pagination.service' 

const LIMIT = 5;

function PostPagination() {
  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  
  useEffect(() => {
    fetchPosts()
      .then((data) => setPosts(data))
      .catch((error) => console.error('Error fetching posts:', error));
  }, []);

  const handlePrevious = () => {
    setCurrentPage((prevPage) => Math.max(0, prevPage - LIMIT));
  }

  const handleNext = () => {
    setCurrentPage((prevPage) => prevPage + LIMIT);
  }

  return (
    <div style={{ ...styles.container }}>
      <h1>Post Pagination</h1>
      {posts.slice(currentPage, currentPage + LIMIT).map((post: any) => (
        <div key={post.id} style={{ ...styles.card }}>
          <h2>({post.id}): {post.title}</h2>
          <p>{post.body}</p>
        </div>
      ))}
      <div style={{ ...styles.pagination }}>
        <button onClick={handlePrevious} disabled={currentPage === 0}>
          Previous
        </button>
        <button onClick={handleNext} disabled={currentPage + LIMIT >= posts.length}>
          Next
        </button>
      </div>
    </div>
  )
}

const styles = {
  container: {
    width: '1024px',
    margin: '0 auto',
    padding: '20px',
  },
  card: {
    border: '1px solid #ccc',
    borderRadius: '8px',
    padding: '16px',
    marginBottom: '16px',
  },
  pagination: {
    display: 'flex',
    justifyContent: 'space-between',
  },
}

export default PostPagination
