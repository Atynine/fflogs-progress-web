import {Nav, Navbar, NavbarBrand, NavItem, Collapse, NavbarToggler, NavbarText, Input, Button} from 'reactstrap';
import {
  useParams,
  useNavigate,
  useLocation,
} from "react-router-dom";
import React from 'react';

export default function SiteNavbar() {
      const [state, setState] = React.useState({});
      let navigate = useNavigate();
        return (
            <div>
          <Navbar
            color="dark"
            dark
            expand="md"
          >
            <NavbarBrand href="/">
              fflogs-progress
            </NavbarBrand>
            <Collapse navbar>
              <Nav
                className="me-auto"
                navbar
              >
              </Nav>
              <NavbarText>
                <Input
                  type="search"
                  placeholder="Guild ID"
                  onChange={(e) => {
                    setState({
                      guild: e.target.value
                    });
                  }}
                  onKeyUp={(e) => {
                    if(e.key == "Enter"){
                      navigate("/guild");
                      return;
                    }
              
                    setState({
                      guild: e.target.value
                    });
                  }}
                />
              </NavbarText>
              <Button color="primary" className="guildSearch" onClick={() => 
              {
                if(state.guild == null || !state.guild.match(/^\d+$/)) return;
                navigate("/guild/" + state.guild)
              }}>
                Search
              </Button>
            </Collapse>/
          </Navbar>
        </div>
        );
}