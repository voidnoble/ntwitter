import React, { useEffect, useState } from 'react';
import { dbService } from 'fbase';
import Ntweet from 'components/Ntweet';
import NtweetFactory from 'components/NtweetFactory';

const Home = ({ userObj }) => {
  const [ntweets, setNtweets] = useState([]);

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
      <NtweetFactory userObj={userObj} />
      <div>
        {ntweets.map((item) => (
          <Ntweet key={item.id} item={item} isOwner={item.creatorId === userObj.uid} />
        ))}
      </div>
    </div>
  );
};

export default Home;
