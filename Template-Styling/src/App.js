
import React, { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios'
const moment = require('moment');

function App() {
  const [isLoadingAuthors, setIsLoadingAuthors] = useState(true)
  const [isLoadingPosts, setIsLoadingPosts] = useState(true)

  const [authors, setAuthors] = useState({
    id: 0,
    name: '',
    role: '',
    place: '',
    avatar_url: ''
  })

  const [posts, setPosts] = useState({
    id: 0,
    author_id: 0,
    title: '',
    body: '',
    image_url: '',
    created_at: '',
  })



  async function getAuthors() {
    try {
      const response = await axios.get('http://maqe.github.io/json/authors.json');
      setAuthors(response.data)
      setIsLoadingAuthors(false)
    } catch (error) {
      console.error(error);
    }
  }
  async function getPosts() {
    try {
      const response = await axios.get('http://maqe.github.io/json/posts.json');
      setPosts(response.data)
      setIsLoadingPosts(false)
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    getAuthors()
    getPosts()
  }, [])

  if (isLoadingAuthors) {
    return null
  }
  if (isLoadingPosts) {
    return null
  }


  return (
    <div className="App">
      <div className='container'>
        <div className='row justify-content-center'>
          <div className="col-12 mt-5" style={{ maxWidth: '70%' }}>
            <h3 className='fw-bold'>MAQE Forum</h3>
          </div>
          <div className="col-12 mt-4" style={{ maxWidth: '70%' }}>
            <h6>Your current timezone is Asia/Bangkok</h6>
          </div>
          {
            posts.map(post => {
              return (
                <div key={post.id} className="col-12 mt-3" style={{ maxWidth: '70%' }}>

                  <div className="card mb-3 shadow" style={+post.id % 2 === 0 ? { backgroundColor: '#ccecff' } : {}}>

                    {
                      authors.filter(author => {
                        return author.id === post.author_id
                      }).map(e => {
                        return (
                          <div key={e.id} className="col-12">
                            <div className=" d-flex ps-3 pt-2 pb-1 border-bottom border-2 ">
                              <img
                                src={e.avatar_url}
                                className=" rounded-circle"
                                style={{ maxWidth: '40px', maxHeight: '40px' }}
                                alt="..."
                              />
                              <p style={{ color: '#f47755' }} className="fs-6 fw-bold mt-2 ms-2">{e.name}</p>
                              <p className="text-muted fw-bold mt-2 ms-2">
                                Posted on {moment(post.created_at).format('MMMM d, YYYY, h:mm ')}
                              </p>
                            </div>
                          </div>
                        )
                      })
                    }


                    <div className="row g-0">
                      <div className="col-md-4">
                        <div className="p-3">
                          <img
                            src={post.image_url}
                            className="img-fluid rounded-start"
                            alt="..."
                          />
                        </div>
                      </div>
                      <div className="col-md-8">
                        <div className="card-body p-3">
                          <h5 className="card-title"><strong> {post.title}</strong></h5>
                          <p className="card-text">
                            {post.body}
                          </p>

                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })
          }

        </div>
      </div>
    </div >
  );
}

export default App;
