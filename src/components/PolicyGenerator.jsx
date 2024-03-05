// import React, { useState } from "react";
// import { Container, Row, Col, Button, Form } from "react-bootstrap";

// function PolicyGenerator() {
//   const [formData, setFormData] = useState({
//     AC: {
//       temperature: {
//         fan_speed: "",
//         swing: "",
//         rules: [],
//       },
//     },
//   });

//   const handleInputChange = (device, type, field, value) => {
//     setFormData((prevState) => ({
//       ...prevState,
//       [device]: {
//         ...prevState[device],
//         [type]: {
//           ...prevState[device][type],
//           [field]: value,
//         },
//       },
//     }));
//   };

//   const addRule = () => {
//     const newRule = {
//       outside_min: "",
//       outside_max: "",
//       sub_rules: [],
//     };
//     setFormData((prevState) => ({
//       ...prevState,
//       AC: {
//         ...prevState.AC,
//         temperature: {
//           ...prevState.AC.temperature,
//           rules: [...prevState.AC.temperature.rules, newRule],
//         },
//       },
//     }));
//   };

//   const addSubRule = (ruleIndex) => {
//     const newSubRule = {
//       inside_min: -40,
//       inside_max: "",
//       morning: "",
//       afternoon: "",
//       evening: "",
//       night: "",
//       mode: "",
//     };
//     setFormData((prevState) => ({
//       ...prevState,
//       AC: {
//         ...prevState.AC,
//         temperature: {
//           ...prevState.AC.temperature,
//           rules: prevState.AC.temperature.rules.map((rule, index) => {
//             if (index === ruleIndex) {
//               return {
//                 ...rule,
//                 sub_rules: [...(rule.sub_rules || []), newSubRule],
//               };
//             }
//             return rule;
//           }),
//         },
//       },
//     }));
//   };

//   const generateJSON = () => {
//     console.log(JSON.stringify(formData, null, 2));
//     // Further processing with formData as needed
//   };

//   return  (
//     <Container>
//       <h1>AC</h1>
//       <h3>Temperature</h3>
//       <Row className="mb-3">
//         <Col>
//           <Form.Group controlId="fanSpeed">
//             <Form.Label>Fan Speed:</Form.Label>
//             <Form.Control
//               as="select"
//               value={formData.AC.temperature.fan_speed}
//               onChange={(e) =>
//                 handleInputChange("AC", "temperature", "fan_speed", e.target.value)
//               }
//             >
//               <option value="">Select Fan Speed</option>
//               <option value="Low">Low</option>
//               <option value="Medium">Medium</option>
//               <option value="High">High</option>
//             </Form.Control>
//           </Form.Group>
//         </Col>
//         <Col>
//           <Form.Group controlId="swing">
//             <Form.Label>Swing:</Form.Label>
//             <Form.Control
//               as="select"
//               value={formData.AC.temperature.swing}
//               onChange={(e) =>
//                 handleInputChange("AC", "temperature", "swing", e.target.value)
//               }
//             >
//               <option value="">Select Swing</option>
//               <option value="On">On</option>
//               <option value="Off">Off</option>
//             </Form.Control>
//           </Form.Group>
//         </Col>
//       </Row>

