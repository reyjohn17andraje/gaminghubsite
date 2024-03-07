import React from 'react';
import Button from '@mui/material/Button';
import Swal from 'sweetalert2';

export default function ArchiveProduct({ product, isAvailable, fetchData }) {

    const archiveToggle = (productId) => {
        fetch(`https://gaminghub-2.onrender.com/products/${productId}/archiveproduct`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })
            .then(res => res.json())
            .then(data => {
                if (data.message === 'Product archived successfully') {
                    Swal.fire({
                        title: 'Success',
                        icon: 'success',
                        text: 'Product successfully disabled'
                    })
                    fetchData();
                } else {
                    Swal.fire({
                        title: 'Something Went Wrong',
                        icon: 'Error',
                        text: 'Please Try again'
                    })
                    fetchData();
                }
            })
    }

    const activateToggle = (productId) => {
        fetch(`https://gaminghub-2.onrender.com/products/${productId}/activateproduct`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })
            .then(res => res.json())
            .then(data => {
                if (data.message === "Product activated successfully") {
                    Swal.fire({
                        title: 'Success',
                        icon: 'success',
                        text: 'Product successfully enabled'
                    })
                    fetchData();
                } else {
                    Swal.fire({
                        title: 'Something Went Wrong',
                        icon: 'Error',
                        text: 'Please Try again'
                    })
                    fetchData();
                }
            })
    }

    return (
        <>
            {isAvailable ?
                <Button variant="contained" color="error" size="small" onClick={() => archiveToggle(product)}>Archive</Button>
                :
                <Button variant="contained" color="success" size="small" onClick={() => activateToggle(product)}>Activate</Button>
            }
        </>
    )
}
