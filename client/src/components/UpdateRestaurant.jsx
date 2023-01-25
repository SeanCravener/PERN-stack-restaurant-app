import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import RestaurantFinder from '../apis/RestaurantFinder'

const UpdateRestaurant = (props) => {
    const {id} = useParams();
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [location, setLocation] = useState('');
    const [priceRange, setPriceRange] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await RestaurantFinder.get(`/${id}`)
                setName(response.data.data.restaurants.name);
                setLocation(response.data.data.restaurants.location);
                setPriceRange(response.data.data.restaurants.price_range)
            } catch (err) {
                console.log(err)
            }
        }

        fetchData()
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            const updatedRestaurant = await RestaurantFinder.put(`/${id}`, {
                name,
                location,
                price_range: priceRange
            });
            navigate('/')
        } catch (err) {
            console.log(err)
        }
    }

  return (
    <div>
        <form action="">
            <div className="form-group">
                <label htmlFor="name">
                    Name
                </label>
                <input value={name} id='name' onChange={e => setName(e.target.value)} type="text" className="form-control" />
            </div>
            <div className="form-group">
                <label htmlFor="location">
                    location
                </label>
                <input value={location} id='location' onChange={e => setLocation(e.target.value)} type="text" className="form-control" />
            </div>
            <div className="form-group">
                <label htmlFor="price_range">
                    Price Range
                </label>
                <input value={priceRange} id='price_range' onChange={e => setPriceRange(e.target.value)} type="number" className="form-control" />
            </div>
            <button type='submit' onClick={handleSubmit} className='btn btn-primary'>Submit</button>
        </form>
    </div>
  )
}

export default UpdateRestaurant