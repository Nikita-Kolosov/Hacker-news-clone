import { getComments } from "../api/HackerNewsApi";
import { comment } from "../types/Types";
import { useState, useEffect } from 'react';

export default function useFetchComments (id: number, outerUpdateRequest: boolean) {
  const [isNeedUpdate, setIsNeedUpdate] = useState(false);
  const [isReloadOver, setIsReloadOver] = useState(false);
  const [commentsList, setComments] = useState<Array<comment>>([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchData = (id: number) => {
      setIsLoading(true);
      getComments(id)
        .then((commentsList) => {
          setComments(commentsList);
          setIsLoading(false);
          setIsReloadOver(true);
        })
  };

  if (outerUpdateRequest && !isNeedUpdate) {
    setIsNeedUpdate(true);
    setIsReloadOver(false);
    fetchData(id);
  }

    
  if (isReloadOver && outerUpdateRequest) {
    setIsNeedUpdate(false);
  }

  useEffect(() => {
      fetchData(id);
  }, []);

  return { commentsList, isLoading};
};