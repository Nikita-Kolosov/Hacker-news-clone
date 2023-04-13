import { useState, useEffect } from 'react';
import { news } from '../types/Types';
import { getNews } from '../api/HackerNewsApi';

const INTERVAL_MS = 60000;

export default function useFetchNews(props: boolean) {
  const [isNeedUpdate, setIsNeedUpdate] = useState(false);
  const [isReloadOver, setIsReloadOver] = useState(false);
  const [newsList, setNews] = useState<Array<news>>([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchData = () => {
    setIsLoading(true);
    getNews()
      .then((newsList) => {
        newsList.sort((a, b) => {
            if (a.date < b.date) return 1;
            if (a.date > b.date) return -1;
            return 0;
        });
        setNews(newsList);
        setIsLoading(false);
        setIsReloadOver(true);
      })
  };

  if (props && !isNeedUpdate) {
    setIsNeedUpdate(true);
    setIsReloadOver(false);
    fetchData();
  }

    
  if (isReloadOver && props) {
    setIsNeedUpdate(false);
  }

  useEffect(() => {
    const interval = setInterval(fetchData, INTERVAL_MS);
    fetchData();
    return () => {
      clearInterval(interval);
    }
  }, []);
    
  return { isLoading, newsList };
};