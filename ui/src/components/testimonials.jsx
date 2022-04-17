import { useEffect, useState } from 'react';
import {deleteTestimonial, getTestimonials} from "../api";
import TestimonialCard from "./testimonial-card";
import { useParams } from "react-router-dom";
import './testimonial-wall.css';
import {toast} from "@chakra-ui/react";

const Testimonials = (props) => {
    const {productId, controls, starred} = props;
    const [testimonials, setTestimonials] = useState([]);

    useEffect(() => {
        getTestimonials(productId)
            .then((data) => {
                if (starred === true) {
                    setTestimonials(data.filter(t => t.starred));
                }
                else {
                    setTestimonials(data);
                }
            });
      }, [productId, starred]);

    const deleteOne = (id) => {
        deleteTestimonial(id)
            .then(response => {
                if (response.success) {
                    toast({
                        title: 'Deleted!',
                        description: "Feedback was deleted!",
                        status: 'success',
                        duration: 9000,
                        position: 'top',
                        isClosable: true,
                    });
                }
                else {
                    toast({
                        title: 'Failed!',
                        description: "There was a problem deleting this feedback!",
                        status: 'failure',
                        duration: 9000,
                        position: 'top',
                        isClosable: true,
                    });
                }
            })
        setTestimonials(testimonials.filter(t => t._id !== id))
    }

    return (
        <div className="wall">
            {testimonials && testimonials.map((testimonial, i) => 
                <TestimonialCard controls={controls} testimonial={testimonial} remove={deleteOne} key={i}/>
            )}
        </div>
    )
}

export default Testimonials;