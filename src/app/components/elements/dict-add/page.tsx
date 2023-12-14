// @ts-nocheck

"use client"

import React, { useState } from 'react';
import styles from './add.module.css';
import axios from 'axios';
import { UserAuth } from '@/app/context/AuthContext';
import AlertModal from '../../layouts/AlertModal';

const Add: React.FC<Param> = ({ handleClosePopup }) => {
  const [front, setFront] = useState('');
  const [back, setBack] = useState('');
  // AlertModal
  const [open, setOpen] = useState<boolean>(false);
  const [alertMessage, setAlertMessage] = useState<string>("");

  const { uid } = UserAuth();

  const handleClose = () => setOpen(false);

  const handleFront = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setFront(value);
  };

  const handleBack = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setBack(value);
  };

  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const payload = {
      user_uid: uid,
      front,
      back,
    };
    const addCardUrl = process.env.NEXT_PUBLIC_API_URL + "/api/new-flashcard/";
    axios
      .post(addCardUrl, payload)
      .then((response) => {
        // Handle success or perform any necessary actions
        // Close the pop-up
        handleClosePopup();
      })
      .catch((error) => {
        setAlertMessage('Please enter in words for both the Front and Back');
        setOpen(true);
        console.log(error);
      });
  };

  return (
    <div className="fixed top-0 left-0 w-[100%] h-[100%] bg-black flex justify-center items-center text-black">
      {open && (
        <AlertModal
          open={open}
          handleClose={handleClose}
          title="Validation Error"
          message={alertMessage}
        />
      )}
      <div className="bg-white p-5 rounded-lg">
        <h2>Add a new card</h2>
        <form onSubmit={handleFormSubmit}>
          <div className="m-10 h-32 w-52 bg-gray-500 border-2 border-black">
            <p className={styles.title}>Front</p>
            <input
              className={styles.input}
              value={front}
              onChange={handleFront}
            />
          </div>
          <div className="m-10 h-32 w-52 bg-gray-500 border-2 border-black">
            <p className={styles.title}>Back</p>
            <input
              className={styles.input}
              value={back}
              onChange={handleBack}
            />
          </div>
          <button className={styles.submit}>Add</button>
        </form>
        <button className={styles.close} onClick={handleClosePopup}>
          Close
        </button>
      </div>
    </div>
  );
};

export default Add;
