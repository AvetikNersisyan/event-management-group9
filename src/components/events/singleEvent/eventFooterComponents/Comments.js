import { useRef, useState } from 'react';
import { NavLink } from "react-router-dom";
import { api } from '../../../../api';

const Comments = ({ comments, loggedIn, id, ev }) => {
    const inputText = useRef(null)

    // պետքա փոխվի, գրվի ռեդաքսում
    const [comment, setComment] = useState(comments)

    const handleAddComment = () => {
        let today = new Date()
        let newComment = {
            userName: loggedIn.firstname + loggedIn.lastname,
            comment: inputText.current.value,
            date: today.getFullYear() + '-' + today.getMonth() + '-' + today.getDate(),
            time: today.getHours() + ':' + today.getMinutes()
        }

        // պետքա փոխվի, գրվի ռեդաքսում
        setComment([...comment, newComment])

        fetch(`${api}/events/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                ...ev,
                comments: [...ev.comments, newComment],
            }),
        }).then(res => res.json())
        inputText.current.value = ''
    }

    return (
        <div className='footer-contact-comp'>
            {
                loggedIn ?
                    <div className="footer-add-comment">
                        <textarea ref={inputText} className="log-in-inputs" style={{ width: "100%", height: '100px', marginTop: '20px', padding: '15px' }} type='text' placeholder='Add Comment' />
                        <button className="button" onClick={handleAddComment}>Add comment</button>
                    </div>
                    :
                    <p>For adding a comment you need to <NavLink className='card-footer-links' to='../../profile'>Log In</NavLink> or <NavLink className='card-footer-links' to='../../profile/signup'>Sign In</NavLink></p>
            }
            <div className='card-footer-all-comments'>
                {comment.sort((a, b) => new Date(a.date) - new Date(b.date)).map(com =>
                    <>
                        <div className="single-comment">
                            <div>{com.userName}</div>
                            <div>{com.comment}</div>
                            <div>{com.date}{' '}{com.time}</div>
                        </div>
                    </>
                )}
            </div>
        </div>
    )
}

export default Comments;