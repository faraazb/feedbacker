import {useParams} from "react-router-dom";
import Testimonials from "./testimonials";

const TestimonialEmbed = () => {
    let params = useParams();

    return (
        <Testimonials productId={params.productId} controls={false} starred={true}/>
    )
}

export default TestimonialEmbed;
