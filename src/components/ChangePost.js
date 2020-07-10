/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useContext } from 'react';
import useJsonFetch from '../useJsonFetch';
import PostsContext from '../PostsContext';

export default function ChangePost(props) {
  const {match, history} = props;
  const { posts, setPosts, url } = useContext(PostsContext);
  const [value, setValue] = useState();
  const [request, setRequest, data, loading] = useJsonFetch();
  const id = Number(match.params.id);

  const handleChange = (e) => {
    setValue(e.target.value);
  }

  const handleClose = () => {
    history.goBack();
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    setRequest({
      url: `${url}posts`,
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        id,
        content: value,
      }),
    });
  };

  useEffect(() => {
    const itemPost = posts.find(o => o.id === id);
    setValue(itemPost.content);

    if (data) {
      setPosts(prevPost => prevPost.map((itemPost) => itemPost.id === id ? {...itemPost, content: value} : itemPost));
      history.goBack();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data])

  return (
    <div className="change-post">
      <p>Редактировать</p>
      <div className="top">
        <span className="close" onClick={handleClose}>&#x2716;</span>
      </div>
      <form onSubmit={handleSubmit}>
        <textarea name="text" onChange={handleChange} value={value} />
        <div className="submit">
          <button type="submit" className="button">Сохранить</button>
        </div>
      </form>
    </div>
  );
}
