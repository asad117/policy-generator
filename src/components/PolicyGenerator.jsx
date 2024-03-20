
import React, { useState, useEffect } from "react";
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
  message,
} from "antd";
import copy from "copy-to-clipboard";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { CloseOutlined } from "@ant-design/icons";

const { Option } = Select;


const defaultFormData = {
  "climate_type": "sub_tropical",
  "season": "summer",
  "type": "cooling",
  "occupancy": "occupied",
  "ac_temperature_fan_speed": "low",
  "ac_temperature_swing": "ON",
  "ac_temperature_rules": [
      {
          "outside_min": -40,
          "outside_max": -6,
          "sub_rules": [
              {
                  "inside_min": 2,
                  "inside_max": "2",
                  "morning": "5",
                  "afternoon": "9",
                  "evening": "12",
                  "night": "OFF",
                  "mode": "dry"
              }
          ]
      },
      {
          "outside_min": -6,
          "outside_max": 4
      },
      {
          "outside_min": 4,
          "outside_max": 15
      },
      {
          "outside_min": 15,
          "outside_max": 20
      },
      {
          "outside_min": 20,
          "outside_max": 25
      },
      {
          "outside_min": 25,
          "outside_max": 31
      },
      {
          "outside_min": 31,
          "outside_max": 50
      }
  ],
  "humidity_ducted_fan_speed": "medium",
  "humidity_ducted_swing": "OFF",
  "humidity_ducted_rules": [
      {
          "outside_min": 0,
          "outside_max": 60
      },
      {
          "outside_min": 60,
          "outside_max": 70
      },
      {
          "outside_min": 70,
          "outside_max": 90
      },
      {
          "outside_min": 90,
          "outside_max": 100
      }
  ],
  "fan_coil_fan_speed": "medium",
  "fan_coil_swing": "OFF",
  "fan_coil_rules": [
      {
          "outside_min": 0,
          "outside_max": 60
      },
      {
          "outside_min": 60,
          "outside_max": 70
      },
      {
          "outside_min": 70,
          "outside_max": 90
      },
      {
          "outside_min": 90,
          "outside_max": 100
      },
      {}
  ],
  "radiator_temperature_rules": [
      {
          "outside_min": -40,
          "outside_max": -20
      },
      {
          "outside_min": -20,
          "outside_max": -15
      },
      {
          "outside_min": -15,
          "outside_max": -10
      },
      {
          "outside_min": -10,
          "outside_max": -5
      },
      {
          "outside_min": -5,
          "outside_max": 0
      },
      {
          "outside_min": 0,
          "outside_max": 4
      },
      {
          "outside_min": 1,
          "outside_max": 4
      },
      {
          "outside_min": 4,
          "outside_max": 9
      },
      {
          "outside_min": 9,
          "outside_max": 14
      },
      {
          "outside_min": 14,
          "outside_max": 19
      },
      {
          "outside_min": 19,
          "outside_max": 50
      }
  ]
}


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

  const [initialFormData,setInitialFormData] = useState(defaultFormData)

  const ACTemperaturePrefilled = [
    { outside_min: -40, outside_max: -6 },
    { outside_min: -6, outside_max: 4 },
    { outside_min: 4, outside_max: 15 },
    { outside_min: 15, outside_max: 20 },
    { outside_min: 20, outside_max: 25 },
    { outside_min: 25, outside_max: 31 },
    { outside_min: 31, outside_max: 50 },
  ];

  const dayTemOptions = {
    // ON:"ON",
    OFF:"OFF",
    5:5,
    6:6,
    7:7,
    8:8,
    9:9,
    10:10,
    11:11,
    12:12,
    13:13,
    14:14,
    15:15,
    16:16,
    17:17,
    18:18,
    19:19,
    20:20,
    21:21,
    22:22,
    23:23,
    24:24,
    25:25,
    26:26,
    27:27,
  }

  const optionsArray = Object.keys(dayTemOptions).map(key => ({
    value: key,
    label: dayTemOptions[key]
  }));

  const ACHumidityPrefilledRules = [
    { outside_min: 0, outside_max: 60 },
    { outside_min: 60, outside_max:70 },
    { outside_min: 70, outside_max: 90 },
    { outside_min: 90, outside_max: 100 },
  ];

  const radiatorTemperaturePrefilledRules = [
    { outside_min: -40, outside_max: -20 },
    { outside_min: -20, outside_max: -15 },
    { outside_min: -15, outside_max: -10 },
    { outside_min: -10, outside_max: -5 },
    { outside_min: -5, outside_max: 0 },
    { outside_min: 0, outside_max: 4 },
    { outside_min: 1, outside_max: 4 },  //what should be minimum temperature
    { outside_min: 4, outside_max: 9 },
    { outside_min: 9, outside_max: 14 },
    { outside_min: 14, outside_max: 19 },
    { outside_min: 19, outside_max: 50 },


  ];

  

  // const [initialFields, setInitialFields] = useState([]);
  // useEffect(() => {
  //   const initialFieldsData = [];
  //   for (let i = 0; i < 4; i++) {
  //     initialFieldsData.push({
  //       outside_min: ACTemperaturePrefilled[i].outside_min,
  //       outside_max: ACTemperaturePrefilled[i].outside_max,
  //       // sub_rules: [],
  //     });
  //   }
  //   setInitialFields(initialFieldsData);
  // }, []);

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
    console.log("value",value)
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
        message.success("JSON copied to clipboard");
      };
      let fileName = `${value.climate_type}_${value.season}_${value.type}_${value.occupancy}`

      Modal.info({
        title: `Final JSON Result ${value.climate_type}_${value.season}_${value.type}_${value.occupancy}` ,
        content: (
          <div>
            <pre style={{ maxHeight: "60vh", overflow: "auto" }}>
             {JSON.stringify(finalJSON, null, 2)}
            </pre>
            <Button onClick={copyJSONToClipboard} style={{ marginTop: "10px" }}>
              Copy JSON
            </Button>

            <Button onClick={()=>downloadJson(finalJSON,fileName)} style={{ marginTop: "10px" ,marginLeft:"10px"}}>
              Download JSON
            </Button>
          </div>
        ),
        width: 800,
        maskClosable: true,
        okText: "Close",
      });
      console.log("final json", finalJSON);
    } catch (error) {
      console.error("Error occurred:", error.message);
    }
  };

  const downloadJson = (json,fileName) => {
    const jsonString = JSON.stringify(json);
    const blob = new Blob([jsonString], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `${fileName}.json`);
    document.body.appendChild(link);
    link.click();
    URL.revokeObjectURL(url);
    document.body.removeChild(link);
  };

  return (
    <div style={{ padding: "150px" ,}}>
      {/* <div className="reset-button" style={{ duisplay: "flex", alignItems:'end', justifyContent:"right"}}>
      <Button onClick={()=>setInitialFormData()} type="primary" danger ghost>
      Reset
    </Button>
      </div> */}

      <Form
        initialValues={initialFormData}
        labelCol={{ span: 4 }}
        // wrapperCol={{ span: 18 }}
        onFinish={onFinish}
        layout="vertical"
        // {...layout}
        //   layout="horizontal"
        //   style={{ maxWidth: 1000 }}
      >
        <Form.Item
          name="climate_type"
          label="Climate Type"
          rules={[
            {
              required: true,
              message: "Please select Climate type!",
            },
          ]}
        >
          <Select placeholder="select the Climate type">
            <Option value="polar_sub_polar">Polar -Sub Polar</Option>
            <Option value="temperature">Temperature</Option>
            <Option value="sub_tropical">Sub Tropical</Option>
            <Option value="tropical">Tropical</Option>
          </Select>
        </Form.Item>

        <Form.Item
          name="season"
          label="Season"
          rules={[
            {
              required: true,
              message: "Please select season!",
            },
          ]}
        >
          <Select placeholder="select the Season">
            <Option value="spring">Spring</Option>
            <Option value="summer">Summer</Option>
            <Option value="autumn">Autumn</Option>
            <Option value="winter">Winter</Option>
          </Select>
        </Form.Item>

        <Form.Item
          name="type"
          label="Type"
          rules={[
            {
              required: true,
              message: "Please select the type!",
            },
          ]}
        >
          <Select placeholder="select the type">
            <Option value="cooling">Cooling</Option>
            <Option value="heating">Heating</Option>
          </Select>
        </Form.Item>

        <Form.Item
          name="occupancy"
          label="Occupancy"
          rules={[
            {
              required: true,
              message: "Please select the Occupancy!",
            },
          ]}
        >
          <Select placeholder="select the type">
            <Option value="occupied">Occupied</Option>
            <Option value="unoccupied">Unoccupied</Option>
          </Select>
        </Form.Item>

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
                <Option value="ON">ON</Option>
                <Option value="OFF">OFF</Option>
              </Select>
            </Form.Item>
            <Form.List
              name="ac_temperature_rules"
              initialValue={ACTemperaturePrefilled}
            >
              {(fields, { add, remove }) => {
                return (
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
                        // extra={
                        //   <CloseOutlined
                        //     onClick={() => {
                        //       remove(field.name);
                        //     }}
                        //   />
                        // }
                      >
                        <Form.Item
                          label="Outside Min:"
                          name={[field.name, "outside_min"]}
                        >
                          <Input disabled />
                        </Form.Item>
                        <Form.Item
                          label="Outside Max:"
                          name={[field.name, "outside_max"]}
                        >
                          <Input disabled />
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
                                      label="Inside Min"
                                    >
                                      <InputNumber placeholder="inside_min" />
                                    </Form.Item>
                                    <Form.Item
                                      label="Inside Max"
                                      name={[subField.name, "inside_max"]}
                                    >
                                      <Input placeholder="inside_max" />
                                    </Form.Item>
                                    <Form.Item
                                      name={[subField.name, "morning"]}
                                      label="Morning"
                                      rules={[
                                        {
                                          required: true,
                                          message: "Please select Mode!",
                                        },
                                      ]}
                                    >
                                      <Select placeholder="Morning">
                                      {optionsArray.map((item, index) => (
                                      <Option key={index} value={item.value}>
                                        {item.label}
                                        </Option>
                                        ))}
                                      </Select>
                                    </Form.Item>
                                    <Form.Item
                                      name={[subField.name, "afternoon"]}
                                      label="Afternoon"
                                      rules={[
                                        {
                                          required: true,
                                          message: "Please select Mode!",
                                        },
                                      ]}
                                    >
                                      <Select placeholder="Afternoon">
                                      {optionsArray.map((item, index) => (
                                      <Option key={index} value={item.value}>
                                        {item.label}
                                        </Option>
                                        ))}
                                      </Select>
                                    </Form.Item>


                                    <Form.Item
                                      name={[subField.name, "evening"]}
                                      label="Evening"
                                      rules={[
                                        {
                                          required: true,
                                          message: "Please select Mode!",
                                        },
                                      ]}
                                    >
                                      <Select placeholder="Evening">
                                      {optionsArray.map((item, index) => (
                                      <Option key={index} value={item.value}>
                                        {item.label}
                                        </Option>
                                        ))}
                                      </Select>
                                    </Form.Item>

                                    <Form.Item
                                      name={[subField.name, "night"]}
                                      label="Night"
                                      rules={[
                                        {
                                          required: true,
                                          message: "Please select Mode!",
                                        },
                                      ]}
                                    >
                                      <Select placeholder="Night">
                                      {optionsArray.map((item, index) => (
                                      <Option key={index} value={item.value}>
                                        {item.label}
                                        </Option>
                                        ))}
                                      </Select>
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
                    {/* <Button type="dashed" onClick={() => add()} block>
                      + Add Temperature Rule
                    </Button> */}
                  </div>
                );
              }}
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
                  <Option value="ON">ON</Option>
                  <Option value="OFF">OFF</Option>
                </Select>
              </Form.Item>
              <Form.List name="humidity_ducted_rules" initialValue={ACHumidityPrefilledRules}>
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
                        // extra={
                        //   <CloseOutlined
                        //     onClick={() => {
                        //       remove(field.name);
                        //     }}
                        //   />
                        // }
                      >
                        <Form.Item
                          label="Outside Min:"
                          name={[field.name, "outside_min"]}
                        >
                          <Input disabled/>
                        </Form.Item>
                        <Form.Item
                          label="Outside Max:"
                          name={[field.name, "outside_max"]}
                        >
                          <Input disabled />
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
                                      label="Inside Min"
                                    >
                                      <InputNumber placeholder="inside_min" />
                                    </Form.Item>
                                    <Form.Item
                                      label="Inside Max"
                                      name={[subField.name, "inside_max"]}
                                    >
                                      <Input placeholder="inside_max" />
                                    </Form.Item>

                                    <Form.Item
                                      name={[subField.name, "inside_temp_min"]}
                                      label="Inside Min Temp"
                                    >
                                      <InputNumber placeholder="inside_temp_min" />
                                    </Form.Item>
                                    <Form.Item
                                      label="Inside Max Temp"
                                      name={[subField.name, "inside_temp_max"]}
                                    >
                                      <Input placeholder="inside_temp_max" />
                                    </Form.Item>

                                    <Form.Item
                                      name={[subField.name, "morning"]}
                                      label="Morning"
                                      rules={[
                                        {
                                          required: true,
                                          message: "Please select Mode!",
                                        },
                                      ]}
                                    >
                                      <Select placeholder="Morning">
                                        <Option value="ON">ON</Option>
                                        <Option value="OFF">OFF</Option>
                                      </Select>
                                    </Form.Item>

                                    {/* <Form.Item
                                      label="Morning"
                                      name={[subField.name, "morning"]}
                                    >
                                      <InputNumber placeholder="morning" />
                                    </Form.Item> */}

                                    <Form.Item
                                      name={[subField.name, "afternoon"]}
                                      label="Afternoon"
                                      rules={[
                                        {
                                          required: true,
                                          message: "Please select Mode!",
                                        },
                                      ]}
                                    >
                                      <Select placeholder="Afternoon">
                                        <Option value="ON">ON</Option>
                                        <Option value="OFF">OFF</Option>
                                      </Select>
                                    </Form.Item>


                                    <Form.Item
                                      name={[subField.name, "evening"]}
                                      label="Evening"
                                      rules={[
                                        {
                                          required: true,
                                          message: "Please select Mode!",
                                        },
                                      ]}
                                    >
                                      <Select placeholder="Evening">
                                        <Option value="ON">ON</Option>
                                        <Option value="OFF">OFF</Option>
                                      </Select>
                                    </Form.Item>

                                    <Form.Item
                                      name={[subField.name, "night"]}
                                      label="Night"
                                      rules={[
                                        {
                                          required: true,
                                          message: "Please select Mode!",
                                        },
                                      ]}
                                    >
                                      <Select placeholder="Night">
                                        <Option value="ON">ON</Option>
                                        <Option value="OFF">OFF</Option>
                                      </Select>
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

                    {/* <Button type="dashed" onClick={() => add()} block>
                      + Add DuctRule
                    </Button> */}
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
                  <Option value="OFF">ON</Option>
                  <Option value="OFF">OFF</Option>
                </Select>
              </Form.Item>
              <Form.List name="fan_coil_rules" initialValue={ACHumidityPrefilledRules}>
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
                          <Input disabled/>
                        </Form.Item>
                        <Form.Item
                          label="Outside Max:"
                          name={[field.name, "outside_max"]}
                        >
                          <Input disabled/>
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
                                      label="Inside Min"
                                    >
                                      <InputNumber placeholder="inside_min" />
                                    </Form.Item>
                                    <Form.Item
                                      label="Inside Max"
                                      name={[subField.name, "inside_max"]}
                                    >
                                      <Input placeholder="inside_max" />
                                    </Form.Item>

                                    <Form.Item
                                      name={[subField.name, "inside_temp_min"]}
                                      label="Inside Min Temp"
                                    >
                                      <InputNumber placeholder="inside_temp_min" />
                                    </Form.Item>
                                    <Form.Item
                                      label="Inside Max Temp"
                                      name={[subField.name, "inside_temp_max"]}
                                    >
                                      <Input placeholder="inside_temp_max" />
                                    </Form.Item>

                                    <Form.Item
                                      name={[subField.name, "morning"]}
                                      label="Morning"
                                      rules={[
                                        {
                                          required: true,
                                          message: "Please select Mode!",
                                        },
                                      ]}
                                    >
                                      <Select placeholder="Morning">
                                        <Option value="ON">ON</Option>
                                        <Option value="OFF">OFF</Option>
                                      </Select>
                                    </Form.Item>

                                    {/* <Form.Item
                                      label="Morning"
                                      name={[subField.name, "morning"]}
                                    >
                                      <InputNumber placeholder="morning" />
                                    </Form.Item> */}

                                    <Form.Item
                                      name={[subField.name, "afternoon"]}
                                      label="Afternoon"
                                      rules={[
                                        {
                                          required: true,
                                          message: "Please select Mode!",
                                        },
                                      ]}
                                    >
                                      <Select placeholder="Afternoon">
                                        <Option value="ON">ON</Option>
                                        <Option value="OFF">OFF</Option>
                                      </Select>
                                    </Form.Item>


                                    <Form.Item
                                      name={[subField.name, "evening"]}
                                      label="Evening"
                                      rules={[
                                        {
                                          required: true,
                                          message: "Please select Mode!",
                                        },
                                      ]}
                                    >
                                      <Select placeholder="Evening">
                                        <Option value="ON">ON</Option>
                                        <Option value="OFF">OFF</Option>
                                      </Select>
                                    </Form.Item>

                                    <Form.Item
                                      name={[subField.name, "night"]}
                                      label="Night"
                                      rules={[
                                        {
                                          required: true,
                                          message: "Please select Mode!",
                                        },
                                      ]}
                                    >
                                      <Select placeholder="Night">
                                        <Option value="ON">ON</Option>
                                        <Option value="OFF">OFF</Option>
                                      </Select>
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

            <Form.List name="radiator_temperature_rules" initialValue={radiatorTemperaturePrefilledRules}>
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
                      // extra={
                      //   <CloseOutlined
                      //     onClick={() => {
                      //       remove(field.name);
                      //     }}
                      //   />
                      // }
                    >
                      <Form.Item
                        label="Outside Min:"
                        name={[field.name, "outside_min"]}
                      >
                        <InputNumber disabled/>
                      </Form.Item>
                      <Form.Item
                        label="Outside Max:"
                        name={[field.name, "outside_max"]}
                      >
                        <InputNumber disabled />
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
                                    label="Inside Min"
                                  >
                                    <InputNumber placeholder="inside_min" />
                                  </Form.Item>
                                  <Form.Item
                                    label="Inside Max"
                                    name={[subField.name, "inside_max"]}
                                  >
                                    <Input placeholder="inside_max" />
                                  </Form.Item>
                                  <Form.Item
                                      name={[subField.name, "morning"]}
                                      label="Morning"
                                      rules={[
                                        {
                                          required: true,
                                          message: "Please select Mode!",
                                        },
                                      ]}
                                    >
                                      <Select placeholder="Morning">
                                      {optionsArray.map((item, index) => (
                                      <Option key={index} value={item.value}>
                                        {item.label}
                                        </Option>
                                        ))}
                                      </Select>
                                    </Form.Item>
                                    <Form.Item
                                      name={[subField.name, "afternoon"]}
                                      label="Afternoon"
                                      rules={[
                                        {
                                          required: true,
                                          message: "Please select Mode!",
                                        },
                                      ]}
                                    >
                                      <Select placeholder="Afternoon">
                                      {optionsArray.map((item, index) => (
                                      <Option key={index} value={item.value}>
                                        {item.label}
                                        </Option>
                                        ))}
                                      </Select>
                                    </Form.Item>


                                    <Form.Item
                                      name={[subField.name, "evening"]}
                                      label="Evening"
                                      rules={[
                                        {
                                          required: true,
                                          message: "Please select Mode!",
                                        },
                                      ]}
                                    >
                                      <Select placeholder="Evening">
                                      {optionsArray.map((item, index) => (
                                      <Option key={index} value={item.value}>
                                        {item.label}
                                        </Option>
                                        ))}
                                      </Select>
                                    </Form.Item>

                                    <Form.Item
                                      name={[subField.name, "night"]}
                                      label="Night"
                                      rules={[
                                        {
                                          required: true,
                                          message: "Please select Mode!",
                                        },
                                      ]}
                                    >
                                      <Select placeholder="Night">
                                      {optionsArray.map((item, index) => (
                                      <Option key={index} value={item.value}>
                                        {item.label}
                                        </Option>
                                        ))}
                                      </Select>
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

                  {/* <Button type="dashed" onClick={() => add()} block>
                    + Add Radiator Temperature Rule
                  </Button> */}
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
