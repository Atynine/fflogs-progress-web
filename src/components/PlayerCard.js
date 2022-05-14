import { Button, Col, Card, CardText, CardTitle, CardSubtitle, CardBody } from 'reactstrap';
import {
  useParams,
  useNavigate
} from "react-router-dom";
import React from 'react';

export default function PlayerCard(props) {
  let navigate = useNavigate();

  return (
    <Col sm="3" className='playerCard'>
      <div>
        <Button className='btn-text'
          block
          color="success"
          size="lg"
          onClick={() => {
            var win = window.open("https://www.fflogs.com/character/id/" + props.id, '_blank');
            win.focus();
          }}
        >
          {props.name}
        </Button>
      </div>
    </Col>
  );
}