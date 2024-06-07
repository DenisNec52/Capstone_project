import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { TextField, Button, CircularProgress } from '@mui/material';
import axios from 'axios';
import "../components/UploadPostForm.css";

const UploadPostForm = () => {
  // Inizializzazione dello stato e delle funzioni di react-hook-form
  const { register, handleSubmit, reset } = useForm();
  const [loading, setLoading] = useState(false); // Stato per gestire lo stato di caricamento
  const [imagePreview, setImagePreview] = useState(null); // Stato per mostrare l'anteprima dell'immagine

  // Funzione per gestire la sottomissione del form
  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append('photo', data.photo[0]); // Aggiunta dell'immagine al FormData
    formData.append('description', data.description); // Aggiunta della descrizione al FormData
    formData.append('tag', data.tag); // Aggiunta del tag al FormData

    setLoading(true); // Impostazione dello stato di caricamento a true
    try {
      // Richiesta di upload dell'immagine al server
      const response = await axios.post('/api/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log(response.data); // Log del risultato della richiesta
      reset(); // Reset del form dopo l'upload
      setImagePreview(null); // Rimozione dell'anteprima dell'immagine
    } catch (error) {
      console.error('Error uploading image:', error); // Log degli errori nell'upload dell'immagine
    } finally {
      setLoading(false); // Impostazione dello stato di caricamento a false dopo il completamento
    }
  };

  // Funzione per gestire il cambiamento dell'immagine e mostrare l'anteprima
  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setImagePreview(URL.createObjectURL(e.target.files[0])); // Creazione dell'URL per l'anteprima dell'immagine
    }
  };

  return (
    <>
      {/* Form per l'upload dell'immagine */}
      <div className="upload__form-wrapper">
        <form onSubmit={handleSubmit(onSubmit)} className="upload__form-container">
          {/* Anteprima dell'immagine */}
          {imagePreview && (
            <div>
              <img src={imagePreview} alt="Preview" className="upload__image-preview" />
            </div>
          )}
          <div className="upload__form-content">
            {/* Campo per selezionare l'immagine */}
            <TextField
              type="file"
              accept="image/*"
              {...register('photo', { required: true })}
              onChange={handleImageChange}
              variant="outlined"
              fullWidth
              margin="normal"
            />
            {/* Campo per inserire la descrizione dell'immagine */}
            <TextField
              label="Description"
              {...register('description')}
              variant="outlined"
              fullWidth
              margin="normal"
            />
            {/* Campo per inserire il tag dell'immagine */}
            <TextField
              label="Tag"
              {...register('tag')}
              variant="outlined"
              fullWidth
              margin="normal"
            />
            {/* Bottone per inviare il form */}
            <div className="upload__submit-btn">
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                disabled={loading} // Disabilita il bottone durante il caricamento
              >
                {/* Mostra un indicatore di caricamento se è in corso */}
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
