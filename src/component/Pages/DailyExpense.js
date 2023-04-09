import { Button, Form , Table} from 'react-bootstrap';
import './DailyExp.css';
import {useEffect, useRef, useState} from 'react';
import axios from 'axios';

const DailyExpense=()=>{
    const [expenses, setExpense]= useState([]);
    const amountRef=useRef();
    const descriptionRef=useRef();
    const categoryRef= useRef();
    const [getExp, setGetExp]=useState([])

    let url="https://expensetracker-3cbe3-default-rtdb.firebaseio.com/"
    const LoginEmail= localStorage.getItem('email').replace(/[@.]/g, "");

    const formSubmit=(e)=>{
        e.preventDefault();

        const exp={
            amount: amountRef.current.value,
            descp: descriptionRef.current.value,
            cate: categoryRef.current.value
        };

        axios.post(`${url}${LoginEmail}.json`, exp)
        .then((res)=>{
            console.log(res);
            setExpense([...expenses, exp])
        })
        .catch((err)=>{
            console.log(err);
        })

        amountRef.current.value="";
        descriptionRef.current.value="";
        categoryRef.current.value="";
    };

    useEffect(() =>{
        axios.get(`${url}${LoginEmail}.json`)
        .then((res)=>{
            if(res.data){
                setGetExp(res.data);
            }
        })
    },[getExp,url,LoginEmail])

   return (
    <>
    <fieldset>
    <h4> Daily Expense Tracker</h4>
    <Form className='container' onSubmit={formSubmit}>
        <Form.Group controlId='amount' className='amount'>
            <Form.Label>Amount :</Form.Label>
            <Form.Control type='number' placeholder='Amount in Rs' ref={amountRef} required />
        </Form.Group>
        <Form.Group className='descp' controlId='description'>
            <Form.Label>Short Description:</Form.Label>
            <Form.Control type='text' ref={descriptionRef} required/>
        </Form.Group>
        <Form.Group className='cato' controlId='category'>
            <Form.Label>Choose Category:</Form.Label>
            <Form.Control as='select' name='category' ref={categoryRef} required>
                <option value="">-- Select --</option>
                <option >Food</option>
                <option >Petrol</option>
                <option >Shopping</option>
                <option >Rent</option>

            </Form.Control>
        </Form.Group>
        <div>
            <Button variant='success' type='submit'> Add Expense</Button>
            <Button variant='secondary'>Edit Expense</Button>
        </div>
    </Form>
    </fieldset>
    <div className="table">
        <h3>Expense List</h3>
        <Table striped bordered hover>
        <thead><tr>
            <th>#</th>
            <th>Category</th>
            <th>Description</th>
            <th>Amount</th>
            <th>Delete</th>
            <th>Edit</th>
        </tr></thead>
        <tbody>
            {Object.keys(getExp).map((key,index)=> (
                <tr key={key}>
                    <td>{index + 1}</td>
                    <td>{getExp[key].cate}</td>
                    <td>{getExp[key].descp}</td>
                    <td>{getExp[key].amount}</td>
                </tr>
            ))}
        </tbody>
        </Table>
    </div>
    </>
   );
}

export default DailyExpense;