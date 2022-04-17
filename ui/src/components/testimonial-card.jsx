import React, {useEffect, useState} from "react";
import './testimonial-card.css'
import logo from './logo512.png'
import {
    AlertDialog,
    AlertDialogBody,
    AlertDialogCloseButton,
    AlertDialogContent, AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogOverlay,
    Button,
    toast, useDisclosure
} from "@chakra-ui/react";
import {deleteTestimonial, starTestimonial} from "../api";

const TestimonialCard = (props) => {
    const { controls, testimonial, remove } = props;
    const { _id: id, product_id: productId, author, author_img: authorImg,
        author_role: authorRole, title, body, starred } = testimonial;
    const [testimonialC, setTestimonialC] = useState(testimonial)

    const { isOpen, onOpen, onClose } = useDisclosure()
    const cancelRef = React.useRef()

    useEffect(() => {
        setTestimonialC(testimonial)
    }, [testimonial])

    const starUnstar = (s) => {
        starTestimonial(id, s)
            .then(testimonial => {
                setTestimonialC(testimonial)
            })
            .catch(error => {
                console.error(error);
                toast({
                    title: 'Failed!',
                    description: "There was a problem starring this feedback!",
                    status: 'failure',
                    duration: 9000,
                    position: 'top',
                    isClosable: true,
                });
            })
    }

    const deleteT = () => {
        remove(id)
        onClose();
    }

    return (
        <div className="card">
            <div className="author">
                <div className="author-image">
                    <img className="avatar" src={'http://www.gravatar.com/avatar/?d=mp'} height={24} alt={'logo'}/>
                </div>
                <div className="author-name">
                    <h3 className="h3-title author">{testimonialC.author}</h3>
                    <h4 className="h4-subtitle author-role">{testimonialC.author_role}</h4>
                </div>
            </div>
            <div className="title">
                <div className="h2-title">{testimonialC.title}</div>
            </div>
            <div className="testimonial">
                <span className="testimonial-body">{testimonialC.body}</span>
            </div>
            {controls === true &&
                <div className='card-controls'>
                    {!testimonialC.starred &&
                        <Button
                            className='card-control'  colorScheme='teal' variant='outline' size={'sm'}
                            onClick={e => starUnstar(true)}
                        >
                            Star
                        </Button>
                    }
                    {testimonialC.starred &&
                        <Button
                            className='card-control'  colorScheme='teal' variant='outline' size={'sm'}
                            onClick={e => starUnstar(false)}
                        >
                            Unstar
                        </Button>
                    }
                    <Button onClick={onOpen} className='card-control' colorScheme='red' variant='outline' size={'sm'}>
                        Delete
                    </Button>
                </div>
            }
            <AlertDialog
                motionPreset='slideInBottom'
                leastDestructiveRef={cancelRef}
                onClose={onClose}
                isOpen={isOpen}
                isCentered
            >
            <AlertDialogOverlay />
                <AlertDialogContent>
                    <AlertDialogHeader>Discard Changes?</AlertDialogHeader>
                    <AlertDialogCloseButton />
                    <AlertDialogBody>
                        Are you sure you want to delete this feedback?
                    </AlertDialogBody>
                    <AlertDialogFooter>
                        <Button ref={cancelRef} onClick={onClose}>
                            No
                        </Button>
                        <Button colorScheme='red' ml={3} onClick={deleteT}>
                            Yes
                        </Button>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    )
}

export default TestimonialCard;