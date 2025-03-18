import { useInfiniteQuery } from '@tanstack/react-query';
import axios from 'axios';
import {UNSPLASH_URL, PER_PAGE_COUNT} from 'Constants/Params';

const fetchPhotos = async (query, params) => {
    const response = await axios.get(`${UNSPLASH_URL}?page=${params}&per_page=${PER_PAGE_COUNT}&query=${query}&xp=free-semantic-perf%3Aexperiment`);
    return response.data;
};

// usePhotos custom hook to fetch photos from unsplash
const usePhotos = (query) => {
    return useInfiniteQuery(
        {
            queryKey: ['photos', query],
            queryFn: ({ pageParam = 1 }) => {
                if (pageParam === false) {
                    return []; 
                }
                return fetchPhotos(query, pageParam);
            },
            getNextPageParam: (lastPage, allPages) => {
                const nextPage = allPages.length + 1;
                return nextPage <= lastPage.total_pages ? nextPage : false;
            },
            select: (data) => {
                return data.pages.flatMap((page) => page.results);
            },
        }
    );
};

export default usePhotos;