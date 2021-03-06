import React, { useEffect, useState } from 'react';
import { authService, dbService } from 'fbase';
import { useHistory } from 'react-router-dom';

const Profile = ({ userObj, refreshUser }) => {
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
        displayName: newDisplayName,
      });
      refreshUser();
    }
  };

  useEffect(() => {
    getMyNtweets();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="container">
      <form onSubmit={onSubmit} className="profileForm">
        <input type="text" autoFocus name="displayName" id="displayName" placeholder="Display name" onChange={onChangeDisplayName} value={newDisplayName} className="formInput" />
        <input
          type="submit"
          value="Update Profile"
          className="formBtn"
          style={{ marginTop: 10, }}
        />
      </form>
      <span className="formBtn cancelBtn logOut" onClick={onLogoutClick}>
        Log Out
      </span>
    </div>
  );
};
export default Profile;
