'use client';

import { useRef, useState } from 'react';
import classes from './ImagePicker.module.css';
import Image from 'next/image';

const ImagePicker = ({ label, name }) => {
  const pickerRef = useRef();
  const [pickedImage, setPickedImage] = useState();
  const handlePick = () => {
    pickerRef.current.click();
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];

    if (!file) {
      setPickedImage(null);
      return;
    }

    const fileReader = new FileReader();
    fileReader.onload = () => {
      setPickedImage(fileReader.result);
    };
    fileReader.readAsDataURL(file);

    setPickedImage(file);
  };

  return (
    <div className={classes.picker}>
      <label htmlFor={name}>{label}</label>
      <div className={classes.controls}>
        <div className={classes.preview}>
          {!pickedImage && <p>No Image picked yet</p>}
          {pickedImage && (
            <Image
              src={pickedImage}
              alt="The image selected by the user"
              fill
            />
          )}
        </div>
        <input
          className={classes.input}
          type="file"
          id={name}
          accept="image/png, image/jpeg"
          name={name}
          ref={pickerRef}
          onChange={handleImageChange}
          required
        />
        <button className={classes.button} type="button" onClick={handlePick}>
          Pick an Image
        </button>
      </div>
    </div>
  );
};

export default ImagePicker;
