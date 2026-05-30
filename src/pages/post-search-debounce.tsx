import { useEffect, useState } from "react";

const fetchPosts = async (query: string) => {
  const resourceURL = new URL('https://jsonplaceholder.typicode.com/posts');
  if (query) {
    resourceURL.searchParams.append('name', query);
  }
  const response = await fetch(resourceURL);
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
}

const useDebounce = (value: string, delay: number) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => clearTimeout(timer);

  }, [value, delay]);

  return debouncedValue;
};

const useFetchPost = (query: string) => {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const debouncedQuery = useDebounce(query, 500);

  useEffect(() => {
    setLoading(true);
    if (debouncedQuery.trim() === '') {
      setResults([]);
      return;
    }
    if (debouncedQuery.length > 3) {
      fetchPosts(debouncedQuery)
        .then(setResults)
        .catch(setError)
        .finally(() => setLoading(false));
      return;
    }
  }, [debouncedQuery]);

  return { results, loading, error };
}

export default function PostSearchDebounce() {

  const [query, setQuery] = useState('');
  const { results, loading, error } = useFetchPost(query);

  return (
    <div style={{ ...styles.container as React.CSSProperties }}>

      <h1>Post Search with Debounce</h1>

      <input type="text" placeholder="Search posts..." style={{ ...styles.input as React.CSSProperties }} value={query} onChange={e => setQuery(e.target.value)} />

      {loading && <p>Loading...</p>}

      {error && <p style={{ color: 'red' }}>Error: {error}</p>}

      {
        results.length > 0 && (
          <ul>
            {results.map((post: any) => (
              <li key={post.id}>
                <h2>{post.title}</h2>
                <p>{post.body}</p>
              </li>
            ))}
          </ul>
        )
      }

      {query.trim() !== '' && results.length === 0 && !loading && !error && <p>No results found.</p>}

    </div>
  )
}

const styles = {
  container: {
    maxWidth: '1024px',
    width: '100%',
    margin: '0 auto',
  },
  input: {
   width: '100%', padding: '8px', boxSizing: 'border-box'
  }
}