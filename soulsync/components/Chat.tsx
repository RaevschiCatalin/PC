// import { useState, useEffect } from 'react';
// import { collection, addDoc, query, onSnapshot, orderBy } from 'firebase/firestore';
// import { firestore,auth } from '../database/firebase';
// import styles from '../styles/Chat.module.css';
//
// const Chat = () => {
//     const [message, setMessage] = useState('');
//     const [messages, setMessages] = useState([]);
//     const { user } = auth();
//
//     useEffect(() => {
//         const q = query(collection(firestore, 'messages'), orderBy('createdAt'));
//         const unsubscribe = onSnapshot(q, (querySnapshot) => {
//             const messages: any = [];
//             querySnapshot.forEach((doc) => {
//                 messages.push({ ...doc.data(), id: doc.id });
//             });
//             setMessages(messages);
//         });
//
//         return () => unsubscribe();
//     }, []);
//
//     const sendMessage = async () => {
//         if (message.trim()) {
//             await addDoc(collection(firestore, 'messages'), {
//                 text: message,
//                 createdAt: new Date(),
//                 uid: user.uid,
//                 displayName: user.displayName,
//             });
//             setMessage('');
//         }
//     };
//
//     return (
//         <div className={styles.chatContainer}>
//             <div className={styles.messages}>
//                 {messages.map((msg) => (
//                     <div key={msg.id}>
//                         <strong>{msg.displayName}</strong>: {msg.text}
//                     </div>
//                 ))}
//             </div>
//             <div className={styles.inputContainer}>
//                 <input
//                     type="text"
//                     value={message}
//                     onChange={(e) => setMessage(e.target.value)}
//                 />
//                 <button onClick={sendMessage}>Send</button>
//             </div>
//         </div>
//     );
// };
//
// export default Chat;
