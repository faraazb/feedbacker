import React, { useState } from "react";
import { Select } from '@chakra-ui/react'


const people = [
    {id: 1, name: 'Rohan'},
    {id: 2, name: 'Mohan'},
    {id: 3, name: 'Sohan'},
    {id: 4, name: 'Johan'},
]

const ProductSelect = (props) => {
    const { items, setSelect } = props;

    let itemsList;
    if (items.length > 0) {
        itemsList = items.map((item, i) =>
            <option key={i} value={item._id}>{item.name}</option>
        )
    }

    return (
        <div className="product-select">
            <Select onChange={e => setSelect(e.target.value)}>
                {itemsList}
            </Select>
        </div>
    )
}

export default ProductSelect;