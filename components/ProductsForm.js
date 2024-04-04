
import axios from "axios";
import { redirect } from "next/dist/server/api-utils";
import { useRouter } from "next/router";
import { useState } from "react";
import Spinner from "./Spinner";
import {ReactSortable} from "react-sortablejs";

//xtract specific properties from that object and assign them to variables
export default function ProductForm({
_id,
title:existingTitle,
desription:existingDescription,
price:existingPrice,
images:existingImages,
})
{
    //these lines of code set up state variables for title, description, and price using the useState hook, initialize them with default values (if provided),
    const [title,setTitle]=useState(existingTitle || '');
    const [description,setDescription]=useState(existingDescription || '');
    const [price,setPrice]=useState(existingPrice || '');
    const [images,setImages]=useState(existingImages||[]);
    const[goToProducts,setGoToProducts]=useState(false);
    const[isUploading,setIsUploading]=useState(false);
    const router=useRouter();
    
    // using async function to save product at ev
     async function saveProduct(ev)
    {
        ev.preventDefault();
        const data={title,description,price,images};
        if(_id)
        {
            //update
            await axios.put('/api/products',{...data,_id});
        }
        else
        {
            //create
            await axios.post('/api/products',data)
        }
        setGoToProducts(true);
    }
    if(goToProducts)
    {
         router.push('/products')
    }

    // function to upload images
    async function uploadImages(ev){

        const files = ev.target?.files;
        if(files?.length>0)
        {
            setIsUploading(true);
            const data= new FormData();
            for (const file of files )
            {
                data.append('file',file);
            }
            const  res = await axios.post('/api/upload',data);
            setImages(oldImages =>{
                return [...oldImages, ...res.data.links];
            });
            setIsUploading(false);
            }
        }
    
        function updateImagesOrder(images)
        {
            setImages(images);
        }

    return(
    
        <form onSubmit={saveProduct} >

        
            <label>Product Name</label>
            <input type="text"
            placeholder="product name"
            value={title} 
            onChange={ev=>setTitle(ev.target.value)}/>

            <label>
            Photo
            </label>
            <div className="mb-2 flex flex-wrap gap-1">
                <ReactSortable list ={images} 
                setList ={updateImagesOrder}
                className="flex flex-wrap gap-1">
                {!!images?.length && images.map(link => (
                    <div key={link} className=" h-24">
                        <img src={link} alt="" className="rounded-lg"/>
                    </div>
                ))}
                </ReactSortable>

                {isUploading &&(
                    <div className="h-20 flex items-center">
                        <Spinner/>
                    </div>
                )}
            <label className="  w-20 h-20 border cursor-pointer text-center flex items-center justify-center text-gray-500 rounded-md bg-gray-200"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5" />
            </svg>
            <input type="file" onChange={uploadImages} className="hidden"/>
            </label>
            </div>



            <label>Description</label>
            <textarea placeholder="description"
            value={description} 
            onChange={ev=>setDescription(ev.target.value)}/>


            <label>Price</label>
            <input type="number" 
            placeholder="&#x20B9;"
            value={price} 
            onChange={ev=>setPrice(ev.target.value)}/>

            <div className="center-container">
                <button type="submit"
                className="btn-primary">
                    Save
                </button>
            </div>

        </form>

    
    )
}