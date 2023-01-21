import React, { useEffect, useRef, useState } from 'react';
import { useAppSelector } from '../../../app/Hooks';
import { RootState } from '../../../app/Store';
import ChatInput from '../chatInput/ChatInput';
import styles from './ChatBox.module.css';
import io from 'socket.io-client';

const socket = io('/socket');

export default function ChatBox() {
  const chatLog = useAppSelector((state: RootState) => state.game.chatLog);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [isConnected, setIsConnected] = useState(socket.connected);
  const [lastPong, setLastPong] = useState(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({
      behavior: 'smooth',
      block: 'end'
    });
  };

  useEffect(() => {
    scrollToBottom();
  }, [chatLog]);

  useEffect(() => {
    // this is a beta! Do not use in production builds!
    if (import.meta.env.PROD) {
      return;
    }

    socket.on('connect', () => {
      setIsConnected(true);
    });

    socket.on('disconnect', () => {
      setIsConnected(false);
    });

    socket.on('pong', () => {
      console.log('pong');
    });

    return () => {
      socket.off('connect');
      socket.off('disconnect');
      socket.off('pong');
    };
  }, []);

  // TODO We really should not be dangerouslySetInnerHTML it's pretty bad mmkay
  return (
    <div className={styles.chatBoxContainer}>
      <div className={styles.chatBoxInner}>
        <div className={styles.chatBox}>
          {chatLog &&
            chatLog.map((chat, ix) => {
              return (
                <div
                  dangerouslySetInnerHTML={{ __html: chat }}
                  key={ix}
                  ref={messagesEndRef}
                ></div>
              );
            })}
        </div>
      </div>
      <ChatInput />
    </div>
  );
}
