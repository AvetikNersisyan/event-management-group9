import { useState } from 'react';
import { useSelector } from 'react-redux';
import Contact from './eventFooterComponents/Contact';
import Persons from './eventFooterComponents/Persons';
import Comments from './eventFooterComponents/Comments';

const EventFooter = ({ ev }) => {
    const loggedIn = useSelector((state) => state.UserDuck.activeUser)
    const [contact, setContact] = useState(false)
    const [personsList, setPersonsList] = useState(true)
    const [comments, setComments] = useState(false)

    const openContact = () => {
        setPersonsList(false)
        setContact(true)
        setComments(false)
    }
    const openPersons = () => {
        setContact(false)
        setPersonsList(true)
        setComments(false)
    }
    const openComments = () => {
        setComments(true)
        setContact(false)
        setPersonsList(false)
    }

    return (
        <div className={'event-footer'}>
            <ul className={'head'}>
                <li onClick={openPersons}> Persons</li>
                <li onClick={openContact}> Contact</li>
                <li onClick={openComments}> Comments</li>
            </ul>

            <hr />
            {
                contact ? <Contact loggedIn={loggedIn} eventId={ev.id} /> : ''
            }
            {
                personsList ? <Persons persons={ev.speakers} /> : ''
            }
            {
                comments ? <Comments comments={ev.comments} loggedIn={loggedIn} id={ev.id} ev={ev} /> : ''
            }
        </div>
    );
};

export default EventFooter;
