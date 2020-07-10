/* eslint-disable no-unused-vars */
import React, { useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';
import useJsonFetch from '../useJsonFetch';
import PostsContext from '../PostsContext';

export default function ItemPost(props) {
  const {match, history} = props;
  const { posts, url } = useContext(PostsContext);
  const [request, setRequest, data, loading] = useJsonFetch();
  const id = Number(match.params.id);
  const itemPost = posts.find(o => o.id === id)

  const handleChange = () => {
    history.push(`/posts/change/${id}`);
  }

  const handleRemove =() => {
    setRequest({
      url: `${url}posts/${id}`,
      method: 'DELETE',
    });
  }

  useEffect(() => {
    if (data) {
      history.goBack();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data])

  return (
    <>
      <div className="item-post" key={itemPost.id}>
        <Link to="/" className="link-back">Назад</Link>
        <div className="item-post-header">
          <div>
            <p className="name">Пользователь</p>
            <span className="time">
              {moment(itemPost.created).fromNow()}
            </span>
          </div>
        </div>
        <div className="item-post-content">
          <p>{itemPost.content}</p>
        </div>
        <div className="item-post-footer">
          <button className="change button" onClick={handleChange}>Редактировать</button>
          <button className="remove button" onClick={handleRemove}>Удалить</button>
        </div>
      </div>
    </>
  );
}
