import { useEffect } from 'react';
import qs from 'qs';
import { useNavigate } from 'react-router-dom';

const KakaoAuth = () => {
  let params = new URLSearchParams(document.location.search);
  let code = params.get('code');
  const CLIENT_ID = '6973596e70c32c934b3d23792b4fed05';
  const REDIRECT_URI = 'http://localhost:3000/user/kakao';
  const navigate = useNavigate();
  useEffect(() => {
    fetch('https://kauth.kakao.com/oauth/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
      },
      body: qs.stringify({
        grant_type: 'authorization_code',
        client_id: CLIENT_ID,
        redirect_uri: REDIRECT_URI,
        code: code,
      }),
    })
      .then((res) => res.json())
      .then((data) =>
        fetch(`${process.env.REACT_APP_SERVER_HOST}/user/kakao`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: data.access_token,
          },
        })
          .then((res) => res.json())
          .then((data) => sessionStorage.setItem('token', data.accessToken))
          .then(navigate('/win'))
      );
  }, [code]);

  return <div></div>;
};

export default KakaoAuth;
