import { useState } from "react";
import { Button, Col, FloatingLabel, Form, Row } from "react-bootstrap";
import * as backend from "../../../services/index.main.mjs";
import { loadStdlib } from "@reach-sh/stdlib";
const reach = loadStdlib(process.env);

const DetailUserComponent = ({ accountETH }) => {
    const { account, user } = accountETH;
    // const { information, setInformation } = useState();
    const [contractAlice, setContractAlice] = useState();
    const [values, setValues] = useState({
        fee: 0,
        text: "",
    });


    const handleDeploy = async () => {
        if (account) {
            const contract = account.deploy(backend);
            const contractInfoString = JSON.stringify(
                await contract.getInfo(),
                null,
                2
            );

            if (contractInfoString) {
                setContractAlice({
                    contractString: contractInfoString,
                    contract,
                });
            }
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const request = reach.parseCurrency(values.fee);
        await backend.Alice(contractAlice.contract, { request, info: values.text });
        alert("Submit ok");
    };


    const handleSubmitGetInfo = async (event) => {
        event.preventDefault();
        const contractDetailAlice = JSON.parse(contractAlice.contractString);
        const contract = account.attach(backend, contractDetailAlice);
        const interact = {
            want: (request) => console.log("reach.formatCurrency(request, 4)", reach.formatCurrency(request, 4)),
            // setInformation({
            //     ...information,
            //     charge: reach.formatCurrency(request, 4),
            // }),
            got: (info) => console.log("info", info)
            // setInformation({ ...information, context: info }),
        };
        await backend.Bob(contract, interact);
    };
    // console.log("information", information);

    if (user === "alice") {
        return (
            <>
                {contractAlice ? (
                    <>
                        <div>Contract: {contractAlice.contractString}</div>
                        <div className="form-alice">
                            <Form onSubmit={handleSubmit}>
                                <Form.Group className="mb-3" controlId="fee">
                                    <Form.Label>Fee</Form.Label>
                                    <Form.Control
                                        onChange={(e) =>
                                            setValues({ ...values, fee: e.target.value })
                                        }
                                        name="fee"
                                        required
                                        type="number"
                                        placeholder="Enter fee"
                                    />
                                    <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                </Form.Group>
                                <FloatingLabel
                                    value={values.text}
                                    controlId="context"
                                    label="Context"
                                    className="mb-3"
                                >
                                    <Form.Control
                                        onChange={(e) =>
                                            setValues({ ...values, text: e.target.value })
                                        }
                                        name="context"
                                        required
                                        as="textarea"
                                        placeholder="Leave a context here"
                                    />
                                    <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                </FloatingLabel>
                                <Button variant="primary" type="submit">
                                    Submit
                                </Button>
                            </Form>
                        </div>
                    </>
                ) : (
                    <Button onClick={handleDeploy}>Deploy Contract</Button>
                )}
            </>
        );
    } else {
        return (
            <Row>
                {/* {information ? (
                    <>
                        <Col>Charge: {information.charge}</Col>
                        <Col>Context: {information.context}</Col>
                    </>
                ) : ( */}
                <Col>

                    <Form onSubmit={handleSubmitGetInfo}>
                        <FloatingLabel
                            value={values.text}
                            controlId="contract"
                            label="Contract"
                            className="mb-3"
                        >
                            <Form.Control
                                onChange={(e) =>
                                    setContractAlice({
                                        contractString: e.target.value,
                                    })
                                }
                                name="contract"
                                required
                                as="textarea"
                                placeholder="Contract here"
                            />
                            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                        </FloatingLabel>
                        <Button variant="primary" type="submit">
                            Get Info From Alice
                        </Button>
                    </Form>
                </Col>
                {/* )} */}
            </Row>
        );
    }
};
export default DetailUserComponent;
