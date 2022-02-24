import { useRef } from "react";
import { api } from "../../../../api";

const Contact = ({ loggedIn, eventId }) => {
    const nameInput = useRef(null)
    const emaliInput = useRef(null)
    const subjectInput = useRef(null)
    const messageInput = useRef(null)

    const userMessageInput = useRef(null)
    const userSubjectInput = useRef(null)

    const handleSubmit = () => {
        let newMessage = {
            status: "unread",
            eventId: eventId,
            sender: nameInput.current.value,
            emali: emaliInput.current.value,
            subject: subjectInput.current.value,
            message: messageInput.current.value
        }
        nameInput.current.value = ''
        emaliInput.current.value = ''
        subjectInput.current.value = ''
        messageInput.current.value = ''
    }

    const handleUserSubmit = () => {
        let newMessage = {
            status: "false",
            eventId: eventId,
            sender: loggedIn.firstname + ' ' + loggedIn.lastname,
            email: loggedIn.email,
            subject: userSubjectInput.current.value,
            message: userMessageInput.current.value
        };
        userSubjectInput.current.value = '';
        userMessageInput.current.value = '';


        // պետքա ճշտել ճիշտա թէ չէ 
        fetch(`${api}/users/100`)
            .then((res) => res.json())
            .then((admin) => {
                fetch(`${api}/users/100`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        ...admin,
                        messages: [...admin.messages, newMessage],
                    }),
                }).then(res => res.json())
            });
    }

    return (
        <div className='footer-contact-comp'>
            {
                loggedIn ?
                    <>
                        <h2>Hello {loggedIn.firstname}</h2>
                        <h4>If you have some questions, you can type your message here</h4>
                        <input className="log-in-inputs" type='text' placeholder='Your Subject' ref={userSubjectInput} />
                        <textarea className="log-in-inputs" style={{ width: "100%", height: '100px', marginTop: '20px', padding: '15px' }} type='text' placeholder='Your Message' ref={userMessageInput} />
                        <button className="button" onClick={handleUserSubmit}>Submit</button>
                    </>
                    :
                    <>
                        <h2>Hi there</h2>
                        <h4>If you have some questions, you can type your message here</h4>
                        <input className="log-in-inputs" type='text' placeholder='Your Name' ref={nameInput} />
                        <input className="log-in-inputs" type='text' placeholder='Your Email' ref={emaliInput} />
                        <input className="log-in-inputs" type='text' placeholder='Your Subject' ref={subjectInput} />
                        <textarea className="log-in-inputs" style={{ width: "100%", height: '100px', marginTop: '20px', padding: '15px' }} type='text' placeholder='Your Message' ref={messageInput} />
                        <button className="button" onClick={handleSubmit}>Submit</button>
                    </>
            }
        </div>
    )
}

export default Contact;