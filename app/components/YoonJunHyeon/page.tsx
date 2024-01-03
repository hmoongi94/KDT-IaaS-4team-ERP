// Customer page를 렌더링하는 파일입니다.

import Nav from "@/app/components/Nav/Nav"; 
import CustomerMain from '../components/homeComp/customerMain';

export default function Customer() {
  return (
    <div>
      <Nav />
      <CustomerMain />
    </div>
  );
}