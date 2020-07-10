/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';
import useJsonFetch from '../useJsonFetch'
import PostsContext from '../PostsContext';

export default function Posts(props) {
  const { advanced, setAdvanced, url, posts, setPosts } = useContext(PostsContext);
  const [request, setRequest, data] = useJsonFetch();

  useEffect(() => {
    if (!data) {
      setRequest({
        url: `${url}posts`,
        method: 'GET',
      });
    }

    if (data) {
      setPosts(data.resolve);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data])

  return (
    <div>
      <div className="main-top">
        <Link to="/posts/new" className="button">Новое сообщение</Link>
      </div>
      {data && data.resolve.map((o) =>
        <Link to={`/posts/${o.id}`}>
          <div className="item-post" key={o.id}>
            <div className="item-post-header">
              <div className="item-post-name">
                <span className="name">Пользователь</span>
                <span className="time">{moment(o.created).fromNow()}</span>
              </div>
            </div>
            <div className="item-post-content">
              <p>{o.content}</p>
            </div>
            <div>
                <span className="item-post-info">Подробности внутри</span>
            </div>
          </div>
        </Link>)}
    </div>
  );
}
