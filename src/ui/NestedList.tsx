import ListSubheader from '@mui/material/ListSubheader';
import List from '@mui/material/List';
import useFetchComments from '../hooks/UseFetchComments';
import { CircularProgress } from "@mui/material";
import Comment from './Comment';
import { Button } from "@mui/material";
import { useState, useCallback, useEffect } from 'react';


export default function NestedList(props: any) {
    const id: number = props.id;
    const [isNeedUpdate, setIsNeedUpdate] = useState(false);
    const { commentsList, isLoading } = useFetchComments(id, isNeedUpdate);

    const [, updateState]: any = useState();
    const handleForceUpdateMethod = useCallback(() => updateState({}), []);

    useEffect(() => {
        setIsNeedUpdate(false);
    }, [isNeedUpdate]);

    const handleClick = () => {
        setIsNeedUpdate(true);
        handleForceUpdateMethod();
    };

    return (
        <>
            {isLoading ? 
                <div className="loading">
                    <h3 className="loading-title">Loading comments</h3>
                    <CircularProgress />
                </div>
            :
                <List
                sx={{ width: '100%', bgcolor: 'background.paper', marginTop: 8 }}
                component="nav"
                aria-labelledby="nested-list-subheader"
                subheader={
                    <div className='nested-list_nav'>
                        <ListSubheader component="div" id="nested-list-subheader">
                        Comments
                        </ListSubheader>
                        <Button sx={{ height: 35 }} variant="outlined" className="return-button" onClick={handleClick}>Update comments</Button>
                    </div>
                }
                >
                    {commentsList.length ?
                        <div>
                        {commentsList.map((comment) => (
                            <Comment comment={comment} level={1} key={comment.id}/>
                        ))}
                        </div>
                        :
                        <div className='no-comments'>No comments</div>
                    }
                </List>
            }
        </>

    );
}
