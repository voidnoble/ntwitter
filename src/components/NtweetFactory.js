import React, { useState } from 'react';
import { dbService, storageService } from 'fbase';
import { v4 as uuidv4 } from 'uuid';

const NtweetFactory = ({ userObj }) => {
  const [ntweet, setNtweet] = useState('');
  const [attachment, setAttachment] = useState('');

  const onSubmit = async (evt) => {
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

  const onClearPhotoClick = (evt) => {
    setAttachment(null);
  };

  return (
    <form onSubmit={onSubmit}>
      <input type="text" value={ntweet} onChange={onTextChange} placeholder="What's on your mind?" maxLength={120} />
      <input type="file" accept="image/*" onChange={onFileChange} />
      <input type="submit" value="Ntweet" />
      {attachment && (
        <div>
          <img src={attachment} width="75" height="75" />
          <button onClick={onClearPhotoClick}>Clear</button>
        </div>
      )}
    </form>
  )
};

export default NtweetFactory;