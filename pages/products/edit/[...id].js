import Layout from "@/components/Layout";
import ProductForm from "@/components/ProductsForm";
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function EditProductPage()
{
    const[productInfo,setProductInfo]=useState(null)
    const router = useRouter();
    const {id}= router.query;
    useEffect(()=>{
        if(!id)
        {
            return;
        }
        axios.get('/api/products?id='+id).then(respose=>{
            setProductInfo(respose.data);
        });
    },[id]);
    
return(
    <Layout>
        <h1>Edit </h1>
        {productInfo &&(
            <ProductForm{...productInfo} />

        )}
    </Layout>
);
}