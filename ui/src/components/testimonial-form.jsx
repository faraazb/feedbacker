import './testimonial-form.css';
import {useNavigate, useParams} from "react-router-dom";
import {getProduct, sendTestimonial} from "../api";
import {useEffect, useState} from "react";
import {FormControl, FormErrorMessage, FormHelperText, FormLabel, Input, Textarea, useToast} from "@chakra-ui/react";

const TestimonialForm = (props) => {
    let params = useParams();
    const toast = useToast();
    let navigate = useNavigate();
    const { productId } = params;
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [authorRole, setAuthorRole] = useState('');
    const [body, setBody] = useState('');
    const [productName, setProductName] = useState('')

    useEffect(() => {
        getProduct(params.productId)
            .then(product => {
                setProductName(product.name)
            })
            .catch(error => {
                console.error(error);
            })
    })

    const submitForm = () => {
        sendTestimonial(productId,
            {
                author: author,
                authorImg: null,
                authorRole: authorRole,
                title: title,
                body: body
            })
            .then(response => {
                toast({
                    title: 'Done!',
                    description: "Your feedback was sent!",
                    status: 'success',
                    duration: 9000,
                    position: 'top',
                    isClosable: true,
                });
                navigate(`/thank-you/${productId}`)
            })
            .catch(error => {
                console.error(error);
                toast({
                    title: 'Failed!',
                    description: "There was a problem sending your feedback! Please try again.",
                    status: 'failure',
                    duration: 9000,
                    position: 'top',
                    isClosable: true,
                });
            })
    }

    const isEmpty = (input) => {
        return input === '';
    }

    return (
        <div className='testimonial-form'>
            <div className='testimonial-form-product'>
                <span className='h1-title'>{productName}</span>
            </div>
            <div className='form-field'>
                <FormControl isRequired isInvalid={isEmpty(author)}>
                    <FormLabel htmlFor='name'>Name</FormLabel>
                    <Input id='name' type='text' onChange={e => setAuthor(e.target.value)}/>
                    {!isEmpty(author) ? (
                        <FormHelperText>
                            Enter your name
                        </FormHelperText>
                    ) : (
                        <FormErrorMessage>Required.</FormErrorMessage>
                    )}
                </FormControl>
            </div>
            <div className='form-field'>
                <FormControl isRequired isInvalid={isEmpty(authorRole)}>
                    <FormLabel htmlFor='designation'>Designation/Organization</FormLabel>
                    <Input id='designation' type='text' onChange={e => setAuthorRole(e.target.value)}/>
                    {!isEmpty(authorRole) ? (
                        <FormHelperText>
                            Enter your role or the name of your company
                        </FormHelperText>
                    ) : (
                        <FormErrorMessage>Required.</FormErrorMessage>
                    )}
                </FormControl>
            </div>
            <div className='form-field'>
                <span className='h2-title'>Feedback</span>
                <FormControl isRequired>
                    <Input
                        id='feedback-title' type='text' placeholder='A short title'
                        onChange={e => setTitle(e.target.value)}
                    />
                    <FormErrorMessage>Required.</FormErrorMessage>
                    {isEmpty(title) && (
                        <FormErrorMessage>Required.</FormErrorMessage>
                    )}
                </FormControl>
                <FormControl isRequired>
                    <Textarea
                        id='feedback-body' type='text' placeholder='Your feedback'
                        onChange={e => setBody(e.target.value)}
                    />
                    {isEmpty(body) && (
                        <FormErrorMessage>Required.</FormErrorMessage>
                    )}
                </FormControl>
            </div>
            <div className='form-field form-submit'>
                <button className='form-submit' onClick={submitForm}>Send Feedback</button>
            </div>

        </div>

    )
}

export default TestimonialForm;