import React, { useEffect, useState } from 'react'
import Grid from '@material-ui/core/Grid'
import { Container } from '@material-ui/core';
import NoteCard from '../components/NoteCard'
import Masonry from 'react-masonry-css'
import Layout from '../components/Layout.js'
import { db } from '../firebase';
import { useContext } from "react";
import { UserContext } from "../context/user";

export default function Notes() {

  const [notes, setNotes] = useState([]);
  const [ user,  ] = useContext(UserContext).user;

  useEffect(() => {
    // console.log(user.email);
    // fetch('http://localhost:8000/notes')
    //   .then(res => res.json())
    //   .then(data => setNotes(data))
    //   .catch(err => console.log(err));
    if(user){
      db.collection("notes").doc(user.email).collection("notes-users").get().then((querySnapshot) => {
        let data = querySnapshot.docs;
        // console.log(data[0].data())
        setNotes(data);
      });
    }
    // console.log(user);

  })

  const handleDelete = async (id) => {
    // await fetch('http://localhost:8000/notes' + id, {
    //   method: 'DELETE'
    // })

    // const newNotes = notes.filter(note => note.id != id)
    // setNotes(newNotes)

    db.collection("notes").doc(user.email).collection("notes-users").doc(id).delete()
        .then(() => console.log('note deleted'))
        .catch((err) => console.log(err));
  }

  const breakpoints = {
    default: 3,
    1100: 2,
    700: 1
  }

  return (
    // <Container>
    //   <Grid container spacing={3}>
    //   { notes.map(note => (
    //     <Grid item key={note.id} xs={12} md={6} lg={4}>
    //       <NoteCard note={note} handleDelete={handleDelete}/>
    //     </Grid>
    //   )) }
    //   </Grid>
    // </Container>
    <Layout>
      <Container>
        <Masonry
          breakpointCols={breakpoints}
          className="my-masonry-grid"
          columnClassName="my-masonry-grid_column"
        >
        { notes.map(note => (
          <div key={note.id}>
            <NoteCard note={note} handleDelete={handleDelete}/>
          </div>
        )) }
      </Masonry>
    </Container>
  </Layout>
  )
}
