import React, { ChangeEvent, useContext, useEffect, useState } from "react";
import axios from "axios";
import styles from "./SingleUserCard.module.css";
import { Systems } from "@/app/global.t";
import { UserAuth } from "@/app/context/AuthContext";
import Checkbox from "../elements/Checkbox";
import LearningCheckbox from "../elements/Learning-Checkbox";
import langCall from "@/app/utils/langCheckFunc";
import { useRouter } from "next/navigation";
import TitleCase from "@/app/utils/TitleCase";
import Upper from "@/app/utils/Upper";
import { User } from "@/app/global.t";
import { MessagesContext } from "@/app/context/MessageContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGamepad, faGlobe, faTrash } from "@fortawesome/free-solid-svg-icons";
import { faPlaystation, faSteam, faXbox } from "@fortawesome/free-brands-svg-icons";

interface LevelLookup {
  [key: number]: string;
  1: string;
  2: string;
  3: string;
  4: string;
  5: string;
}

export default function SingleUserCard(props: any) {
  const { uid } = UserAuth();
  const userObject: User = props.userObject
  console.log("🐝", userObject)
  
  const levelLookup: LevelLookup = {
    1: "Beginner",
    2: "Elementary",
    3: "Intermediate",
    4: "Advanced",
    5: "Proficient",
  };

  const systems: Systems = {
    pc: faSteam,
    xbox: faXbox,
    playstation: faPlaystation,
    switch: faGamepad,
  };

  const genres = {
    

  }

  const { updateChatUserId, updateChatId, updateUserName, updateUserProfileURL } = useContext(MessagesContext);
  
  const router = useRouter();

  const handleGoToMessages = () => {
    if (uid) {
      // create combinedId for messging 
      const combinedId: string = uid > userObject.uid ? uid + userObject.uid : userObject.uid + uid;
      // set user info who user want to chat with
      updateChatUserId(userObject.uid);
      updateChatId(combinedId);
      updateUserName(userObject.username);
      updateUserProfileURL(userObject.profile_picture_url);
      // go to /messages/id
      router.push("/messages/message");
    }
  };

  return (
    <div>
      <h1>{userObject.username}</h1>
      {userObject.about_me ? (
        <>
        <div className={styles.first}>
          <div className={styles.userImg}>
            <img
              src={
                userObject.profile_picture_url ||
                "https://firebasestorage.googleapis.com/v0/b/gamertalk-8133c.appspot.com/o/images%2Fdefault%2Fuserdefault.png?alt=media&token=f5201169-c537-485f-ba41-ec38e44464ca"
              }
              alt=""
              id={styles.image}
            />
          </div>

          <div className={styles.speakAndLearn}>

          <p><span className={styles.heading}>Speaks:</span> 
          {userObject.languages.fluent.map((element: string, index: number) => (
            <p key={index}>{" " + Upper(element)}</p>
          ))}  </p>

          <p> <span className={styles.heading}>Learning:</span>
          {userObject.languages.learning.map(
            (
              element: {
                level: number;
                language: string;
              },
              index: number
            ) => (
              <p key={index}>
                {Upper(element.language)}:{" "}
                {levelLookup[element.level]}
              </p>
            )
          )} </p>

          </div>

          </div>
        

          <p className={styles.heading}>
            Region: <FontAwesomeIcon icon={faGlobe} />
          </p>
          <p>{TitleCase(userObject.user_region)}</p>

          

          {/* <p className={styles.heading}>Date of Birth: </p>
          <p> {userObject.date_of_birth}</p> */}

          <div className={styles.systems}>
            <p className={styles.heading}>User Systems:</p>
            {userObject.user_systems.map((system: string, index: number) => (
            <FontAwesomeIcon
            icon={systems[system]}
            className={styles.game}
            />
            ))}
          </div>

          <div className={styles.language}>
            <p className={styles.heading}>Genres:</p>
            {userObject.user_genre.map((genre: string, index: number) => (
              <p key={index}>{Upper(genre)}</p>
            ))}

            <p className={styles.heading}>About Me:</p>
            <p>{userObject.about_me}</p>

            <p className={styles.heading}>
              Currently Playing: <FontAwesomeIcon icon={faGamepad} />
            </p>
            <p>{userObject.currently_playing}</p>
          </div>
          <button className={styles.button} onClick={handleGoToMessages}> Message</button>
        </>
      ) : (
        "Loading Profile..."
      )}
    </div>
  );
}
