/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useContext } from 'react';
import PostsContext from '../PostsContext';
import useJsonFetch from '../useJsonFetch';

export default function NewPost(props) {
  const { posts, setPosts, url } = useContext(PostsContext);
  const [value, setValue] = useState();
  const [request, setRequest, data, loading] = useJsonFetch();
  const { history } = props;

  const handleClose = () => {
    history.goBack();
  };

  const handleChange = (e) => {
    setValue(e.target.value);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    setRequest({
      url: `${url}posts`,
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        id: 0,
        content: value,
      }),
    });
  };

  useEffect(() => {
    if (data) {
      history.goBack();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data])

  return (
    <div className="new-post">
      <div className="top"><span onClick={handleClose}>&#x2716;</span></div>
      <form onSubmit={handleSubmit}>
        <textarea name="text" onChange={handleChange} value={value} />
        <div className="submit">
          <button type="submit" className="button">Опубликовать</button>
        </div>
      </form>
    </div>
  );
}
