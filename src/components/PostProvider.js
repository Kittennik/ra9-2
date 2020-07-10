import React, { useState } from 'react';
import PostsContext from '../PostsContext';

export default function PostProvider(props) {
  const { url } = props;
  const [advanced, setAdvanced] = useState(false);
  const [posts, setPosts] = useState([]);
  
  return (
    <PostsContext.Provider value={{advanced, setAdvanced, posts, setPosts, url}}>
      {props.children}
    </PostsContext.Provider>
  )
}
