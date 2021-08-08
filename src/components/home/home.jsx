import { loadStdlib } from "@reach-sh/stdlib";
import { Button, Col, Container, Row } from "react-bootstrap";
import { useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";
import { UserAccountContext } from "../../contexts/account";
const reach = loadStdlib(process.env);


const HomeComponent = () => {
    const history = useHistory();
    const { accountETH, setAccountETH } = useContext(UserAccountContext);

    const handleCreateAccount = async (type) => {
        // const startingBalance = reach.parseCurrency(10);
        const acc = await reach.newAccountFromSecret(type === "alice" ?
            "0869639d51195870a5c8ee63b6cc9b670991c2bd1899b879f24493e37873bc9e" :
            "a7e838eeb5e8868a7d1325089e16dd641c92f3622bba1ac64955c34a2b5ed234");
        if (type === "alice") {
            setAccountETH({
                user: "alice",
                account: acc
            })
        } else {
            setAccountETH({
                user: "bob",
                account: acc
            })
        }
    };

    useEffect(() => {
        console.log("!!!");
        if (!accountETH) return;
        history.push("/user")
    }, [accountETH, accountETH?.account])

    return (
        <Container>
            <Row>
                <Col>
                    <Col>You are Alice</Col>
                    <Col>
                        <Button onClick={() => handleCreateAccount("alice")}>Choose</Button>
                    </Col>
                </Col>
                {/* ---- */}
                <Col>
                    <Col>You are Bob</Col>
                    <Col>
                        <Button onClick={() => handleCreateAccount("bob")} variant="warning">Choose</Button>
                    </Col>
                </Col>
            </Row>
        </Container>
    );
};
export default HomeComponent;
