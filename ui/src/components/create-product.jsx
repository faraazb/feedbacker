import {FormControl, FormErrorMessage, FormHelperText, FormLabel, Input, useToast} from "@chakra-ui/react";
import {useState} from "react";
import {useNavigate} from "react-router-dom";
import {createProduct} from "../api";

const CreateProduct = () => {
    let userId = '625a89fa272d76013668aa52';
    let toast = useToast();
    let navigate = useNavigate();
    const [productName, setProductName] = useState('');

    const isEmpty = (input) => {
        return input === '';
    }

    const submitForm = () => {
        createProduct({name: productName, owner: userId})
            .then(response => {
                toast({
                    title: 'Done!',
                    description: "Product created!",
                    status: 'success',
                    duration: 3000,
                    position: 'top',
                    isClosable: true,
                });
            })
            .catch(error => {
                toast({
                    title: 'Failed!',
                    description: "Product was not created!",
                    status: 'error',
                    duration: 3000,
                    position: 'top',
                    isClosable: true,
                });
                console.error(error)
            })
        navigate('/products')
    }

    return (
        <div id='create-product' className='testimonial-form product-form'>
            <div className='testimonial-form-product'>
                <span className='h1-title'>Create a Product</span>
            </div>
            <div className='form-field'>
                <FormControl isRequired isInvalid={isEmpty(productName)}>
                    <FormLabel htmlFor='name'>Name</FormLabel>
                    <Input id='name' type='text' onChange={e => setProductName(e.target.value)}/>
                    {!isEmpty(productName) ? (
                        <FormHelperText>
                            Enter product name
                        </FormHelperText>
                    ) : (
                        <FormErrorMessage>Required.</FormErrorMessage>
                    )}
                </FormControl>
            </div>
            <div className='form-field form-submit'>
                <button disabled={isEmpty(productName)} className='form-submit' onClick={submitForm}>Create</button>
            </div>
        </div>
    )
}

export default CreateProduct;