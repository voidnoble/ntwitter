import React, { useState } from 'react';
import { dbService, storageService } from 'fbase';
import { v4 as uuidv4 } from 'uuid';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faTimes } from "@fortawesome/free-solid-svg-icons";

const NtweetFactory = ({ userObj }) => {
  const [ntweet, setNtweet] = useState('');
  const [attachment, setAttachment] = useState('');

  const onSubmit = async (evt) => {
    if (ntweet === "") {
      return;
    }

    evt.preventDefault();

    let attachementUrl = '';
    if (attachment !== '') {
      // Upload image
      const attachementRef = storageService.ref().child(`${userObj.uid}/${uuidv4()}`);
      const response = await attachementRef.putString(attachment, 'data_url');
      attachementUrl = await response.ref.getDownloadURL();
    }

    const ntweetObj = {
      text: ntweet,
      createdAt: Date.now(),
      creatorId: userObj.uid,
      attachementUrl,
    };

    // Post text
    await dbService.collection('ntweets').add(ntweetObj);

    setNtweet('');
    setAttachment(null);
  };

  const onTextChange = (evt) => {
    setNtweet(evt.target.value);
  };

  const onFileChange = (evt) => {
    const {
      target: { files },
    } = evt;

    const theFile = files[0];
    const fileReader = new FileReader();
    fileReader.onloadend = (finishedEvent) => {
      const {
        target: { result },
      } = finishedEvent;

      setAttachment(result);
    };
    fileReader.readAsDataURL(theFile);
  };

  const onClearAttachment = () => setAttachment("");

  return (
    <form onSubmit={onSubmit} className="factoryForm">
      <div className="factoryInput__container">
        <input
          className="factoryInput__input"
          value={ntweet}
          onChange={onTextChange}
          type="text"
          placeholder="What's on your mind?"
          maxLength={120}
        />
        <input type="submit" value="&rarr;" className="factoryInput__arrow" />
      </div>
      <label htmlFor="attach-file" className="factoryInput__label">
        <span>Add photos</span>
        <FontAwesomeIcon icon={faPlus} />
      </label>
      <input type="file" id="attach-file" accept="image/*" onChange={onFileChange} style={{ opacity: 0, }} />
      <input type="submit" value="Ntweet" />
      {attachment && (
        <div className="factoryForm__attachment">
          <img src={attachment} style={{ backgroundImage: attachment, }} />
          <div className="factoryForm__clear" onClick={onClearAttachment}>
            <span>Remove</span>
            <FontAwesomeIcon icon={faTimes} />
          </div>
        </div>
      )}
    </form>
  )
};

export default NtweetFactory;