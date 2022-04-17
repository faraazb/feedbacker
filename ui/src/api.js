import axios from 'axios';

const baseUrl = 'http://127.0.0.1:5000/'

const axiosc = axios.create({
    'baseURL': baseUrl
})


function getTestimonials(productId) {
    return axiosc.get(`products/${productId}/testimonials`)
        .then(response => {
            // console.log(response.data)
            return response.data;
        })
        .catch(error => {
            console.error(error);
        });
}

function sendTestimonial(productId, testimonial) {
    return axiosc.post(`products/${productId}/testimonials`,
        {
            author: testimonial.author,
            authorImg: testimonial.authorImg,
            authorRole: testimonial.authorRole,
            title: testimonial.title,
            body: testimonial.body,
            starred: false
        })
        .then(response => {
            return response.data;
        })
        .catch(error => {
            return error;
        });
}

function getProduct(productId) {
    return axiosc.get(`products/${productId}`)
        .then(response => {
            return response.data;
        })
        .catch(error => {
            return error;
        })
}

function getProducts(userId) {
    return axiosc.get(`users/${userId}/products`)
        .then(response => {
            return response.data;
        })
        .catch(error => {
            console.error(error);
        })
}

function starTestimonial(testimonialId, starred) {
    return axiosc.patch(`testimonials/${testimonialId}`,
        {
            starred: starred
        })
        .then(response => {
            return response.data;
        })
        .catch(error => {
            console.error(error);
        })
}

function deleteTestimonial(testimonialId) {
    return axiosc.delete(`testimonials/${testimonialId}`)
        .then(response => {
            return response.data
        })
        .catch(error => {
            console.log(error);
        })
}


function createProduct(product) {
    console.log('HELOOOOOOOOOOO')
    return axiosc.post('products',
        {
            name: product.name,
            user_id: product.owner
        })
        .then(response => {
            console.log('HELOOOOOOOOOOO')
            return response.data;
        })
        .catch(error => {
            console.error(error);
        })
}


export { getTestimonials, sendTestimonial, getProduct, getProducts, starTestimonial, deleteTestimonial, createProduct };