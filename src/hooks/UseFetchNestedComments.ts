import { getComments } from "../api/HackerNewsApi";
import { comment } from "../types/Types";
import { useState, useEffect } from 'react';

export default function useFetchNestedComments (id: number, isFirtsLoad: boolean) {
    const [commentsList, setComments] = useState<Array<comment>>([]);
    // const [isLoading, setIsLoading] = useState(false);

    const fetchData = (id: number) => {
        // setIsLoading(true);
        getComments(id)
          .then((commentsList) => {
            setComments(commentsList);
            // setIsLoading(false);
          })
    };

    useEffect(() => {
        if (!isFirtsLoad) {
            fetchData(id);
        };
    }, [isFirtsLoad]);

    return { commentsList/*, isLoading*/};
};