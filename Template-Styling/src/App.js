
import React, { useEffect, useState } from 'react';
import Spinner from 'react-bootstrap/Spinner'
import Alert from 'react-bootstrap/Alert'
import './App.css';
import axios from 'axios'
const moment = require('moment');

function App() {
  const [isLoading, setIsLoading] = useState(true)
  const [isError, setIsError] = useState(false)

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

  async function getData() {
    try {
      const response1 = await axios.get('http://maqe.github.io/json/authors.json');
      setAuthors(response1.data)
      const response2 = await axios.get('http://maqe.github.io/json/posts.json');
      setPosts(response2.data)
      setIsLoading(false)
    } catch (error) {
      setIsError(true)
    }

  }

  useEffect(() => {
    getData()
  }, [])

  function mapPosts() {
    return posts.map(post => {
      return (
        <div key={post.id} className="col-12 mt-3 mw70">

          <div className="card mb-3 shadow" style={+post.id % 2 === 0 ? { backgroundColor: '#ccecff' } : {}}>

            {
              mapAuthors(post.author_id, post.created_at)
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

  function mapAuthors(postId, postCreatedAt) {
    return authors.filter(author => {
      return author.id === postId
    }).map(e => {
      return (
        <div key={e.id} className="col-12">
          <div className=" d-flex ps-3 pt-2 pb-1 border-bottom border-2 ">
            <img
              src={e.avatar_url}
              className=" rounded-circle mh40mw40"
              alt="..."
            />
            <p className="fs-6 fw-bold mt-2 ms-2 author-color">{e.name}</p>
            <p className="text-muted fw-bold mt-2 ms-2">
              Posted on {moment(postCreatedAt).format('dddd, MMMM d, YYYY, h:mm ')}
            </p>
          </div>
        </div>
      )
    })
  }

  return (
    <div className="App">
      <div className='container'>
        <div className='row justify-content-center'>
          <div className="col-12 mt-5 mw70" >
            <h3 className='fw-bold'>MAQE Forum</h3>
          </div>
          <div className="col-12 mt-4 mw70">
            <h6>Your current timezone is Asia/Bangkok</h6>
          </div>
          {
            isError ? <Alert className='mw70' variant={'danger'}>
              Error 500 : Internal Server Error
            </Alert> : ""
          }
          {
            isLoading ? <div className='col-12 mt-4 d-flex justify-content-center'><Spinner animation="border" />  </div> : mapPosts()
          }
        </div>
      </div>
    </div >
  );
}

export default App;
