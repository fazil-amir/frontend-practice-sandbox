import { useState, useEffect, useRef } from "react";

const LIMIT = 10;
const MAX_COUNT = 100;

type Post = {
	id: number,
	title: string,
	body: string,
}

// FETCH SERVICE
const fetchPosts = async (page = 1, limit = LIMIT): Promise<Post[]> => {
	try {
		const url = new URL(`https://jsonplaceholder.typicode.com/posts?_limit=${limit}&_page=${page}`);
		const response = await fetch(url);
		if (!response.ok) {
			throw new Error('Error in calling "fetch post" api');
		}
		return response.json();
	}
	catch {
		throw new Error('Something went wrong while calling "fetch post" API');
	}
}

// FETCH HOOK
const useFetchPost = () => {

	const [isLoading, setIsLoading] = useState(false);
	const [postData, setPostData] = useState<Post[]>([]);
	const [error, setError] = useState(null);

	const callFetchPosts = (page: number = 1) => {
		setIsLoading(true);
		fetchPosts(page)
			.then((newPosts) =>{
				setPostData(oldPosts => ([
					...oldPosts,
					...newPosts
				]))
			})
			.catch(e => {
				setError(e)
			})
			.finally(() =>{
				setIsLoading(false);
			})
	}

	return {
		callFetchPosts,
		isLoading,
		postData,
		error
	}
}

export default function InfiniteScroll() {
	const { isLoading, error, postData, callFetchPosts } = useFetchPost();
	
	const [page, setPage] = useState(1);
	
	const sentinelElementRef = useRef<HTMLDivElement | null>(null)

	const postEnded = !!(postData.length >= MAX_COUNT);

	useEffect(() => {
		callFetchPosts(page)
	}, [page])

	useEffect(() => {
		const refElement = sentinelElementRef.current;

		const observer = new IntersectionObserver((entries) => {
			if (entries[0].isIntersecting && !isLoading) {
				setPage(p => p + 1)
			}
		}, {
			threshold: 1
		});

		if (refElement) {
			observer.observe(refElement)
		}

		return () => {
			if (refElement) {
				observer.unobserve(refElement);
			}
		}

	}, [isLoading]);

	return (
		<div style={{ ...styles.container }}>
			<h1>Infinite Scroll</h1>
			{
				postData.map(p => (
					<div key={p.id} style={{ ...styles.card }}>
						<h2>{p.title}</h2>
						<p>{p.body}</p>
					</div>
				))
			}

			{!!postData.length && <div ref={sentinelElementRef} />}

			{!!isLoading && <p>Loading...</p>}
			{!!error && <p>error</p>}
			<button onClick={() => setPage(pv => pv + 1)} disabled={postEnded}>Load more</button>
		</div>
	)
}

const styles = {
  container: {
    margin: '0 auto',
    padding: '20px',
  },
  card: {
    border: '1px solid #ccc',
    borderRadius: '8px',
    padding: '16px',
    marginBottom: '16px',
  },
}