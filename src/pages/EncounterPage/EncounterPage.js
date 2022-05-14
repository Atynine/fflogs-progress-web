import { Row, Container, Col, Table } from 'reactstrap';
import {
  useParams,
  useNavigate
} from "react-router-dom";
import React from 'react';
import EncounterCard from '../../components/EncounterCard';
import PlayerCard from '../../components/PlayerCard';
import LoadingComponent from '../../components/Loading';
import { Dot, Label, Legend, LineChart, Line, YAxis, XAxis, CartesianGrid, ResponsiveContainer, Tooltip } from 'recharts';


export default function EncounterPage() {
  const [state, setState] = React.useState({
    loaded: false,
    chartData: []
  });
  let params = useParams();
  const data = [{ name: 'Page A', uv: 400, pv: 2400, amt: 2400 }];
  const loadingInfo = (<LoadingComponent></LoadingComponent>);


  React.useEffect(() => {
    if (state.loaded == true) return;
    if (params.guildId == null || state.guildFound == false) return;
    fetch("http://18.220.108.74:8080/guild/" + params.guildId + "/encounter/" + params.encounterId)
      .then(res => res.json())
      .then((result) => {
        let pullSum = 1;
        let fightData = [];
        let fightRows = [];
        let minPercent = 101;
        result.forEach(fight => {
          fightData.push({
            name: pullSum,
            bossPercentage: fight.kill ? 0 : fight.bossPercentage,
            completeRaid: fight.completeRaid,
            kill: fight.kill,
            newBest: fight.bossPercentage < minPercent
          });

          fightRows.unshift((<tr key={pullSum}>
            <th scope="row">
              {pullSum}
            </th>
            <td>
              {new Date(fight.startTimestamp).toLocaleString()}
            </td>
            <td>
              {msToTime(fight.endTimestamp - fight.startTimestamp)}
            </td>
            <td>
              {fight.lastPhase}
            </td>
            <td>
              {fight.kill == true ? "Yes" : "No"}
            </td>
            <td>
              <a href={"https://www.fflogs.com/reports/" + fight.reportCode + "#fight=" + fight.id}>Link</a>
            </td>
          </tr>));

          if (fight.bossPercentage < minPercent) minPercent = fight.bossPercentage;
          pullSum++;
        });

        setState({
          loaded: true,
          fights: result,
          fightData: fightData,
          fightRows: fightRows
        });
      }).catch(e => {
        setState({
          loaded: true
        });
      });
  }, [state]
  );

  if (!state.loaded) return loadingInfo;
  return (
    <Container id="encounterContainer">
      <Row>
        <Col>
          <ResponsiveContainer width="100%" height={400} id="encounterChart">
            <LineChart data={state.fightData} margin={{ top: 5, right: 40, left: 5, bottom: 15 }}>
              <CartesianGrid stroke="#ccc" />
              <Line type="monotone" dataKey="bossPercentage" stroke="#24040a" name='Boss Health' dot={renderDot} />

              <XAxis type="number" dataKey="name" domain={['dataMin', 'dataMax']}>
                <Label value="Pull" offset={-5} position="insideBottom" />
              </XAxis>
              <YAxis>
              </YAxis>
              <Tooltip labelFormatter={formatPullLabel} formatter={formatPull} />
              <Legend verticalAlign="top" height={36} />
            </LineChart>
          </ResponsiveContainer>
        </Col>
      </Row>
      <Row id='encounterTable'>
        <Table
          dark
          hover
          responsive
          size="sm"
          striped
        >
          <thead>
            <tr>
              <th>
                Pull #
              </th>
              <th>
                Start Time
              </th>
              <th>
                Duration
              </th>
              <th>
                Last Phase
              </th>
              <th>
                Complete
              </th>
              <th>
                FFLogs
              </th>
            </tr>
          </thead>
          <tbody>
            {state.fightRows}
          </tbody>
        </Table>
      </Row>
    </Container>
  );
}

function formatPullLabel(value, name) {
  return "Pull " + value;
}

function formatPull(value, name, props) {
  if (name == "Boss Health") return value + "%";
  return value;
}
function renderDot(data) {
  if (data.payload.newBest) {
    return (<Dot key={data.key} r={4} cx={data.cx} cy={data.cy} stroke="red" strokeWidth={2} fill='#fff'></Dot>);
  }
}

function msToTime(s) {

  // Pad to 2 or 3 digits, default is 2
  function pad(n, z) {
    z = z || 2;
    return ('00' + n).slice(-z);
  }

  var ms = s % 1000;
  s = (s - ms) / 1000;
  var secs = s % 60;
  s = (s - secs) / 60;
  var mins = s;

  return pad(mins) + ':' + pad(secs) + '.' + pad(ms, 3);
}
