import ProductCard from '../components/ProductCard';
import { useEffect, useState, useContext } from 'react';
import UserView from '../components/UserView';
import AdminView from '../components/AdminView';
import UserContext from '../UserContext';

export default function Products(){

	const {user} = useContext(UserContext)

	const [products, setProducts] = useState([]);

	const fetchData = () => {
		let fetchUrl = user.isAdmin === true ? `https://gaminghub-2.onrender.com/products/allproducts` : `https://gaminghub-2.onrender.com/products/allactiveproducts`
		fetch(fetchUrl,{
			headers: {
				'Content-Type': 'application/json', 
				Authorization: `Bearer ${localStorage.getItem("token")}`
			}
		})
		.then(res => res.json())
		.then(data => {
			if (typeof data.message !== "string") {
				setProducts(data)
			} else {
				setProducts([])
			}
		})
	}

	useEffect(() => {
	    fetchData();
	}, []);

	return(
		<>
			{
				(user.isAdmin === true) ?
					<AdminView productData={products} fetchData={fetchData}/>
				:
					<UserView productData={products}/>
			}
		</>
	)
}