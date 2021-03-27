import React, { useContext, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { UserContext } from '../../App';
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import {
    MuiPickersUtilsProvider,
    KeyboardTimePicker,
    KeyboardDatePicker,
} from '@material-ui/pickers';
import { Button } from '@material-ui/core';
import Bookings from '../bookings/Bookings';

const Book = () => {
    const [loggedInUser, setLoggedInUser] = useContext(UserContext)
    const [selectedDate, setSelectedDate] = useState({
        checkInDate : new Date(),
        checkOutDate : new Date()
    });

    const handleCheckInDate = (date) => {
        const newDate = {...selectedDate}
        newDate.checkInDate = date;
        setSelectedDate(newDate);
    };
    const handleCheckOutDate = (date) => {
        const newDate = {...selectedDate}
        newDate.checkOutDate = date;
        setSelectedDate(newDate);
    };
    const handleBooking = ()=>{
        const userData = {...loggedInUser, ...selectedDate};
        fetch('http://localhost:3001/addbooking',{
            method:'POST',
            headers:{'Content-type': 'application/json'},
            body:JSON.stringify(userData)
        })
        .then(res => res.json())
        .then(result => {
            if (result) {
                
            }
        })
    }
    const { bedType } = useParams();
    return (
        <div style={{ textAlign: 'center' }}>
            <h1> Hello, {loggedInUser.name}! Let's book a {bedType} Room.</h1>
            <p>Want a <Link to="/home">different room?</Link> </p>


            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <Grid container justify="space-around">
                    <KeyboardDatePicker
                        margin="normal"
                        format="MM/dd/yyyy"
                        margin="normal"
                        id="date-picker-dialog"
                        label="Check In Date"
                        value={selectedDate.checkInDate}
                        onChange={handleCheckInDate}
                        KeyboardButtonProps={{
                            'aria-label': 'change date',
                        }}
                    />
                    <KeyboardDatePicker
                        margin="normal"
                        id="date-picker-dialog"
                        label="Check Out Date"
                        format="MM/dd/yyyy"
                        value={selectedDate.checkOutDate}
                        onChange={handleCheckOutDate}
                        KeyboardButtonProps={{
                            'aria-label': 'change date',
                        }}
                    />
                </Grid>
                <Button onClick={handleBooking} variant="contained" color="primary">
                    Book  Now
                </Button>
            </MuiPickersUtilsProvider>
            <Bookings></Bookings>
        </div>
    );
};

export default Book;