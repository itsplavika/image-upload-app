import React, {useRef, useState} from "react";

import {getBase64 , resize} from '../../common.js';

import './image-upload.css';
 
const maxFileSize = 1024 * 1024;
 
const ImageUpload = () => {
  const inputRef = useRef(null);
  const [error, setError] = useState('');
  const [imageList, setImageList] = useState([]);

  const onChangeHandler = async (evt) => {
    const { files } = evt.target;
    if(!files.length) {
      setError('No file uploaded');
      return false;
    }

    const images = await setImages(files);
    if (images && images.length > 0) {
      const isValidImage = await validateUploadedFile(images);
      if(isValidImage) {
        // let finalImageList = [];
        // finalImageList = images && images.map((item) => {
        //   return item.imgUrl.value;
        // });
        setImageList(images);
      } else {
        setImageList([]);
      }
    }
  };

  const setImages = (files) => {
    const updatedImages = [];
    for(let i=0; i<files.length; i++) {
      updatedImages.push(getBase64(files[i])); // array of promises
    }

    console.log('updatedImages>>>>>  ' + updatedImages);
    return Promise.allSettled(updatedImages).then(imgList => {
      const list = imgList.map((baseImg, idx) => {
        return {
          imgUrl: baseImg,
          imgFile: files[idx]
        }
      });
      return list;
    });
  }

  const validateUploadedFile = async (files) => {
    for(let i=0; i<files.length; i++) {
      const { imgFile } = files[i];
      console.log('imgFile.size>>>>>  ' + files);
      if(imgFile.size > maxFileSize) {
        setError('File size exceeded');
        return false;
      }

      if(imgFile.size < maxFileSize) { // TODO to be equal to maxFileSize 
        return true;
      }

      if(imgFile.type.indexOf('image') === -1) {
        setError('Images file only');
        return false;
      }
    }

    return false;
  }

  return (
    <section>
      <input
        type="file"
        accept="image/png, image/jpeg"
        ref={inputRef}
        onChange={onChangeHandler} />
        {error && <p className='error'>{error}</p>}
        <h1>Image section</h1>

        <div id="img-wrapper">
          {imageList && imageList.length > 0 && <div>
              {imageList.map(item => {
                return(
                  <>
                    <button onClick={()=>resize(item)}>Resize</button>
                    <img id='imageListItem' src={item.imgUrl.value} />
                  </>
                );
              })}
              </div>
            }
            <>
              <canvas id={0}/>
              <canvas id={1}/>
              <canvas id={2}/>
              <canvas id={3}/>
             </>
          </div>
    </section>
  );
}

export default ImageUpload;