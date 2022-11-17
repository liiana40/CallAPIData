import * as React from 'react';
import './App.css';
import axios from "axios";

const App = () => {
  const [isLoading, setIsLoading] = React.useState(true);
  const [posts, setPosts] = React.useState([]);

  React.useEffect(()=> {
    getData();
  }, []);

  const getData = ()=> {
    const ENDPOINT = "https://api.dailysmarty.com/posts";
    axios(ENDPOINT)
      .then((response)=> {
        setIsLoading(false);
        console.log("RES", response.data);

        if (response.data.posts) {
          setPosts(response.data.posts);
        } else {
          console.log("An error happened")
        }  
      })
      .catch(error=> {
        setIsLoading(false);
        console.log("An error happened", error)
      });
  };

  const postsRenderer = posts.map((post) => (
    <div className='post-container' key={post.id}>
      <a href={post.url_for_post} target="_blank" className='title' rel="noreferrer">
        { post.title } 
      </a>
      {post.associated_topics?.length > 0 && (
        <div className='topics'>
          {post.associated_topics.map(topic=> <div key={topic} className="label">{topic}</div>)}
        </div>
      )}
      <div>{post.content && post.content.replace(/(<([^>]+)>)/gi, "")}</div>
    </div>
  ));

  const content = isLoading ? (
      <div>Loading...</div>
    ) : (
      <div>
        <pre>{ postsRenderer }</pre>
      </div>
    );

  return <div>{ content }</div>
};

export default App;
