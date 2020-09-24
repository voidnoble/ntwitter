import React, { useEffect, useState } from 'react';
import { dbService } from 'fbase';
import Ntweet from 'components/Ntweet';

const Home = ({ userObj }) => {
  const [ntweet, setNtweet] = useState('');
  const [ntweets, setNtweets] = useState([]);

  const onSubmit = async (evt) => {
    evt.preventDefault();

    await dbService.collection('ntweets').add({
      text: ntweet,
      createdAt: Date.now(),
      creatorId: userObj.uid,
    });

    setNtweet('');
  };

  const onChange = (evt) => {
    setNtweet(evt.target.value);
  };

  useEffect(() => {
    dbService.collection('ntweets').onSnapshot((snapshot) => {
      const ntweetArray = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setNtweets(ntweetArray);
    });
  }, []);

  return (
    <div>
      <form onSubmit={onSubmit}>
        <input type="text" value={ntweet} onChange={onChange} placeholder="What's on your mind?" maxLength={120} />
        <input type="submit" value="Ntweet" />
      </form>
      <div>
        {ntweets.map((item) => (
          <Ntweet key={item.id} item={item} isOwner={item.creatorId === userObj.uid} />
        ))}
      </div>
    </div>
  );
};

export default Home;
