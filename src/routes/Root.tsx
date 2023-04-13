import { CircularProgress, Button } from "@mui/material";
import { BasicCard as Card } from "../ui/Card";
import { news } from "../types/Types";
import useFetchNews from "../hooks/UseFetchNews";
import { useState, useCallback, useEffect } from "react";
import { Link } from "react-router-dom";

export default function Root () {
    const [isNeedUpdate, setIsNeedUpdate] = useState(false);
    const { isLoading, newsList } = useFetchNews(isNeedUpdate);

    const [, updateState]: any = useState();
    const handleForceUpdateMethod = useCallback(() => updateState({}), []);

    useEffect(() => {
        setIsNeedUpdate(false);
    }, [isNeedUpdate]);

    const updateContent = () => {
        setIsNeedUpdate(true);
        handleForceUpdateMethod();
    };

    return (
        <>
        {isLoading ? 
        <div className="loading">
            <h3 className="loading-title">Loading data</h3>
            <CircularProgress />
        </div>
        :
        <div className="container">
            <h1>Hacker news clone</h1>
              <Button variant="outlined" className="update-button" onClick={updateContent}>Update news</Button>
            <div>
                {newsList.map((news: news) => (
                    <Link key={news.id} to={`news/${news.id}`} className="card-wrapper" state={news}>
                        <Card news={news} key={news.id}/>
                    </Link>
                    
                ))}
            </div>
        </div>
        }
        </>
    )
    };