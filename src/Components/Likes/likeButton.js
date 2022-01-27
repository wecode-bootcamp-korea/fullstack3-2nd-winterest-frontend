import React from 'react';
import { HeartFilled } from '@ant-design/icons';
import './likeButton.css';

function LikeButton({ like }) {
  return (
    <div className="likieButton">
      <span>
        <HeartFilled className="button red" />
      </span>
      <span className="liking">{like}</span>
    </div>
  );
}

export default LikeButton;
