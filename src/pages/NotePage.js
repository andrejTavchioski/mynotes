import React, {useState,useEffect} from 'react'
import { ReactComponent as ArrowLeft } from '../assets/arrow-left.svg'

// import notes from '../assets/data'
import { Link } from 'react-router-dom'
const NotePage = ({ match, history }) => {
    let noteId = match.params.id
    let [note,setNote] = useState(null)

    useEffect(()=>{
        getNote()
    },[noteId])

    let getNote= async()=>{
        if(noteId==='new')
        return
        let response = await fetch(`http://localhost:5000/notes/${noteId}`)
        let data = await response.json()

        setNote(data)
    }

    let updateNote = async()=>{
        await fetch(`http://localhost:5000/notes/${noteId}`,{
            method:'PUT',
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({...note, 'updated': new Date()})
        })
    }

    let createNote = async()=>{
        await fetch(`http://localhost:5000/notes/`,{
            method:'POST',
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({...note, 'updated': new Date()})
        })
    }

    let handleSubmit = () =>{
        if(noteId !== 'new' && !note.body){
            deleteNote()
        }else if(noteId!=='new'){
            updateNote()
        }else if(noteId==='new' && note!==null){
            createNote()
        }
        
        history.push('/')
    }

    let deleteNote= async()=>{
        await fetch(`http://localhost:5000/notes/${noteId}`,{
            method:'DELETE',
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify(note)
        })
        history.push('/')
    }

    // let note = notes.find(note => note.id == noteId)
    return (
        <div className="note">

            <div className="note-header">
                <h3>
                    
                        <ArrowLeft onClick={handleSubmit}></ArrowLeft>
                    
                </h3>
                {noteId !== "new" ? (
                    <button onClick={deleteNote}>Delete</button>
                ):(
                    <button onClick={handleSubmit}>Done</button>
                )}
                
            </div>
            <textarea onChange={(e)=>{setNote({...note,'body':e.target.value})}} value={note?.body}>

            </textarea>

        </div>
    )
}

export default NotePage
