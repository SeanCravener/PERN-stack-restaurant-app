import React from 'react'
import AddRestaurant from '../components/AddRestaurant'
import Header from '../components/Header'
import RestaurantList from '../components/RestaurantList'

const Home = () => {
  return (
    <div className="container">
    <div>
        <Header />
        <AddRestaurant />
        <RestaurantList />
    </div>
    </div>
  )
}

export default Home