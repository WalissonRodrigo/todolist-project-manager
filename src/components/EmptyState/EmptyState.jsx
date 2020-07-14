import React from "react";
import PropTypes from "prop-types";

import { Box, Typography } from "@material-ui/core";

const BoxContent = (props) => {
  let imageWidth;
  let imageHeight;
  let variant;

  switch (props.size) {
    case "small":
      imageWidth = 40;
      imageHeight = 40;
      variant = "h6";
      break;

    case "medium":
      imageWidth = 60;
      imageHeight = 60;
      variant = "h5";
      break;

    case "large":
      imageWidth = 100;
      imageHeight = 100;
      variant = "h4";
      break;

    default:
      imageWidth = 70;
      imageHeight = 70;
      variant = "h5";
      break;
  }
  return (
    <span>
      {props.image && (
        <Box
          clone
          mb={props.title || props.description ? 2 : 0}
          width={`${imageWidth}%`}
          height={`${imageHeight}%`}
        >
          {props.image}
        </Box>
      )}

      {props.title && (
        <Box mb={!props.description && props.button ? 2 : 0}>
          <Typography variant={variant}>{props.title}</Typography>
        </Box>
      )}

      {props.description && (
        <Box mb={props.button && 2}>
          <Typography variant="body1">{props.description}</Typography>
        </Box>
      )}

      {props.button}
    </span>
  );
};

function EmptyState(props) {
  if (props.type === "page") {
    return (
      <Box
        style={{ transform: "translate(-50%, -50%)" }}
        position="absolute"
        top="50%"
        left="50%"
        textAlign="center"
      >
        <BoxContent {...props} />
      </Box>
    );
  }

  if (props.type === "card") {
    return (
      <Box padding={props.padding} textAlign="center">
        <BoxContent {...props} />
      </Box>
    );
  }

  return null;
}

EmptyState.defaultProps = {
  type: "page",
  size: "medium",
  padding: 2,
};

EmptyState.propTypes = {
  type: PropTypes.string,
  size: PropTypes.string,
  padding: PropTypes.number,

  image: PropTypes.element,
  title: PropTypes.string,
  description: PropTypes.string,
  button: PropTypes.element,
};

export default EmptyState;