//       {formData.AC.temperature.rules.map((rule, index) => (
//         <div key={index}>
//           <h4>Rule {index + 1}</h4>
//           <Form.Group controlId={`outsideMin-${index}`}>
//             <Form.Label>Outside Min:</Form.Label>
//             <Form.Control
//               type="number"
//               value={rule.outside_min}
//               onChange={(e) =>
//                 handleInputChange("AC", "temperature", "rules", {
//                   ...rule,
//                   outside_min: e.target.value,
//                 })
//               }
//             />
//           </Form.Group>
//           <Form.Group controlId={`outsideMax-${index}`}>
//             <Form.Label>Outside Max:</Form.Label>
//             <Form.Control
//               type="number"
//               value={rule.outside_max}
//               onChange={(e) =>
//                 handleInputChange("AC", "temperature", "rules", {
//                   ...rule,
//                   outside_max: e.target.value,
//                 })
//               }
//             />
//           </Form.Group>
//           <Button variant="primary" onClick={() => addSubRule(index)}>
//             Add Sub Rule
//           </Button>
//           {rule.sub_rules &&
//             rule.sub_rules.map((subRule, subIndex) => (
//               <div key={subIndex}>
//                 <h5>Sub Rule {subIndex + 1}</h5>
//                 <Form.Group controlId={`insideMin-${subIndex}`}>
//                   <Form.Label>Inside Min:</Form.Label>
//                   <Form.Control
//                     type="number"
//                     value={subRule.inside_min}
//                     onChange={(e) =>
//                       handleInputChange("AC", "temperature", "rules", {
//                         ...rule,
//                         sub_rules: rule.sub_rules.map((s, i) =>
//                           i === subIndex
//                             ? { ...s, inside_min: e.target.value }
//                             : s
//                         ),
//                       })
//                     }
//                   />
//                 </Form.Group>
//                 <Form.Group controlId={`insideMax-${subIndex}`}>
//                   <Form.Label>Inside Max</Form.Label>
//                   <Form.Control
//                     type="number"
//                     value={subRule.inside_max}
//                     onChange={(e) =>
//                       handleInputChange("AC", "temperature", "rules", {
//                         ...rule,
//                         sub_rules: rule.sub_rules.map((s, i) =>
//                           i === subIndex
//                             ? { ...s, inside_max: e.target.value }
//                             : s
//                         ),
//                       })
//                     }
//                   />
//                 </Form.Group>
//                 <Form.Group controlId={`morning-${subIndex}`}>
//                   <Form.Label>Morning:</Form.Label>
//                   <Form.Control
//                     type="number"
//                     value={subRule.morning}
//                     onChange={(e) =>
//                       handleInputChange("AC", "temperature", "rules", {
//                         ...rule,
//                         sub_rules: rule.sub_rules.map((s, i) =>
//                           i === subIndex
//                             ? { ...s, morning: e.target.value }
//                             : s
//                         ),
//                       })
//                     }
//                   />
//                 </Form.Group>

//                 <Form.Group controlId={`morning-${subIndex}`}>
//                   <Form.Label>Afternoon:</Form.Label>
//                   <Form.Control
//                     type="number"
//                     value={subRule.afternoon}
//                     onChange={(e) =>
//                       handleInputChange("AC", "temperature", "rules", {
//                         ...rule,
//                         sub_rules: rule.sub_rules.map((s, i) =>
//                           i === subIndex
//                             ? { ...s, afternoon: e.target.value }
//                             : s
//                         ),
//                       })
//                     }
//                   />
//                 </Form.Group>

//                 <Form.Group controlId={`morning-${subIndex}`}>
//                   <Form.Label>Evening:</Form.Label>
//                   <Form.Control
//                     type="number"
//                     value={subRule.evening}
//                     onChange={(e) =>
//                       handleInputChange("AC", "temperature", "rules", {
//                         ...rule,
//                         sub_rules: rule.sub_rules.map((s, i) =>
//                           i === subIndex
//                             ? { ...s, evening: e.target.value }
//                             : s
//                         ),
//                       })
//                     }
//                   />
//                 </Form.Group>

//                 <Form.Group controlId={`morning-${subIndex}`}>
//                   <Form.Label>Night:</Form.Label>
//                   <Form.Control
//                     type="number"
//                     value={subRule.night}
//                     onChange={(e) =>
//                       handleInputChange("AC", "temperature", "rules", {
//                         ...rule,
//                         sub_rules: rule.sub_rules.map((s, i) =>
//                           i === subIndex
//                             ? { ...s, night: e.target.value }
//                             : s
//                         ),
//                       })
//                     }
//                   />
//                 </Form.Group>
//                 <Form.Group controlId={`mode-${subIndex}`}>
//                   <Form.Label>Mode:</Form.Label>
//                   <Form.Control
//                     as="select"
//                     value={subRule.mode}
//                     onChange={(e) =>
//                       handleInputChange("AC", "temperature", "rules", {
//                         ...rule,
//                         sub_rules: rule.sub_rules.map((s, i) =>
//                           i === subIndex
//                             ? { ...s, mode: e.target.value }
//                             : s
//                         ),
//                       })
//                     }
//                   >
//                     <option value="">Select Mode</option>
//                     <option value="Heat">Heat</option>
//                     <option value="Cold">Cold</option>
//                     <option value="Normal">Normal</option>
//                   </Form.Control>
//                 </Form.Group>
//               </div>
//             ))}
//         </div>
//       ))}

