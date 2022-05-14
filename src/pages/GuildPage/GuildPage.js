import { Row, Container, Col } from 'reactstrap';
import {
  useParams,
  useNavigate
} from "react-router-dom";
import React from 'react';
import EncounterCard from '../../components/EncounterCard';
import PlayerCard from '../../components/PlayerCard';
import LoadingComponent from '../../components/Loading';

export default function GuildPage() {
  const [state, setState] = React.useState({
    loaded: false,
    retrievedData: false,
    reports: null,
    fights: null,
    fightCards: [],
    members: []
  });
  let params = useParams();
  let navigate = useNavigate();

  const noGuildFound = (
    <Container id='guildContainer'>
      <Row>
        <Col>
          No guild
        </Col>
      </Row>
    </Container>
  );

  const loadingInfo = (<LoadingComponent />);




  React.useEffect(() => {
    if (state.loaded == true) return;
    if (params.guildId == null || state.guildFound == false) return;
    fetch("http://18.220.108.74:8080/guild/" + params.guildId + "/recent")
      .then(res => res.json())
      .then((result) => {
        let fights = [];
        let playerCards = [];
        let playerIds = []
        result.forEach(report => {
          report.fights.forEach(fight => {
            fights.push(fight);
          });
          report.players.forEach(player => {
            if (!playerIds.includes(player.id)) {
              let props = {
                id: player.id,
                lodestoneID: player.lodestoneID,
                name: player.name,
                server: player.server.name
              }
              playerIds.push(player.id);
              playerCards.push(<PlayerCard {...props} />);
            }
          });
        });

        let fightCards = [];
        fights = fights.sort((a, b) => new Date(b.endTimestamp).valueOf() - new Date(a.endTimestamp).valueOf());
        let ids = [];
        fights.forEach(fight => {
          if (!ids.includes(fight.encounterID)) {

            ids.push(fight.encounterID);
            let props = {
              id: fight.encounterID,
              guildID: params.guildId,
              name: fight.name
            }
            fightCards.push(<EncounterCard {...props} />);
          }
        });

        setState({
          loaded: true,
          reports: result,
          fightCards: fightCards,
          playerCards: playerCards
        });
      }).catch(e => {
        setState({
          loaded: true,
          reports: null
        });
      });
  }, [state]
  );

  if (params.guildId == null) return noGuildFound;
  if (!state.loaded) return loadingInfo;

  return (
    <div>
      <Container>
        <Row>
          {state.playerCards}
        </Row>
        <Row>
          {state.fightCards}
        </Row>
      </Container>
    </div>
  );
}