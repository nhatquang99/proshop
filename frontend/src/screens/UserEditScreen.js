import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { getUserDetails, initializeUpdateUser, updateUser } from "../actions/userAction";
import FormContainer from "../components/FormContainer";

const UserEditScreen = (props) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);

  const dispatch = useDispatch();
  const userDetails = useSelector((state) => state.userDetails);
  const { loading, error, user } = userDetails;

  const userUpdate = useSelector((state) => state.userUpdate);
  const { loading:loadingUpdate, error:errorUpdate, success:successUpdate } = userUpdate;

  useEffect(() => {
    if (successUpdate) {
        dispatch(initializeUpdateUser());
        props.history.push('/admin/users')
    } else {
        if (!user.name || user._id !== props.match.params.id) {
            dispatch(getUserDetails(props.match.params.id));
        } else {
            setName(user.name);
            setEmail(user.email);
            setIsAdmin(user.isAdmin);
        }
    }


  }, [dispatch, props.history, props.match, successUpdate, user]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(updateUser({_id: user._id, name, email, isAdmin }))
  };

  return (
      <>
        <Link to={`/admin/users`} className='btn btn-light my-3'>
            Go Back
        </Link>

        <FormContainer>
        <h1>User Edit</h1>
        {loadingUpdate && <Loader/>}
        {errorUpdate && (<Message variant='danger'>{errorUpdate}</Message>)}
        {loading ? <Loader/> : error ? <Message variant='danger'>{error}</Message> :
        (
            <Form onSubmit={submitHandler}>
                <Form.Group controlId="name">
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                        type="name"
                        placeholder="Enter name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    ></Form.Control>
                </Form.Group>
        
                <Form.Group controlId="email">
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control
                    type="email"
                    placeholder="Enter email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    ></Form.Control>
                </Form.Group>
        
                <Form.Group controlId="isAdmin">
                    <Form.Check
                    type="checkbox"
                    label="Is Admin"
                    checked={isAdmin}
                    onChange={(e) => setIsAdmin(e.target.checked)}
                    ></Form.Check>
                </Form.Group>
        
                <Button variant="primary" type="submit">
                    Update
                </Button>
            </Form>
        )
        }
      </FormContainer>
      </>
  );
};

export default UserEditScreen;
