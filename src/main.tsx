import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

// Import Pages
import PostPagination from './pages/post-pagination'
import TabData from './pages/tab-data'
import { ToastsProvider } from './contexts/ToastsProvider';
import Toasts from './pages/toasts';

import PostSearchDebounce from './pages/post-search-debounce';
import InfiniteScroll from './pages/infinite-scroll';
import Modal from './pages/modal';

import Javascript from './pages/javascript'

import './main.css'

createRoot(document.getElementById('root')!).render(
	<>
		{/* <ToastsProvider>*/}
		{/* <PostPagination /> */}
		{/* <TabData /> */}
		{/* <Toasts /> */}
		{/* <PostSearchDebounce /> */}
		{/* <InfiniteScroll /> */}
		{/* <Modal /> */}
		<Javascript />
		{/* </ToastsProvider> */}
	</>,
)
