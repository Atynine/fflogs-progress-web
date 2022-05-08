import {Row, Container, Col} from 'reactstrap';
import {
  useParams,
  useNavigate
} from "react-router-dom";
import React from 'react';
import EncounterCard from '../../components/EncounterCard';
import PlayerCard from '../../components/PlayerCard';
import LoadingComponent from '../../components/Loading';

export default function EncounterPage() {
      const [state, setState] = React.useState({
        loaded: false
      });
      let params = useParams();

      const loadingInfo = (<LoadingComponent></LoadingComponent>);


      React.useEffect(() => {
          if(state.loaded == true) return;
          if(params.guildId == null || state.guildFound == false) return;
            fetch("http://localhost:8080/guild/" + params.guildId + "/recent")
            .then(res => res.json())
            .then((result) => {
              console.log(result);
            }).catch(e => {
              setState({
                loaded: true
              });
            });
        }, [state]
      );

      if(!state.loaded) return loadingInfo;

      return (
        <div>
            <Container>
                <Row>
                  TEMP
                </Row>
            </Container>
        </div>
    );
}