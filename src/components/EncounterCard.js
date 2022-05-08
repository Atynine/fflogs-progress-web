import {Button, Col, Card, CardText, CardTitle, CardSubtitle, CardBody} from 'reactstrap';
import {
  useParams,
  useNavigate
} from "react-router-dom";
import React from 'react';

export default function EncounterCard(props) {
      let navigate = useNavigate();

      return (
            <Col xs="6">
                <div className="encounterContainer">
                <Card body color="dark" inverse>
            <CardBody className='encounterCard'>
            <CardTitle tag="h5">
                {props.name}
            </CardTitle>
            <Button className='encounterButton' onClick={() => {
                navigate("/guild/" + props.guildID + "/encounter/" + props.id)
            }}>
                View Details
            </Button>
            </CardBody>
            </Card>
            
            </div>
        </Col>
    );
}