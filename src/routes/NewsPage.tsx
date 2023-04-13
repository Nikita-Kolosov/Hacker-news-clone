import { useLocation, useNavigate } from "react-router-dom"
import { news } from "../types/Types";
import { Link, Button } from "@mui/material";
import NestedList from "../ui/NestedList";

export default function NewsPage() {
    const { state } = useLocation();
    const news: news = state;
    const navigate = useNavigate();

    return (
        <>
            <div className="news-page">
                <div className="news-header_container">
                    <div>
                        <h3 className="news-header_title">{news.title}</h3>
                
                        <div className="news-descrition_container">
                            <h5 className="news-descrition_element">{news.score} points</h5>
                            <h5 className="news-descrition_element">by {news.author}</h5>
                            <h5 className="news-descrition_element">{news.date}</h5>
                            <h5 className="news-descrition_element">
                                {news.kids?.length ? 
                                    news.kids.length === 1 ? 
                                        `${news.kids.length} comment`
                                        :
                                        `${news.kids.length} comments` 
                                    :
                                    'no comments'}
                            </h5>
                            <Link href={news.url} underline="none" className="news-header_link">{'Source'}</Link>
                        </div>
                    </div>

                    <Button variant="outlined" className="return-button" onClick={() => navigate(-1)}>
                        Return
                    </Button>
                </div>

                <NestedList id={news.id}/>
            </div>
        </>
    );
};