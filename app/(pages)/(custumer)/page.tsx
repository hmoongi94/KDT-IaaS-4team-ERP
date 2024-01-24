// Customer page를 렌더링하는 파일입니다.
'use client'
import CustomerMain from '@/components/homeComp/customerMain';
import HeaderItem from '@/components/Header/HeaderItem';
import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';
import { AuthContext, AuthProvider } from '@/components/AuthContext';
import { useContext } from 'react';

export default function Customer() {
const { isLoggedIn } = useContext(AuthContext)
console.log(isLoggedIn)


return (
  <div className='flex-center flex-col '>
    <Header>
      {isLoggedIn ? (
        <>
          <HeaderItem href='/orderlist'>주문조회</HeaderItem>
          <HeaderItem href='/cart'>장바구니</HeaderItem>
          <HeaderItem href='/logout'>로그아웃</HeaderItem>
        </>
      ) : (
        <HeaderItem href='/login' >로그인</HeaderItem>
      )}
    </Header>
    <CustomerMain />
    <Footer />
  </div>
);
      }