import { React, useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';

const WinDetail = () => {
  const params = useParams();
  return (
    <section className="winDetail">
      <header></header>
      <section>
        <section className="goBack">뒤로가기</section>
        <section className="winDetailArea">
          <section className="detailImg">
            <img alt="description" src="/" />
          </section>
          <section className="detailFunction">
            <section className="iconArea">
              <section className="iconLeft">더보기 핀보내기 핀클립복사</section>
              <section className="iconRight">프로필 저장</section>
            </section>
            <section className="detailDescription">
              <section className="source">출처</section>
              <section className="title">사진제목</section>
              <section className="description"></section>
            </section>
          </section>
        </section>
      </section>
    </section>
  );
};

export default WinDetail;
