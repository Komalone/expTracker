import { Button, Form , Table} from 'react-bootstrap';
import './DailyExp.css';
import {
     useEffect,
     useRef, useState} from 'react';
import axios from 'axios';
import { useDispatch} from 'react-redux'
import { expAction } from '../../store/expense-slice'

const DailyExpense=()=>{
    
    const amountRef=useRef();
    const descriptionRef=useRef();
    const categoryRef= useRef();
    const [getExp, setGetExp]=useState([])
    const [render,setRender]=useState(true)

    const dispatch=useDispatch();


    let url="https://expensetracker-3cbe3-default-rtdb.firebaseio.com/"
    const LoginEmail= localStorage.getItem('email').replace(/[@.]/g, "")
 

    const formSubmit=(e)=>{
        e.preventDefault();

        const exp={
            
            amount: amountRef.current.value,
            descp: descriptionRef.current.value,
            cate: categoryRef.current.value
        };

        axios.post(`${url}${LoginEmail}.json`, exp)
        .then((res)=>{
            exp.id=res.data.name;
            console.log([...getExp,exp]);
            setGetExp([...getExp,exp]);
        })
        .catch((err)=>{
            console.log(err);
        })
        
        amountRef.current.value="";
        descriptionRef.current.value="";
        categoryRef.current.value="";
    };

    //display data one by one
    useEffect(() =>{  
        axios.get(`${url}${LoginEmail}.json`)
        .then((res)=>{
            if(res.data){
                const items=[]
                for(let i in res.data){
                    items.push({id: i, ...res.data[i]});
                }
                console.log(items)
               setGetExp(items);
               dispatch(expAction.addItemHandler(items));
            }
        })
    },[render]);

    let totalAmount=0
    
    Object.keys(getExp).forEach((key)=>{
        totalAmount= totalAmount + (+getExp[key].amount);
    })
    if(totalAmount > 10000){
        dispatch(expAction.premiun())
    }else{
        dispatch(expAction.nonPremium());
    }

    const delExpense=(key)=>{
        console.log(key);
        
        axios.delete(`${url}${LoginEmail}/${key}.json`)
        .then((res)=>{
            console.log("deleted expense");
            setRender((prev)=> !prev)
            
        })
        .catch((error)=>{
            console.log(error);
        })
    }
    const editExpense=(key)=>{
        console.log(key)
        axios.get(`${url}${LoginEmail}/${key}.json`)
        .then((res)=>{
           // console.log(res);
            amountRef.current.value = res.data.amount;
            descriptionRef.current.value= res.data.descp;
            categoryRef.current.value= res.data.cate; 
        })
        .catch(err=> console.log(err));
        delExpense(key);
    };

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
            
        </tr></thead>
        <tbody>
            {Object.keys(getExp).map((key,index)=> (
                //console.log(getExp[key]),
                <tr key={getExp[key].id}>
                    <td>{index + 1}</td>
                    <td>{getExp[key].cate}</td>
                    <td>{getExp[key].descp}</td>
                    <td>{getExp[key].amount}</td>
                    <td><Button variant='danger' onClick={()=>delExpense(getExp[key].id)} >Delete</Button></td>
                    <td><Button variant='secondary' onClick={()=>editExpense(getExp[key].id)}>Edit</Button></td>
                </tr>
            ))}
        </tbody>
        </Table>
    </div>
    <h2> Total Amount = Rs {totalAmount}</h2>
    </>
   );
}

export default DailyExpense;