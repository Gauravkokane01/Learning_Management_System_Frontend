import Form from 'react-bootstrap/Form';

function CheckInlineExample() {
  return (
    <Form>
     
        <div key={`inline-${'radio'}`} className="mb-3">
          <Form.Check
            inline
            label="1"
            name="group1"
            type={'radio'}
            id={`inline-${'radio'}-1`}
          />
          <Form.Check
            inline
            label="2"
            name="group1"
            type={'radio'}
            id={`inline-${'radio'}-2`}
          />
          <Form.Check
            inline
            disabled
            label="Other"
            type={'radio'}
            id={`inline-${'radio'}-3`}
          />
        </div>
   
    </Form>
  );
}

export default CheckInlineExample;