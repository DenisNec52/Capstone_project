import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { TextField, Button, CircularProgress } from '@mui/material';
import axios from 'axios';
import "../components/UploadPostForm.css";

const UploadPostForm = () => {
  const { register, handleSubmit, reset } = useForm();
  const [loading, setLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);

  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append('photo', data.photo[0]);
    formData.append('description', data.description);
    formData.append('tag', data.tag);

    setLoading(true);
    try {
      const response = await axios.post('/api/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log(response.data);
      reset();
      setImagePreview(null);
    } catch (error) {
      console.error('Error uploading image:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setImagePreview(URL.createObjectURL(e.target.files[0]));
    }
  };

  return (
    <>
      <div className="upload__form-wrapper">
        <form onSubmit={handleSubmit(onSubmit)} className="upload__form-container">
          {imagePreview && (
            <div>
              <img src={imagePreview} alt="Preview" className="upload__image-preview" />
            </div>
          )}
          <div className="upload__form-content">
            <TextField
              type="file"
              accept="image/*"
              {...register('photo', { required: true })}
              onChange={handleImageChange}
              variant="outlined"
              fullWidth
              margin="normal"
            />
            <TextField
              label="Description"
              {...register('description')}
              variant="outlined"
              fullWidth
              margin="normal"
            />
            <TextField
              label="Tag"
              {...register('tag')}
              variant="outlined"
              fullWidth
              margin="normal"
            />
            <div className="upload__submit-btn">
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                disabled={loading}
              >
                {loading ? <CircularProgress size={10} /> : 'Upload Image'}
              </Button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default UploadPostForm;
