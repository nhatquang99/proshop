import React from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {LinkContainer} from 'react-router-bootstrap'
import {Container, Navbar, Nav, NavDropdown} from 'react-bootstrap'
import { initializeUpdateUserProfile, initializeUserList, initializeUsrRegister, logout } from '../actions/userAction'
import { initializeOrderMyList } from '../actions/orderAction'
import { Route } from 'react-router-dom'
import SearchBox from './SearchBox'


const Header  = () => {
    const dispatch = useDispatch();

    const userLogin = useSelector(state => state.userLogin);
    const {userInfo} = userLogin

    const logoutHandler = () => {
        dispatch(initializeOrderMyList())
        dispatch(initializeUpdateUserProfile());
        dispatch(initializeUsrRegister());
        dispatch(initializeUserList())
        dispatch(logout())
    }

    return (
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
            <Container>
                <LinkContainer to='/'>
                    <Navbar.Brand>ProShop</Navbar.Brand>
                </LinkContainer>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Route render={({ history }) => <SearchBox history={history} />} />
                    <Nav className="mr-auto">
                        {/* <Nav.Link href="/">Home</Nav.Link>
                        <Nav.Link href="/">View Products</Nav.Link> */}
                    </Nav>
                    
                    <Nav>
                        <LinkContainer to='/cart'>
                            <Nav.Link><i className='fas fa-shopping-cart'/>Cart</Nav.Link>
                        </LinkContainer>
                        {userInfo && userInfo.isAdmin
                        ? 
                        (
                            <NavDropdown title='Admin' id='adminuser'>
                                <LinkContainer to={`/profile/${userInfo._id}`}>
                                    <NavDropdown.Item>Profile</NavDropdown.Item>
                                </LinkContainer>
                                <LinkContainer to={'/admin/users'}>
                                    <NavDropdown.Item>Users</NavDropdown.Item>
                                </LinkContainer>
                                <LinkContainer to={'/admin/products'}>
                                    <NavDropdown.Item>Products</NavDropdown.Item>
                                </LinkContainer>
                                <LinkContainer to={'/admin/orders'}>
                                    <NavDropdown.Item>Orders</NavDropdown.Item>
                                </LinkContainer>
                                <NavDropdown.Item onClick={logoutHandler}>
                                    Logout
                                </NavDropdown.Item>
                            </NavDropdown>
                        )
                        : userInfo 
                        ? 
                        (
                            <NavDropdown title={userInfo.name} id='username'>
                                <LinkContainer to={`/profile/${userInfo._id}`}>
                                    <NavDropdown.Item>Profile</NavDropdown.Item>
                                </LinkContainer>
                                <NavDropdown.Item onClick={logoutHandler}>
                                    Logout
                                </NavDropdown.Item>
                            </NavDropdown>  
                        )
                        :
                        (
                            <LinkContainer to='/login'>
                                <Nav.Link><i className='fas fa-user'/>Sign In</Nav.Link>
                             </LinkContainer>
                        ) 
                        }
                        
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default Header