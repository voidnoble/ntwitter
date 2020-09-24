import { dbService } from 'fbase';
import React, { useState } from 'react';

const Ntweet = ({ item, isOwner }) => {
  const [editing, setEditing] = useState(false);
  const [newNtweet, setNewNtweet] = useState(item.text);

  const onDeleteClick = async () => {
    const ok = window.confirm('Are you sure you want to delet this?');
    if (ok) {
      await dbService.doc(`ntweets/${item.id}`).delete();
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
    <div>
      {editing ? (
        isOwner && (
          <>
            <form onSubmit={onSubmit}>
              <input type="text" name="text" value={newNtweet} onChange={onEditChange} placeholder="Edit your text" required />
              <input type="submit" value="Update" />
            </form>
            <button onClick={toggleEditing}>Cancel Edit</button>
          </>
        )
      ) : (
        <>
          <h4>{item.text}</h4>
          {isOwner && (
            <>
              <button onClick={onDeleteClick}>Delete</button>
              <button onClick={toggleEditing}>Edit</button>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default Ntweet;
