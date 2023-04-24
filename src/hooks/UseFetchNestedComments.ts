import { getComments } from "../api/HackerNewsApi";
import { comment } from "../types/Types";
import { useState, useEffect } from 'react';

export default function useFetchNestedComments (id: number, isFirtsLoad: boolean) {
    const [commentsList, setComments] = useState<Array<comment>>([]);

    const fetchData = (id: number) => {
        getComments(id)
          .then((commentsList) => {
            setComments(commentsList);
          })
    };

    useEffect(() => {
        if (!isFirtsLoad) {
            fetchData(id);
        };
    }, [isFirtsLoad]);

    return { commentsList};
};