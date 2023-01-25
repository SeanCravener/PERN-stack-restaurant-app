import React from 'react'
import { useEffect } from 'react'
import { useContext } from 'react'
import { useParams } from 'react-router-dom'
import RestaurantFinder from '../apis/RestaurantFinder'
import AddReview from '../components/AddReview'
import Reviews from '../components/Reviews'
import StarRating from '../components/StarRating'
import { RestaurantsContext } from '../context/RestaurantsContext'

const RestaurantDetailPage = () => {
  const {id} = useParams()
  const {selectedRestaurant, setSelectedRestaurant} = useContext(RestaurantsContext)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await RestaurantFinder.get(`/${id}`)
        setSelectedRestaurant(response.data.data)
      } catch (err) {
        console.log(err)
      }
    }

    fetchData()
  }, [])

  return (
    <div>
      {selectedRestaurant && (
        <>
        <h1 className='text-center display-1'>{selectedRestaurant.restaurants.name}</h1>
        <div className="text-center">
          <StarRating rating={selectedRestaurant.restaurants.average_rating} />
          <span className="text-warning ml-1">
            {selectedRestaurant.restaurants.count ? `(${selectedRestaurant.restaurants.count})` : '(0)'}
          </span>
        </div>
        <div className="mt-3">
          <Reviews reviews={selectedRestaurant.reviews} />

        </div>
        <AddReview />
        </>
      )}
    </div>
  )
}

export default RestaurantDetailPage