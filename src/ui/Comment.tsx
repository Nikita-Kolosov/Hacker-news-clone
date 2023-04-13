import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import List from '@mui/material/List';
import { comment } from '../types/Types';
import { useState } from 'react';
import useFetchNestedComments from '../hooks/UseFetchNestedComments';

export default function Comment(props: { comment: comment, level: number }) {
    const { comment, level } = props;

    const [open, setOpen] = useState(false);
    const [firstOpen, setFirstOpen] = useState(true);
    const { commentsList } = useFetchNestedComments(comment.id, firstOpen);

    const handleClick = () => {
        if(firstOpen) {
            setFirstOpen(false)
        }
        setOpen(!open);
    };

    const parentExpandComment = 
    <ListItemButton sx={{ pl: 1 * level, justifyContent: 'space-between' }} onClick={handleClick}>
        <div className='comment-description_wrapper'>
        <ListItemText sx={{ color: 'rgb(98 96 96 / 60%)' }} primary={`${comment.author} | ${comment.date}`}/>
        <ListItemText primary={
            <div dangerouslySetInnerHTML={{ __html: comment.text }}></div>
        }/>
        </div>
        {open ? <ExpandLess /> : <ExpandMore />}
    </ListItemButton>;

    return(
        <div>
            {comment.kids?.length ?
                firstOpen ?
                    parentExpandComment
                    :
                    <>
                        {parentExpandComment}
                        <Collapse in={open} timeout="auto" unmountOnExit>
                            <List component="div" disablePadding>
                                {commentsList.map((comment) => (
                                    <Comment comment={comment} level={level+ 3} key={comment.id}/>
                                ))}
                            </List>
                        </Collapse>
                    </>
                :
                <ListItemButton sx={{ pl: 1 * level, flexDirection: 'column', alignItems: 'flex-start'}}>
                    <ListItemText sx={{ color: 'rgb(98 96 96 / 60%)' }} primary={`${comment.author} | ${comment.date}`}/>
                    <ListItemText primary={
                        <div dangerouslySetInnerHTML={{ __html: comment.text }}></div>
                    }/>
                </ListItemButton>
            }
        </div>
    );
};