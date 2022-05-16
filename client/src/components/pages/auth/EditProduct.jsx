import { Button, Col, Container, Form, FormControl, InputGroup, Row } from "react-bootstrap";
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios"
import AppConfig from "../../../../src/appConfig"
import FarmerNavbar from "../../common/nav/FarmerNavbar";

//Farmer edits the product - for any field for the product that is NOT changed (name, price, etc.), it will remain as is
const EditProduct = () => {
    const userID = localStorage.getItem(AppConfig.USER_ID_KEY)
    const [img, setImage] = useState(null)
    const navigate = useNavigate();
    const [isLoading, setLoading] = useState(true);
    const location = useLocation();
    const productId = location.state;
    const [imageUntouched, setImageUntouched] = useState(true);
    const [data, setData] = useState({
        name: "",
        price: 0.0,
        description: "",
        image: ""
    });

    // This method will handle any changes the user makes on the fields for the product
    function handle(e) {
        const newdata = { ...data }
        newdata[e.target.id] = e.target.value
        setData(newdata)
    }

    // This will first get all the relevent information for this particular product
    useEffect(() => {
        axios.get(`${AppConfig.BASE_URL}/product/getProductById/${productId}`).then(response => {
            setData({
                name: response.data.product[0].product_name,
                price: response.data.product[0].product_price,
                description: response.data.product[0].product_description,
                image: response.data.product[0].product_image
            });
            setLoading(false);
        }).catch(err => {
            if (err.response.status === 404) {
                setData({ products: [] })
                setLoading(false)
            }
        });
    }, []);

    // This method will submit the field information to the backend; the original information and the modified fields will be sent back as one.
    function submit(e) {
        e.preventDefault();
        const reader = new FileReader();
        if (imageUntouched) {
            axios.put(`${AppConfig.BASE_URL}/product/updateProduct/${productId}`, {
                user_id: userID,
                product_name: data.name,
                product_price: data.price,
                product_description: data.description,
                product_image: data.image
            }).then(res => {
                navigate('/farmer/dashboard')
            })
        }
        else {
            reader.onloadend = function () {
                axios.put(`${AppConfig.BASE_URL}/product/updateProduct/${productId}`, {
                    user_id: userID,
                    product_name: data.name,
                    product_price: data.price,
                    product_description: data.description,
                    product_image: reader.result
                }).then(res => {
                    navigate('/farmer/dashboard')
                })
            }
            console.log(img)
            reader.readAsDataURL(img);
        }
    }

    // If the edit form is still loading the product info, render this instead
    if (isLoading) {
        return (
            <div className="EditProduct">
                <FarmerNavbar />
                <Container>
                    <br></br>
                    <Row classname="d-flex justify-content-between mb-3">
                        <Col xs="auto">
                            <h2>Edit this product</h2>
                        </Col>
                        <Col></Col>
                    </Row>

                    <br></br>
                    <Form onSubmit={(e) => submit(e)}>
                        <Row>
                            <Form.Group controlId="formAddProductName" onChange={(e) => handle(e)}>
                                <InputGroup >
                                    <InputGroup.Text id="product_name" name="product_name">Product Name: </InputGroup.Text>
                                    <FormControl
                                        placeholder=""
                                        aria-label=""
                                        aria-describedby="basic-addon1"
                                    />
                                </InputGroup>
                            </Form.Group>
                        </Row>
                        <Row className="mt-4">
                            <Col>
                                <Form.Group controlId="formAddProductPrice" onChange={(e) => handle(e)}>
                                    <InputGroup>
                                        <InputGroup.Text id="basic-addon1">$: </InputGroup.Text>
                                        <FormControl
                                            placeholder="Price (CAD):"
                                            aria-label="Price (CAD):"
                                            aria-describedby="basic-addon1"
                                        />
                                    </InputGroup>
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group controlId="formAddProductPricePer">
                                    <InputGroup >
                                        <InputGroup.Text id="basic-addon1">Per: </InputGroup.Text>
                                        <FormControl
                                            placeholder=""
                                            aria-label=""
                                            aria-describedby="basic-addon1"
                                        />
                                    </InputGroup>
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row className="mt-4">
                            <Form.Group controlId="formAddProductCategory">
                                <InputGroup >
                                    <InputGroup.Text id="basic-addon1">Category: </InputGroup.Text>
                                    <FormControl
                                        placeholder="Example: Vegetables, fruits, etc."
                                        aria-label="Example: Vegetables, fruits, etc."
                                        aria-describedby="basic-addon1"
                                    />
                                </InputGroup>
                            </Form.Group>
                        </Row>
                        <Row className="mt-4">
                            <Form.Group controlId="formAddProductDescription" onChange={(e) => handle(e)}>
                                <InputGroup>
                                    <InputGroup.Text>Product Description: </InputGroup.Text>
                                    <FormControl as="textarea" aria-label="With textarea" />
                                </InputGroup>
                            </Form.Group>
                        </Row>
                        <Row className="justify-content-md-center mt-3">
                            <Col xs lg="auto">
                                <Form.Group controlId="formFile" className="mb-3">
                                    <Form.Label>Upload Product Image</Form.Label>
                                    <Form.Control type="file" onChange={(e) => setImage(e.target.files[0])} />
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row className="justify-content-md-center">
                            <Col xs lg="auto">
                                <Button href="/farmer/dashboard" variant="outline-secondary" type="submit">
                                    Cancel
                                </Button>
                            </Col>
                            <Col xs lg="auto">
                                <Button variant="success" type="submit">
                                    Submit
                                </Button>
                            </Col>
                        </Row>
                    </Form>
                </Container>
            </div>
        )
    }

    // If the loading of product info is done, return the form with the original product info
    if (!isLoading) {
        return (
            <div className="EditProduct">
                <FarmerNavbar />
                <Container>
                    <br></br>
                    <Row classname="d-flex justify-content-between mb-3">
                        <Col xs="auto">
                            <h2>Edit this product</h2>
                        </Col>
                        <Col></Col>
                    </Row>
                    <br></br>
                    <Form onSubmit={(e) => submit(e)}>
                        <Row>
                            <Form.Group controlId="name" onChange={(e) => handle(e)}>
                                <InputGroup >
                                    <InputGroup.Text id="product_name" name="product_name">Product Name: </InputGroup.Text>
                                    <FormControl
                                        placeholder={data.name}
                                        aria-label=""
                                        aria-describedby="basic-addon1"
                                    />
                                </InputGroup>
                            </Form.Group>
                        </Row>
                        <Row className="mt-4">
                            <Col>
                                <Form.Group controlId="price" onChange={(e) => handle(e)}>
                                    <InputGroup>
                                        <InputGroup.Text id="basic-addon1">$: </InputGroup.Text>
                                        <FormControl
                                            placeholder={data.price}
                                            aria-label="Price (CAD):"
                                            aria-describedby="basic-addon1"
                                        />
                                    </InputGroup>
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group controlId="formAddProductPricePer">
                                    <InputGroup >
                                        <InputGroup.Text id="basic-addon1">Per: </InputGroup.Text>
                                        <FormControl
                                            placeholder=""
                                            aria-label=""
                                            aria-describedby="basic-addon1"
                                        />
                                    </InputGroup>
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row className="mt-4">
                            <Form.Group controlId="formAddProductCategory">
                                <InputGroup >
                                    <InputGroup.Text id="basic-addon1">Category: </InputGroup.Text>
                                    <FormControl
                                        placeholder="Example: Vegetables, fruits, etc."
                                        aria-label="Example: Vegetables, fruits, etc."
                                        aria-describedby="basic-addon1"
                                    />
                                </InputGroup>
                            </Form.Group>
                        </Row>
                        <Row className="mt-4">
                            <Form.Group controlId="description" onChange={(e) => handle(e)}>
                                <InputGroup>
                                    <InputGroup.Text>Product Description: </InputGroup.Text>
                                    <FormControl as="textarea" aria-label="With textarea" placeholder={data.description} />
                                </InputGroup>
                            </Form.Group>
                        </Row>
                        <Row className="justify-content-md-center mt-3">
                            <Col xs lg="auto">
                                <Form.Group controlId="image" className="mb-3">
                                    <Form.Label>Upload Product Image</Form.Label>
                                    <Form.Control type="file" onChange={(e) => { setImage(e.target.files[0]); setImageUntouched(false) }} />
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row className="justify-content-md-center">
                            <Col xs lg="auto">
                                <Button href="/farmer/dashboard" variant="outline-secondary" type="submit">
                                    Cancel
                                </Button>
                            </Col>
                            <Col xs lg="auto">
                                <Button variant="success" type="submit">
                                    Submit
                                </Button>
                            </Col>
                        </Row>
                    </Form>
                </Container>
            </div>
        )
    }
}
export default EditProduct;