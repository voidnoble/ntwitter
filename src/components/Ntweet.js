import { faPencilAlt, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { dbService, storageService } from 'fbase';
import React, { useState } from 'react';

const Ntweet = ({ item, isOwner }) => {
  const [editing, setEditing] = useState(false);
  const [newNtweet, setNewNtweet] = useState(item.text);

  const onDeleteClick = async () => {
    const ok = window.confirm('Are you sure you want to delet this?');
    if (ok) {
      await dbService.doc(`ntweets/${item.id}`).delete();
      await storageService.refFromURL(item.attachementUrl).delete();
    }
  };

  const toggleEditing = () => setEditing((prev) => !prev);

  const onSubmit = async (evt) => {
    evt.preventDefault();

    await dbService.doc(`ntweets/${item.id}`).update({
      text: newNtweet,
    });

    setEditing(false);
  };

  const onEditChange = (evt) => {
    setNewNtweet(evt.target.value);
  };

  return (
    <div className="nweet">
      {editing ? (
        isOwner && (
          <>
            <form onSubmit={onSubmit} className="container nweetEdit">
              <input type="text" name="text" value={newNtweet} onChange={onEditChange} placeholder="Edit your text" required />
              <input type="submit" value="Update" className="formBtn" />
            </form>
            <button onClick={toggleEditing} className="formBtn cancelBtn">Cancel Edit</button>
          </>
        )
      ) : (
        <>
          <h4>{item.text}</h4>
          {item.attachementUrl && <img src={item.attachementUrl} />}
          {isOwner && (
            <div className="nweet__actions">
              <span onClick={onDeleteClick}>
                <FontAwesomeIcon icon={faTrash} />
              </span>
              <span onClick={toggleEditing}>
                <FontAwesomeIcon icon={faPencilAlt} />
              </span>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Ntweet;
