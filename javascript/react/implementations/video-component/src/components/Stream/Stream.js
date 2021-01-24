import React, { useState, useCallback } from "react";
import styled from "styled-components";

import { Grid, Row, Col } from "react-flexbox-grid";
import { Checkbox } from "components/Checkbox/Checkbox";
import { Input } from "components/Input/Input";
import { Button } from "components/Button/Button";
import { Block } from "baseui/block";
import { FormControl } from "components/FormControl/FormControl";

const Video = styled.video`
  width: 600px;
  height: 375px;
  object-fit: cover;
  background-color: #666;
`;

const getSupportedConstraints = () => {
  const supportedConstraints = navigator.mediaDevices.getSupportedConstraints();
  return supportedConstraints;
};

export const Stream = () => {
  const [isPlayed, setIsPlayed] = useState(false);
  const [constraints, setConstraints] = useState({
    ...getSupportedConstraints(),
    audio: true,
    video: { width: 1280, height: 720 },
  });

  const getStream = useCallback(async () => {
    try {
      if (!navigator || !navigator.mediaDevices) return;
      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      return stream;
    } catch (err) {
      console.log("Failed to get user media: ", err);
      return;
    }
  }, [constraints]);

  const startStreaming = async () => {
    const stream = await getStream();
    if (!stream) return;

    const video = document.querySelector("#videoElement");
    video.srcObject = stream;
    video.play();
    setIsPlayed(true);
  };

  const onContraistChanged = (key, value) => {
    setConstraints({
      ...constraints,
      [key]: value,
    });
  };

  return (
    <>
      <Row>
        <Col>
          <Row>
            <Col>
              <Video controls autoplay="true" id="videoElement"></Video>
            </Col>
          </Row>
          <Row>
            <Col>
              <Button disabled={isPlayed} onClick={startStreaming}>
                Start Streaming
              </Button>
            </Col>
          </Row>
        </Col>
        <Col>
          <Block height="375px" overflow="scroll">
            {Object.keys(constraints).map((key) => {
              const value = constraints[key];
              const isBoolean = typeof value === "boolean";

              return (
                <Block key={key} margin="0px 20px">
                  <ConstranintInput
                    boolean={isBoolean}
                    label={key}
                    value={value}
                    onChange={onContraistChanged}
                  />
                </Block>
              );
            })}
          </Block>
        </Col>
      </Row>
    </>
  );
};

const ConstranintInput = (props) => {
  const { label, value, boolean, onChange } = props;

  if (boolean) {
    return (
      <Checkbox checked={value} onChange={() => onChange(label, !value)}>
        {label}
      </Checkbox>
    );
  }

  if (label === "video") {
    return (
      <FormControl label={() => label}>
        <>
          <Input
            type="number"
            value={value.width}
            onChange={(e) =>
              onChange(label, {
                ...value,
                width: e.target.value,
              })
            }
          ></Input>
          <Input
            type="number"
            value={value.height}
            onChange={(e) =>
              onChange(label, {
                ...value,
                height: e.target.value,
              })
            }
          ></Input>
        </>
      </FormControl>
    );
  }

  return (
    <>
      <h4>{label}</h4>
      <p>{value.toString()}</p>
    </>
  );
};
