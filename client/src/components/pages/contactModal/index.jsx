import {Button, FloatingLabel, Form, Modal} from "react-bootstrap";
import {useForm} from "react-hook-form";

const ContactModal = (prop) => {
  const { register, formState: { errors }, handleSubmit} = useForm();
  const onSubmit = data => {
    console.log(data);
    prop.onClose();
  }

  return (
    <Modal show={prop.show}>
      <Modal.Header>
        <Modal.Title>Contact Us</Modal.Title>
      </Modal.Header>
      <Form onSubmit={handleSubmit(onSubmit)} >
        <Modal.Body>
          <FloatingLabel label="Name">
            <Form.Control
              {...register("name", { required: true })}
              type="text"
              placeholder="Name"
              isInvalid={errors.name?.type === 'required'}
            />
            <Form.Control.Feedback type="invalid">Name is required</Form.Control.Feedback>
          </FloatingLabel>
          <FloatingLabel className="mt-4" label="Email Address">
            <Form.Control
              {...register("email", { required: true })}
              type="email"
              placeholder="Email Address"
              isInvalid={errors.email?.type === 'required'}
            />
            <Form.Control.Feedback type="invalid">Email is required</Form.Control.Feedback>
          </FloatingLabel>
          <FloatingLabel className="mt-4" label="Message">
            <Form.Control
              {...register("message", { required: true })}
              as="textarea"
              style={{ height: '135px' }}
              placeholder="Message"
              isInvalid={errors.message?.type === 'required'}
            />
            <Form.Control.Feedback type="invalid">Email is required</Form.Control.Feedback>
          </FloatingLabel>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={prop.onClose} variant="outline-secondary">Cancel</Button>
          <Button type="submit" variant="success">Send</Button>
        </Modal.Footer>
      </Form>

    </Modal>
  )
}

export default ContactModal;