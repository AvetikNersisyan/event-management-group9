import { useRef, useState } from 'react';

import { useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';

import { api } from '../../../../api';
import { addComment } from '../../../../redux/ducks/eventDuck';

const Comments = ({ comments, loggedIn, id, ev }) => {
    const inputText = useRef(null);
    const [comment, setComment] = useState(comments);
    const dispatch = useDispatch();
    const handleAddComment = () => {
        let today = new Date();
        let nowTime = Date.now();
        if (inputText.current.value === '') {
            alert('Cannot add an empty comment, please type something');
        } else {
            let newComment = {
                userName: loggedIn.firstname + ' ' + loggedIn.lastname,
                comment: inputText.current.value,
                date: nowTime,
                time: today.getHours() + ':' + today.getMinutes(),
            };
            fetch(`${api}/events/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    ...ev,
                    comments: [...ev.comments, newComment],
                }),
            })
                .then((res) => res.json())
                .then(() => {
                    dispatch(addComment({ newComment, id }));
                });
            inputText.current.value = '';
        }
    };

    return (
        <div className='footer-contact-comp'>
            {loggedIn?.type === 'admin' ? (
                <div className='card-footer-all-comments'>
                    {comment
                        ?.sort((a, b) => new Date(b.date) - new Date(a.date))
                        .map((com) => (
                            <>
                                <div className='single-comment'>
                                    <div>{com.userName}</div>
                                    <div>{com.comment}</div>
                                    <div>
                                        {Intl.DateTimeFormat('ru').format(com.date)} {com.time}
                                    </div>
                                </div>
                            </>
                        ))}
                </div>
            ) : (
                <>
                    {loggedIn ? (
                        <div className='footer-add-comment'>
                            <textarea
                                ref={inputText}
                                className='log-in-inputs'
                                style={{
                                    width: '100%',
                                    height: '100px',
                                    marginTop: '20px',
                                    padding: '15px',
                                }}
                                type='text'
                                placeholder='Add Comment'
                            />
                            <button className='button' onClick={handleAddComment}>
                                Add comment
                            </button>
                        </div>
                    ) : (
                        <p>
                            For adding a comment you need to{' '}
                            <NavLink className='card-footer-links' to='../../profile'>
                                Log In
                            </NavLink>{' '}
                            or{' '}
                            <NavLink className='card-footer-links' to='../../profile/signup'>
                                Sign In
                            </NavLink>
                        </p>
                    )}
                    <div className='card-footer-all-comments'>
                        {comment
                            ?.sort((a, b) => new Date(b.date) - new Date(a.date))
                            .map((com) => (
                                <>
                                    <div className='single-comment'>
                                        <div>{com.userName}</div>
                                        <div>{com.comment}</div>
                                        <div>
                                            {Intl.DateTimeFormat('ru').format(com.date)} {com.time}
                                        </div>
                                    </div>
                                </>
                            ))}
                    </div>
                </>
            )}
        </div>
    );
};

export default Comments;
