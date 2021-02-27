
import React, { useState, useEffect } from 'react';
import {Form, Image, Card, Icon } from 'semantic-ui-react';

import './App.css';

function App() {
  const[name,setName]=useState("");
  const[repos,setRepos]=useState("");
  const[followers,setFollowers]=useState("");
  const[following,setFollowing]= useState("");
  const[username,setUsername]=useState("");
  const[avatar,setAvatar]=useState("");
  const[error,setError]=useState("");
 const[input,setInput]=useState("");
const [email,setEmail]=useState("");
const [gists,setGists]=useState("");

useEffect(()=>{
   fetch(`https://api.github.com/users/example`).then(res=>res.json()).then(data=>{
     setData(data)
   });
},[]);
const setData=({name,login,followers,following,public_repos,avatar_url,email,public_gists})=>
{
  setName(name);
  setUsername(login);
  setFollowers(followers);
  setFollowing(following);
  setRepos(public_repos);
  setAvatar(avatar_url);
  setEmail(email);
  setGists(public_gists);
}
const handleSearch = (e)=>{
  setInput(e.target.value)
}
const handleSubmit= ()=>{
  fetch(`https://api.github.com/users/${input}`).then(res=>res.json()).then(data=>{
  if(data.message){
    setError(data.message);
  }  
  else{
    setData(data);
    setError(null);
  }
  
  
  })
}

  
  return (
    <div>
      <div className='navbar'>
        Github Info
      </div>
      <div className='search'>
      <Form onSubmit={handleSubmit}>
          <Form.Group>
            <Form.Input
              placeholder='Github username'
              name='github username'
              onChange={handleSearch}
            />
           
            <Form.Button content='Search' />
          </Form.Group>
        </Form>

      </div>

      {error?(<h1>{error}</h1>):(<div className="card">
      <Card>
    <Image src={avatar} wrapped ui={false} />
    <Card.Content>
      <Card.Header>{name}</Card.Header>
      <Card.Header>{username}</Card.Header>
      
    </Card.Content>
    <Card.Content extra>
      <a>
        <Icon name='user' />
        {repos} Repositries
      </a>
    </Card.Content>
    <Card.Content extra>
      <a>
        <Icon name='user' />
        {following} Following
      </a>
    </Card.Content>
    <Card.Content extra>
      <a>
        <Icon name='user' />
        {followers} Followers
      </a>
    </Card.Content>
    <Card.Content extra>
      <a>
        <Icon name='file alternate' />
        {gists} gists
      </a>
    </Card.Content>
  </Card>
  

      </div>
)}
      

    </div>
  );
}

export default App;