//       <Button variant="primary" onClick={addRule}>
//         Add Rule
//       </Button>

//       <Button variant="primary" onClick={generateJSON}>
//         Generate JSON
//       </Button>
//     </Container>

//   );
// }

// export default PolicyGenerator;

import React, { useState } from "react";
import {
  Row,
  Col,
  Button,
  Form,
  Select,
  InputNumber,
  Input,
  Space,
  Card,
  Modal,
  message
} from "antd";
import copy from 'copy-to-clipboard';
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { CloseOutlined } from "@ant-design/icons";
const { Option } = Select;

function PolicyGenerator() {
  const [form] = Form.useForm();
  const layout = {
    labelCol: {
      span: 8,
    },
    wrapperCol: {
      span: 16,
    },
  };

  //   function convertRules(inputArray,name) {
  //     let output = { [name]: {} };
  //     inputArray.forEach((rule, ruleIndex) => {
  //         let temperatureRule = {};
  //         temperatureRule[`rule${ruleIndex + 1}`] = {
  //             outside_min: rule.outside_min,
  //             outside_max: rule.outside_max
  //         };

  //         if (rule.sub_rules) {
  //             rule.sub_rules.forEach((subRule, subRuleIndex) => {
  //                 let subRuleKey = `sub_rule${subRuleIndex + 1}`;
  //                 temperatureRule[`rule${ruleIndex + 1}`][subRuleKey] = {
  //                     inside_min: subRule.inside_min,
  //                     inside_max: subRule.inside_max,
  //                     morning: subRule.morning,
  //                     afternoon: subRule.afternoon,
  //                     evening: subRule.evening,
  //                     night: subRule.night,
  //                     mode: subRule.mode
  //                 };
  //             });
  //         }
  //         Object.assign(output.temperature, temperatureRule);
  //     });
  //     return output;
  // }
  //   const onFinish = (value) => {
  //     let ACTemperature = convertRules(value.ac_temperature_rules,'temperature')
  //     ACTemperature.temperature['ac_temperature_fan_speed'] = value.ac_temperature_fan_speed
  //     ACTemperature.temperature['ac_temperature_swing'] = value.ac_temperature_swing

  //     let ACHumidityDucted = convertRules((value.humidity_ducted_rules ?value.humidity_ducted_rules :[] ),'ducted')
  //     ACHumidityDucted.ducted['humidity_ducted_fan_speed'] = value.humidity_ducted_fan_speed
  //     ACHumidityDucted.ducted['humidity_ducted_swing'] = value.humidity_ducted_swing

  //     let ACHumidityFanCoils = convertRules((value.fan_coil_rules ?value.humidity_ducted_rules :[] ),'fan_coil')
  //     ACHumidityFanCoils.fan_coil['fan_coil_fan_speed'] = value.fan_coil_fan_speed
  //     ACHumidityFanCoils.fan_coil['fan_coil_swing'] = value.fan_coil_swing
  //     let radiatorTemperature = {}
  //     if("radiator_temperature_rules" in value){
  //          radiatorTemperature = convertRules(value.radiator_temperature_rules,'temperature')

  //     }
  //     let finalJSON = {
  //         AC:{
  //             temperature:ACTemperature.temperature,
  //             humidity:{
  //                 ducted:ACHumidityDucted.ducted,
  //                 fan_coil:ACHumidityFanCoils.fan_coil
  //             }
  //         },
  //         radiator:{
  //             temperature:radiatorTemperature.temperature
  //         }
  //     }
  //     console.log("final josn",finalJSON)
  //   };

  function convertRules(inputArray = [], name = "") {
    if (!Array.isArray(inputArray) || !name || typeof name !== "string") {
      throw new Error("Invalid input");
    }

    if (inputArray.length === 0) {
      return { [name]: {} };
    }

    return inputArray.reduce((output, rule, ruleIndex) => {
      const temperatureRule = {
        [`rule${ruleIndex + 1}`]: {
          outside_min: rule.outside_min,
          outside_max: rule.outside_max,
        },
      };

      if (rule.sub_rules && Array.isArray(rule.sub_rules)) {
        const subRules = rule.sub_rules.map((subRule, subRuleIndex) => ({
          [`sub_rule${subRuleIndex + 1}`]: {
            inside_min: subRule.inside_min,
            inside_max: subRule.inside_max,
            morning: subRule.morning,
            afternoon: subRule.afternoon,
            evening: subRule.evening,
            night: subRule.night,
            mode: subRule.mode,
          },
        }));

        Object.assign(temperatureRule[`rule${ruleIndex + 1}`], ...subRules);
      }

      return { ...output, [name]: { ...output[name], ...temperatureRule } };
    }, {});
  }

  const onFinish = (value) => {
    try {
      const ACTemperature = convertRules(
        value.ac_temperature_rules,
        "temperature"
      );
      ACTemperature.temperature["ac_temperature_fan_speed"] =
        value.ac_temperature_fan_speed;
      ACTemperature.temperature["ac_temperature_swing"] =
        value.ac_temperature_swing;

      const ACHumidityDucted = convertRules(
        value.humidity_ducted_rules || [],
        "ducted"
      );
      ACHumidityDucted.ducted["humidity_ducted_fan_speed"] =
        value.humidity_ducted_fan_speed;
      ACHumidityDucted.ducted["humidity_ducted_swing"] =
        value.humidity_ducted_swing;
      const ACHumidityFanCoils = convertRules(
        value.fan_coil_rules || [],
        "fan_coil"
      );
      ACHumidityFanCoils.fan_coil["fan_coil_fan_speed"] =
        value.fan_coil_fan_speed;
      ACHumidityFanCoils.fan_coil["fan_coil_swing"] = value.fan_coil_swing;

      const radiatorTemperature = value.radiator_temperature_rules
        ? convertRules(value.radiator_temperature_rules, "temperature")
        : {};

      const finalJSON = {
        AC: {
          temperature: ACTemperature.temperature,
          humidity: {
            ducted: ACHumidityDucted.ducted,
            fan_coil: ACHumidityFanCoils.fan_coil,
          },
        },
        radiator: {
          temperature: radiatorTemperature.temperature,
        },
      };

      const copyJSONToClipboard = () => {
        copy(JSON.stringify(finalJSON, null, 2));
        message.success('JSON copied to clipboard');
    };

      Modal.info({
        title: 'Final JSON Result',
        content: (
            <div>
                <pre style={{ maxHeight: '60vh', overflow: 'auto' }}>
                    {JSON.stringify(finalJSON, null, 2)}
                </pre>
                <Button onClick={copyJSONToClipboard} style={{ marginTop: '10px' }}>
                    Copy JSON
                </Button>
            </div>
        ),
        width: 800, 
        maskClosable: true,
        okText: 'Close'
    });
      console.log("final json", finalJSON);
    } catch (error) {
      console.error("Error occurred:", error.message);
    }
  };

  return (
    <div style={{ padding: "25px" }}>
      <Form
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 18 }}
        onFinish={onFinish}
        layout="vertical"
        // {...layout}
        //   layout="horizontal"
        //   style={{ maxWidth: 1000 }}
      >
        <div className="ac-maain-container">
          <h1>AC</h1>
          <div className="temprature-section">
            <h3>Temperature</h3>
            <Form.Item
              name="ac_temperature_fan_speed"
              label="Fan Speed"
              rules={[
                {
                  required: true,
                  message: "Please select Fan Speed!",
                },
              ]}
            >
              <Select placeholder="select your Fan Speed">
                <Option value="low">Low</Option>
                <Option value="medium">Medium</Option>
                <Option value="higj">High</Option>
              </Select>
            </Form.Item>
            <Form.Item
              name="ac_temperature_swing"
              label="Swing"
              rules={[
                {
                  required: true,
                  message: "Please select Swing!",
                },
              ]}
            >
              <Select placeholder="select your Mode">
                <Option value="on">On</Option>
                <Option value="off">Off</Option>
              </Select>
            </Form.Item>
            <Form.List name="ac_temperature_rules">
              {(fields, { add, remove }) => (
                <div
                  style={{
                    display: "flex",
                    rowGap: 16,
                    flexDirection: "column",
                  }}
                >
                  {fields.map((field) => (
                    <Card
                      size="large"
                      title={`Rule ${field.name + 1}`}
                      key={field.key}
                      extra={
                        <CloseOutlined
                          onClick={() => {
                            remove(field.name);
                          }}
                        />
                      }
                    >
                      <Form.Item
                        label="Outside Min:"
                        name={[field.name, "outside_min"]}
                      >
                        <Input />
                      </Form.Item>
                      <Form.Item
                        label="Outside Max:"
                        name={[field.name, "outside_max"]}
                      >
                        <Input />
                      </Form.Item>

                      {/* Nest Form.List */}
                      <Form.Item label="Sub Rules">
                        <Form.List name={[field.name, "sub_rules"]}>
                          {(subFields, subOpt) => (
                            <div
                              style={{
                                display: "flex",
                                flexDirection: "column",
                                rowGap: 16,
                                flexGrow: 1,
                              }}
                            >
                              {subFields.map((subField) => (
                                <Space key={subField.key}>
                                  <Form.Item
                                    name={[subField.name, "inside_min"]}
                                    label ="Inside Min"
                                  >
                                    <InputNumber placeholder="inside_min" />
                                  </Form.Item>
                                  <Form.Item
                                    label ="Inside Max"
                                    name={[subField.name, "inside_max"]}
                                  >
                                    <Input placeholder="inside_max" />
                                  </Form.Item>
                                  <Form.Item
                                    label ="Morning"
                                    name={[subField.name, "morning"]}
                                  >
                                    <InputNumber placeholder="morning" />
                                  </Form.Item>
                                  <Form.Item
                                    label ="Afternoon"
                                    name={[subField.name, "afternoon"]}
                                  >
                                    <InputNumber placeholder="afternoon" />
                                  </Form.Item>
                                  <Form.Item
                                    label ="Evening"
                                    
                                    name={[subField.name, "evening"]}
                                  >
                                    <Input placeholder="evening" />
                                  </Form.Item>

                                  <Form.Item
                                    label ="Night"
                                    name={[subField.name, "night"]}
                                  >
                                    <Input placeholder="night" />
                                  </Form.Item>
                                  <Form.Item
                                    // style={{ margin: "0px" }}
                                    name={[subField.name, "mode"]}
                                    label="Mode"
                                    rules={[
                                      {
                                        required: true,
                                        message: "Please select Mode!",
                                      },
                                    ]}
                                  >
                                    <Select placeholder="select your Mode">
                                    <Option value="cool">Cool</Option>
                                        <Option value="dry">Dry</Option>
                                        <Option value="heat">Heat</Option>
                                        <Option value="frost_protection">
                                          Frost Protection
                                        </Option>
                                        <Option value="avoid_mode">
                                          Avoid Mould
                                        </Option>
                                    </Select>
                                  </Form.Item>

                                  <CloseOutlined
                                    onClick={() => {
                                      subOpt.remove(subField.name);
                                    }}
                                  />
                                </Space>
                              ))}
                              <Button
                                type="dashed"
                                onClick={() => subOpt.add()}
                                block
                              >
                                + Add Sub Rule
                              </Button>
                            </div>
                          )}
                        </Form.List>
                      </Form.Item>
                    </Card>
                  ))}

                  <Button type="dashed" onClick={() => add()} block>
                    + Add Temperature Rule
                  </Button>
                </div>
              )}
            </Form.List>
          </div>

          <div className="humidity-section">
            <h3>Humidity</h3>

            <div className="ducted-section">
              <h4>Ducted</h4>

              <Form.Item
                name="humidity_ducted_fan_speed"
                label="Fan Speed"
                rules={[
                  {
                    required: true,
                    message: "Please select Fan Speed!",
                  },
                ]}
              >
                <Select placeholder="select your Fan Speed">
                  <Option value="low">Low</Option>
                  <Option value="medium">Medium</Option>
                  <Option value="higj">High</Option>
                </Select>
              </Form.Item>
              <Form.Item
                name="humidity_ducted_swing"
                label="Swing"
                rules={[
                  {
                    required: true,
                    message: "Please select Swing!",
                  },
                ]}
              >
                <Select placeholder="select your Mode">
                  <Option value="on">On</Option>
                  <Option value="off">Off</Option>
                </Select>
              </Form.Item>
              <Form.List name="humidity_ducted_rules">
                {(fields, { add, remove }) => (
                  <div
                    style={{
                      display: "flex",
                      rowGap: 16,
                      flexDirection: "column",
                    }}
                  >
                    {fields.map((field) => (
                      <Card
                        size="small"
                        title={`Rule ${field.name + 1}`}
                        key={field.key}
                        extra={
                          <CloseOutlined
                            onClick={() => {
                              remove(field.name);
                            }}
                          />
                        }
                      >
                        <Form.Item
                          label="Outside Min:"
                          name={[field.name, "outside_min"]}
                        >
                          <Input />
                        </Form.Item>
                        <Form.Item
                          label="Outside Max:"
                          name={[field.name, "outside_max"]}
                        >
                          <Input />
                        </Form.Item>

                        {/* Nest Form.List */}
                        <Form.Item label="Sub Rules">
                        <Form.List name={[field.name, "sub_rules"]}>
                          {(subFields, subOpt) => (
                            <div
                              style={{
                                display: "flex",
                                flexDirection: "column",
                                rowGap: 16,
                                flexGrow: 1,
                              }}
                            >
                              {subFields.map((subField) => (
                                <Space key={subField.key}>
                                  <Form.Item
                                    name={[subField.name, "inside_min"]}
                                    label ="Inside Min"
                                  >
                                    <InputNumber placeholder="inside_min" />
                                  </Form.Item>
                                  <Form.Item
                                    label ="Inside Max"
                                    name={[subField.name, "inside_max"]}
                                  >
                                    <Input placeholder="inside_max" />
                                  </Form.Item>
                                  <Form.Item
                                    label ="Morning"
                                    name={[subField.name, "morning"]}
                                  >
                                    <InputNumber placeholder="morning" />
                                  </Form.Item>
                                  <Form.Item
                                    label ="Afternoon"
                                    name={[subField.name, "afternoon"]}
                                  >
                                    <InputNumber placeholder="afternoon" />
                                  </Form.Item>
                                  <Form.Item
                                    label ="Evening"
                                    
                                    name={[subField.name, "evening"]}
                                  >
                                    <Input placeholder="evening" />
                                  </Form.Item>

                                  <Form.Item
                                    label ="Night"
                                    name={[subField.name, "night"]}
                                  >
                                    <Input placeholder="night" />
                                  </Form.Item>
                                  <Form.Item
                                    // style={{ margin: "0px" }}
                                    name={[subField.name, "mode"]}
                                    label="Mode"
                                    rules={[
                                      {
                                        required: true,
                                        message: "Please select Mode!",
                                      },
                                    ]}
                                  >
                                    <Select placeholder="select your Mode">
                                    <Option value="cool">Cool</Option>
                                        <Option value="dry">Dry</Option>
                                        <Option value="heat">Heat</Option>
                                        <Option value="frost_protection">
                                          Frost Protection
                                        </Option>
                                        <Option value="avoid_mode">
                                          Avoid Mould
                                        </Option>
                                    </Select>
                                  </Form.Item>

                                  <CloseOutlined
                                    onClick={() => {
                                      subOpt.remove(subField.name);
                                    }}
                                  />
                                </Space>
                              ))}
                              <Button
                                type="dashed"
                                onClick={() => subOpt.add()}
                                block
                              >
                                + Add Sub Rule
                              </Button>
                            </div>
                          )}
                        </Form.List>
                      </Form.Item>
                      </Card>
                    ))}

                    <Button type="dashed" onClick={() => add()} block>
                      + Add DuctRule
                    </Button>
                  </div>
                )}
              </Form.List>
            </div>

            <div className="fan-coil-section">
              <h4>Fan coil</h4>

              <Form.Item
                name="fan_coil_fan_speed"
                label="Fan Speed"
                rules={[
                  {
                    required: true,
                    message: "Please select Fan Speed!",
                  },
                ]}
              >
                <Select placeholder="select your Fan Speed">
                  <Option value="low">Low</Option>
                  <Option value="medium">Medium</Option>
                  <Option value="higj">High</Option>
                </Select>
              </Form.Item>
              <Form.Item
                name="fan_coil_swing"
                label="Swing"
                rules={[
                  {
                    required: true,
                    message: "Please select Swing!",
                  },
                ]}
              >
                <Select placeholder="select your Mode">
                  <Option value="on">On</Option>
                  <Option value="off">Off</Option>
                </Select>
              </Form.Item>
              <Form.List name="fan_coil_rules">
                {(fields, { add, remove }) => (
                  <div
                    style={{
                      display: "flex",
                      rowGap: 16,
                      flexDirection: "column",
                    }}
                  >
                    {fields.map((field) => (
                      <Card
                        size="small"
                        title={`Rule ${field.name + 1}`}
                        key={field.key}
                        extra={
                          <CloseOutlined
                            onClick={() => {
                              remove(field.name);
                            }}
                          />
                        }
                      >
                        <Form.Item
                          label="Outside Min:"
                          name={[field.name, "outside_min"]}
                        >
                          <Input />
                        </Form.Item>
                        <Form.Item
                          label="Outside Max:"
                          name={[field.name, "outside_max"]}
                        >
                          <Input />
                        </Form.Item>

                        {/* Nest Form.List */}
                        <Form.Item label="Sub Rules">
                        <Form.List name={[field.name, "sub_rules"]}>
                          {(subFields, subOpt) => (
                            <div
                              style={{
                                display: "flex",
                                flexDirection: "column",
                                rowGap: 16,
                                flexGrow: 1,
                              }}
                            >
                              {subFields.map((subField) => (
                                <Space key={subField.key}>
                                  <Form.Item
                                    name={[subField.name, "inside_min"]}
                                    label ="Inside Min"
                                  >
                                    <InputNumber placeholder="inside_min" />
                                  </Form.Item>
                                  <Form.Item
                                    label ="Inside Max"
                                    name={[subField.name, "inside_max"]}
                                  >
                                    <Input placeholder="inside_max" />
                                  </Form.Item>
                                  <Form.Item
                                    label ="Morning"
                                    name={[subField.name, "morning"]}
                                  >
                                    <InputNumber placeholder="morning" />
                                  </Form.Item>
                                  <Form.Item
                                    label ="Afternoon"
                                    name={[subField.name, "afternoon"]}
                                  >
                                    <InputNumber placeholder="afternoon" />
                                  </Form.Item>
                                  <Form.Item
                                    label ="Evening"
                                    
                                    name={[subField.name, "evening"]}
                                  >
                                    <Input placeholder="evening" />
                                  </Form.Item>

                                  <Form.Item
                                    label ="Night"
                                    name={[subField.name, "night"]}
                                  >
                                    <Input placeholder="night" />
                                  </Form.Item>
                                  <Form.Item
                                    // style={{ margin: "0px" }}
                                    name={[subField.name, "mode"]}
                                    label="Mode"
                                    rules={[
                                      {
                                        required: true,
                                        message: "Please select Mode!",
                                      },
                                    ]}
                                  >
                                    <Select placeholder="select your Mode">
                                    <Option value="cool">Cool</Option>
                                        <Option value="dry">Dry</Option>
                                        <Option value="heat">Heat</Option>
                                        <Option value="frost_protection">
                                          Frost Protection
                                        </Option>
                                        <Option value="avoid_mode">
                                          Avoid Mould
                                        </Option>
                                    </Select>
                                  </Form.Item>

                                  <CloseOutlined
                                    onClick={() => {
                                      subOpt.remove(subField.name);
                                    }}
                                  />
                                </Space>
                              ))}
                              <Button
                                type="dashed"
                                onClick={() => subOpt.add()}
                                block
                              >
                                + Add Sub Rule
                              </Button>
                            </div>
                          )}
                        </Form.List>
                      </Form.Item>
                      </Card>
                    ))}

                    <Button type="dashed" onClick={() => add()} block>
                      + Add Fan coil Rule
                    </Button>
                  </div>
                )}
              </Form.List>
            </div>
          </div>
        </div>

        <div className="radiator-main-container">
          <h1>Radiator</h1>
          <div className="temprature-section">
            <h3>Temperature</h3>

            <Form.List name="radiator_temperature_rules">
              {(fields, { add, remove }) => (
                <div
                  style={{
                    display: "flex",
                    rowGap: 16,
                    flexDirection: "column",
                  }}
                >
                  {fields.map((field) => (
                    <Card
                      size="large"
                      title={`Rule ${field.name + 1}`}
                      key={field.key}
                      extra={
                        <CloseOutlined
                          onClick={() => {
                            remove(field.name);
                          }}
                        />
                      }
                    >
                      <Form.Item
                        label="Outside Min:"
                        name={[field.name, "outside_min"]}
                      >
                        <InputNumber defaultValue={-22} />
                      </Form.Item>
                      <Form.Item
                        label="Outside Max:"
                        name={[field.name, "outside_max"]}
                      >
                        <InputNumber />
                      </Form.Item>

                    {/* NESTED RULES (SUB RULES) */}
                    <Form.Item label="Sub Rules">
                        <Form.List name={[field.name, "sub_rules"]}>
                          {(subFields, subOpt) => (
                            <div
                              style={{
                                display: "flex",
                                flexDirection: "column",
                                rowGap: 16,
                                flexGrow: 1,
                              }}
                            >
                              {subFields.map((subField) => (
                                <Space key={subField.key}>
                                  <Form.Item
                                    name={[subField.name, "inside_min"]}
                                    label ="Inside Min"
                                  >
                                    <InputNumber placeholder="inside_min" />
                                  </Form.Item>
                                  <Form.Item
                                    label ="Inside Max"
                                    name={[subField.name, "inside_max"]}
                                  >
                                    <Input placeholder="inside_max" />
                                  </Form.Item>
                                  <Form.Item
                                    label ="Morning"
                                    name={[subField.name, "morning"]}
                                  >
                                    <InputNumber placeholder="morning" />
                                  </Form.Item>
                                  <Form.Item
                                    label ="Afternoon"
                                    name={[subField.name, "afternoon"]}
                                  >
                                    <InputNumber placeholder="afternoon" />
                                  </Form.Item>
                                  <Form.Item
                                    label ="Evening"
                                    
                                    name={[subField.name, "evening"]}
                                  >
                                    <Input placeholder="evening" />
                                  </Form.Item>

                                  <Form.Item
                                    label ="Night"
                                    name={[subField.name, "night"]}
                                  >
                                    <Input placeholder="night" />
                                  </Form.Item>
                                  <Form.Item
                                    // style={{ margin: "0px" }}
                                    name={[subField.name, "mode"]}
                                    label="Mode"
                                    rules={[
                                      {
                                        required: true,
                                        message: "Please select Mode!",
                                      },
                                    ]}
                                  >
                                    <Select placeholder="select your Mode">
                                    <Option value="cool">Cool</Option>
                                        <Option value="dry">Dry</Option>
                                        <Option value="heat">Heat</Option>
                                        <Option value="frost_protection">
                                          Frost Protection
                                        </Option>
                                        <Option value="avoid_mode">
                                          Avoid Mould
                                        </Option>
                                    </Select>
                                  </Form.Item>

                                  <CloseOutlined
                                    onClick={() => {
                                      subOpt.remove(subField.name);
                                    }}
                                  />
                                </Space>
                              ))}
                              <Button
                                type="dashed"
                                onClick={() => subOpt.add()}
                                block
                              >
                                + Add Sub Rule
                              </Button>
                            </div>
                          )}
                        </Form.List>
                      </Form.Item>
                    </Card>
                  ))}

                  <Button type="dashed" onClick={() => add()} block>
                    + Add Radiator Temperature Rule
                  </Button>
                </div>
              )}
            </Form.List>
          </div>
        </div>

        <div style={{ marginTop: "20px" }} className="button-grp-container">
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </div>
      </Form>
    </div>
  );
}

export default PolicyGenerator;
