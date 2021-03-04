import { useState } from 'react';

export default function useUseranem() {
  
  const getUsername = () => {
    const userString = localStorage.getItem('token');
    const userName = JSON.parse(userString);
    return userName?.username
  };

  const [username, setUsername] = useState(getUsername());

  const saveUsername = userName => {
    localStorage.setItem('username', JSON.stringify(userName));
    setUsername(userName.username);
  };

  return {
    setUsername: saveUsername,username
  
  }
}