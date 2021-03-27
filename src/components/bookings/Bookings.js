import React from 'react';
import { useContext } from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { UserContext } from '../../App';

const Bookings = () => {
    const [loggedInUser, setLoggedInUser] = useContext(UserContext)
    const [bookings, setBookings] = useState([])
   
    useEffect(()=>{
        fetch(`http://localhost:3001/bookings?email=${loggedInUser.email}`,{
            method:"GET",
            headers:{"Accpet" : "application/json",
            Authorization: `Bearer ${sessionStorage.getItem('userToken')}`
            }
        })
        .then(res => res.json())
        .then(data => setBookings(data))
    },[loggedInUser.email])
    return (
        <div>
            <h2>You have {bookings.length} bookings</h2>
            {
                bookings.map(book => <li key={book._id}>{book.name} --  {book.email} {(new Date(book.checkInDate).toDateString('dd/MM/yyyy'))}</li>)
            }
        </div>
    );
};

export default Bookings;