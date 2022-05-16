import { Button, Col, Container, Form, FormControl, InputGroup, Row } from "react-bootstrap";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios"
import AppConfig from "../../../../src/appConfig"
import FarmerNavbar from "../../common/nav/FarmerNavbar";

//Farmer is adding the product
const AddProduct = () => {
    const userID = localStorage.getItem(AppConfig.USER_ID_KEY)
    let url = `${AppConfig.BASE_URL}/product/addProduct`;
    const [img, setImage] = useState(null)
    const navigate = useNavigate();

    //This is to store the product data temporarily from the fields, to be passed onto our backend
    const [data, setData] = useState({
        formAddProductName: "",
        formAddProductPrice: 0.0,
        formAddProductDescription: "",
        productImage: ""
    })

    //This method will handle any changes in the form and store them temporarily
    function handle(e) {
        const newdata = { ...data }
        newdata[e.target.id] = e.target.value
        setData(newdata)
        console.log(newdata)
    }

    // This method will submit the temporarily stored field informations about the product to our backend
    function submit(e) {
        e.preventDefault();
        const reader = new FileReader();
        reader.onloadend = function () {
            console.log("submitted!")
            axios.post(url, {
                user_id: userID,
                product_name: data.formAddProductName,
                product_price: data.formAddProductPrice,
                product_description: data.formAddProductDescription,
                product_image: reader.result
            }).then(res => {
                navigate('/farmer/dashboard')
            })
        }
        console.log(img)
        reader.readAsDataURL(img);
    }

    
    return (
        <div className="AddProduct">
            <FarmerNavbar />
            <Container>
                <br></br>
                <Row classname="d-flex justify-content-between mb-3">
                    <Col xs="auto">
                        <h2>Add a new product</h2>
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
export default AddProduct;