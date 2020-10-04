import React, { useEffect, useState } from 'react';
import { authService, dbService } from 'fbase';
import { useHistory } from 'react-router-dom';

const Profile = ({ userObj }) => {
  const history = useHistory();
  const [newDisplayName, setNewDisplayName] = useState(userObj.displayName);

  const onLogoutClick = () => {
    authService.signOut();
    history.push('/');
  };

  const getMyNtweets = async () => {
    const ntweets = await dbService.collection('ntweets').where('creatorId', '==', userObj.uid).orderBy('createdAt', 'desc').get();
    console.log(ntweets.docs.map((doc) => doc.data()));
  };

  const onChangeDisplayName = (evt) => {
    setNewDisplayName(evt.target.value);
  };

  const onSubmit = async (evt) => {
    evt.preventDefault();
    
    if (userObj.displayName !== newDisplayName) {
      await userObj.updateProfile({
        displayName: newDisplayName
      });
    }
  };

  useEffect(() => {
    getMyNtweets();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <form onSubmit={onSubmit}>
        <input type="text" name="displayName" id="displayName" placeholder="Display name" onChange={onChangeDisplayName} value={newDisplayName} />
      </form>
      <button onClick={onLogoutClick}>Logout</button>
    </>
  );
};
export default Profile;
