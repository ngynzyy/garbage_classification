import { useCallback, useState } from 'react'
import {useDropzone} from 'react-dropzone'
import bgimage from '../assets/image.svg'

const Form = ({image , setImage , isPending , setIsPending , url , setUrl , setError}) => {
    
    

  const uploadImage = async (image) => {
    setError(false);
    setIsPending(true);

    const formData = new FormData();
    formData.append('file', image);  // Use 'file' instead of 'image'

    try {
      const res = await fetch('http://172.31.37.25:8088/api/v1/upload', {
        method: 'POST',
        body: formData,
        headers: {
          'accept': 'application/json',
        },
      });

      if (!res.ok) {
        throw Error('Internal Server Error');
      }

      const data = await res.json();
      setUrl(data.path);
      setIsPending(false);
    } catch (error) {
      console.log(error);
      setIsPending(false);
      setError(true);
    }
  };




    const onDrop = useCallback(async(acceptedFiles) => {
      
       let file = acceptedFiles[0]
       let reader = new FileReader()

       reader.readAsDataURL(file)
       reader.onload = () => {
         setImage(reader.result)
         uploadImage(file)
       }
       
    } , [setImage])

    const {getRootProps , getInputProps , open} = useDropzone({onDrop , 
                                                               maxFiles:1 , 
                                                               accept : {'image/*' : []} ,
                                                               noClick : true ,
                                                               noKeyboard : true})

  return (
    <div className='flex flex-col h-[50vh] drop-shadow-lg p-5 justify-between bg-white w-4/5 md:w-2/6 sm:w-4/6 rounded-md'>
      <p className='text-center font-semibold text-lg md:text-xl mb-2'>Upload your image</p>
      <p className='text-center font-thin text-xs text-slate-400 mb-2'>File should be Jpeg , Png...</p>
      <div  {...getRootProps({className :'md:h-52 sm:h-44 h-auto bg-light-grey border-2 border-light-blue border-dashed rounded-md'})}>
         <input {...getInputProps({name : 'image'})}/>
         <img src={bgimage} className='max-w-1/3 mx-auto mt-4' draggable="false" style={{ userDrag: 'none' }} />
         <p className='text-slate-400 md:text-md text-center mt-4 text-sm'>Drag & Drop your image here</p>
      </div>
      <p className='text-center font-normal text-slate-400 text-md mt-2 mb-2'>Or</p>
      <button onClick={open} className='bg-blue text-white font-normal p-1 rounded-lg w-auto mx-auto px-4 py-2 text-md'>Choose a file</button>
    </div>
  )
}

export default Form

