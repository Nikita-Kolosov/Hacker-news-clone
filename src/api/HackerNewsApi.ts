import axios from 'axios';
import { comment, news } from '../types/Types';

const getFormatedDate = (date: number) => {
  const formatedDate = new Date(date * 1000).toLocaleDateString('en-US', {
    hour: 'numeric',
    minute: 'numeric'
  });
  return formatedDate;
};

export const getItem = async (id: number) => {
  const item = await axios.get(`https://hacker-news.firebaseio.com/v0/item/${id}.json`);
  const formatedDate = getFormatedDate(item.data.time);
  return {
    id: item.data.id,
    title: item.data.title,
    score: item.data.score,
    author: item.data.by,
    date: formatedDate,
    kids: item.data.kids,
    url: item.data.url
  };
};

export const getNews = async () => {
  const response = await axios.get('https://hacker-news.firebaseio.com/v0/topstories.json');
  
  const newsIds: Array<number> = response.data;
  const newsList: Array<news> = await Promise.all(newsIds.slice(0, 100).map(getItem));
  return newsList;
};

const getComment = async (id: number) => {
  const item = await axios.get(`https://hacker-news.firebaseio.com/v0/item/${id}.json`);
  const formatedDate = getFormatedDate(item.data.time);
  return {
    id: item.data.id,
    text: item.data.text,
    author: item.data.by,
    date: formatedDate,
    kids: item.data.kids,
  };
};

export const getComments = async (id: number) => {
  const item = await axios.get(`https://hacker-news.firebaseio.com/v0/item/${id}.json`);

  const commentsIds: Array<number> = item.data.kids;
  if (commentsIds && commentsIds.length) {
    const commentsList: Array<comment> = await Promise.all(commentsIds.map(getComment));
    return commentsList;
  }
  
  return [];
};