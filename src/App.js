// src/App.js
import React, { useState, useEffect } from 'react';

// import API from Amplify library
import { API, Auth } from 'aws-amplify'

// import query definition
import { listPosts } from './graphql/queries'

// src/App.js, import the withAuthenticator and AmplifySignOut components
import { withAuthenticator } from '@aws-amplify/ui-react';

/* src/App.js, change the default export to this: */
export default withAuthenticator(App)

function App({ signOut }) {
  const [posts, setPosts] = useState([])
  useEffect(() => {
    fetchPosts();
    checkUser(); // new function call
  }, []);
  async function fetchPosts() {
    try {
      const postData = await API.graphql({ query: listPosts });
      setPosts(postData.data.listPosts.items)
    } catch (err) {
      console.log({ err })
    }
  }
  async function checkUser() {
      const user = await Auth.currentAuthenticatedUser();
      console.log('user: ', user);
      console.log('user attributes: ', user.attributes);
  }
    console.log("Hello World");
  return (
    <div>
      <h1>Hello World</h1>
      <button onClick={signOut}>Sign out</button>
      {
        posts.map(post => (
          <div key={post.id}>
            <h3>{post.name}</h3>
            <p>{post.location}</p>
          </div>
        ))
      }
    </div>
  )
}

