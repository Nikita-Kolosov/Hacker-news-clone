import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { news } from '../types/Types';

export function BasicCard(props: { news: news }) {
    const { id, title, score, author, date, kids } = props.news;

    return (
        <Card sx={{ minWidth: 275, width: 500, marginBottom: 2 , backgroundColor: 'aliceblue' }} variant="outlined">
        <CardContent>
            <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            {`by ${author}`}
            </Typography>
            <Typography variant="h5" component="div">
            {title}
            </Typography>
            <Typography sx={{ mb: 1.5 }} color="text.secondary">
            {`${score} points`}
            </Typography>
            <Typography variant="body2">
            {date}
            <br />
            {kids?.length ? 
            kids.length === 1 ? 
                `${kids.length} comment`
                :
                `${kids.length} comments` 
            :
            'no comments'}
            </Typography>
        </CardContent>
        </Card>
    );
}
