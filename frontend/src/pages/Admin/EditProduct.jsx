import React, { useEffect, useState } from 'react'
import { Button, Col, Row,Form as BForm  } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom'
import apiClient from '../../services/api-service';
import * as Yup from "yup";
import { Form, Formik } from 'formik';
import TextField from '../../components/TextField';
import { toast } from 'react-toastify';

const EditProduct = () => {
  const {id}=useParams();
  const[loading,setLoading]= useState(true);
  const[error,setError]=useState(null);
  const[product,setProduct]=useState(null);
  const{userInfo}=useSelector((state)=>state.auth);
  const navigate=useNavigate();

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Name is required."),
    price: Yup.number()
      .required("Price is required.")
      .min(0, "Price should be a positive number"),
    description: Yup.string().required("Description is required."),
    image: Yup.string(),
    category: Yup.string().required("Category is required."),
    fabric: Yup.string().required("Fabric is required."),
    color: Yup.string().required("Color is required."),
    countInStock: Yup.number()
      .required("CountInStock is required.")
      .min(0, "Count in stock should be a positive number"),
  });


  const onSubmit=(values)=>{
    const config={
      headers:{
        Authorization:`Bearer ${userInfo.token}`
      }
    }
    apiClient.put(`/products/${product._id}`, values,config).then(({data})=>{
      setProduct(data)
      toast("Product updated")
      navigate("/admin/products")
    })
    .catch((err)=>{
      const message= err.response.data ?err.response.data.message:err.message;
      setError(message)
    })
    .finally(()=>{
      setLoading(false)
    })
  }

  const imageUpload = (event) => {
    const [file] = event.target.files;
    const formData = new FormData();
    formData.append("image", file);
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
        "content-type": "multipart/form-data",
      },
    };

    apiClient
      .post("/upload/productimage", formData, config)
      setLoading(true)
      .then(({ data }) => {
        setProduct({ ...product, image: data.imageUrl });
        toast.success("Image uploaded. Please save product.");
      })
      .catch((err) => {
        const message = err.response.data
          ? err.response.data.message
          : err.message;
        setError(message);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  //to get product based on id
useEffect(()=>{
  apiClient.get(`/products/${id}`).then(({data})=>{
    setProduct(data);
  })
  .catch((err)=>{
    const message= err.response.data? err.data.response.message:err.message;
    setError(message);
  })
  .finally(()=>{
    setLoading(false)
  })
},[id])



  return (
   <Row className='ms-2'>
    <Col>
    {product && (
      <Formik validationSchema={validationSchema} initialValues={product} onSubmit={onSubmit}>
        <Form>
<TextField name='name' label='Name'/>
<TextField name='price' label='Price' type='number'/>
<TextField name='description' label='Description'/>
<TextField name='image' label='Image Url'/>

<BForm.Control type="file" accept='image/*' onChange={imageUpload}/>
<TextField name='category' label='Category' />
              <TextField name='fabric' label='Fabric' />
              <TextField name='color' label='Color' />
              <TextField
                name='countInStock'
                label='Count In Stock'
                type='number'
              />
              <Button type="submit" variant='primary'>Submit</Button>
        </Form>
      </Formik>
    )}
    </Col>
   </Row>
   
  )
    }

export default EditProduct