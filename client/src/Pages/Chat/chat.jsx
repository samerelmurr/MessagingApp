import {useEffect, useState} from 'react'
import queryString from 'query-string';
import io from 'socket.io-client';
import InfoBar from '../../Components/InfoBar/InfoBar';
import Input from '../../Components/Input/Input';
import Messages from '../../Components/Messages/Messages';
import TextContainer from '../../Components/TextContainer/TextContainer';

let socket;
const ENDPOINT = 'localhost:5000';

const Chat = ({location}) => {

    const [name, setName] = useState('');
    const [room, setRoom] = useState('');
    const [users, setUsers] = useState('');
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
  
    useEffect(() => {
      const { name, room } = queryString.parse(window.location.search);
  
      socket = io(ENDPOINT);
  
      setRoom(room);
      setName(name)

      console.log("Room in Chat: ", room);
  
      socket.emit('join', { name, room }, (error) => {
        if(error) {
          alert(error);
        }
      });
    }, [ENDPOINT, window.location.search]);
    
    useEffect(() => {
      socket.on('message', message => {
        setMessages(messages => [ ...messages, message ]);
      });
      
      socket.on("roomData", ({ users }) => {
        setUsers(users);
      });
    }, []);

    const sendMessage = (event) => {
        event.preventDefault();
    
        if(message) {
          socket.emit('sendMessage', message, () => setMessage(''));
        }
      }

    console.log(message, messages);

  return (
    <div>
        <div className="outerContainer">
            <div className="container">
                <InfoBar room={room}/>
                <Messages messages={messages} name={name}/>
                <Input setMessage={setMessage} sendMessage={sendMessage} message={message}/>
            </div>
            <TextContainer users={users}/>
        </div>
    </div>
  )
}

export default Chat