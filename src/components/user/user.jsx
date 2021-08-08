import { useContext, useEffect } from "react";
import { UserAccountContext } from "../../contexts/account";
import { useHistory } from "react-router-dom";
import { Col, Row } from "react-bootstrap";
// import * as backend from "../../services/index.main.mjs";
import AliceComponent from "./child-components/detail-user";

import "./index.css";
import DetailUserComponent from "./child-components/detail-user";

const UserComponent = () => {
    const history = useHistory();
    const { accountETH } = useContext(UserAccountContext);

    useEffect(() => {
        if (!accountETH) {
            history.push("/");
        }
    }, [accountETH]);

    console.log(
        "🚧  ~ file: user.jsx ~ line 6 ~ UserComponent ~ accountETH",
        accountETH
    );

    return (
        <div>
            <Row>
                <Col>User: {accountETH?.user}</Col>
                {/* <Col>Balance: {handleGetBalance(accountETH?.account)}</Col> */}
            </Row>
            <Row>
                <Col>Address: {accountETH?.account?.getAddress()}</Col>
            </Row>
            <DetailUserComponent accountETH={accountETH} />
        </div>
    );
};
export default UserComponent;
