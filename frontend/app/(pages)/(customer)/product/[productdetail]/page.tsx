'use client'
import ProductDetail from "@/components/Product/productdetail";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";


export default function ProductPage() {
  const {productdetail} = useParams();
  const [productdata, setproductdata] =useState([])
  // const [params, setparams] =useState([])

  
  
  useEffect(()=> {
  const fetchProduct = async () => {
    try {
      const response = await fetch(`http://localhost:3560/product/${productdetail}`);
      console.log(productdetail)
      const data = await response.json();
      console.log(data[1]); // 확인용
      setproductdata(data)
    } catch (error) {
      console.error("에러 발생 :", error);
    }
  }

    fetchProduct();
    },[productdetail])

    return (
      <>
        <ProductDetail productdetailss={productdata} />
      </>
    );

  }



  



