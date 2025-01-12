import React, { useEffect, useState } from "react";
import DrinkDetails from "./DrinkDetails";
import { useNavigate } from "react-router-dom";
import { styled } from "@mui/material/styles";
import {
  Card,
  CardHeader,
  CardMedia,
  CardContent,
  CardActions,
  Collapse,
  Grid,
  Typography,
  IconButton,
  Skeleton,
  Grow,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

const Drinks = ({ drinks, drink, handleMouseEnter, handleMouseLeave }) => {
  let navigate = useNavigate();
  const [expanded, setExpanded] = React.useState([]);
  const [loaded, setloaded] = useState(Array(drinks.length).fill(false));

  useEffect(() => {
    setloaded(Array(drinks.length).fill(false));

    return () => {
      setloaded(Array(drinks.length).fill(false));
    };
  }, [drink]);

  const handleExpandClick = (index) => {
    setExpanded((prevState) => {
      const newState = [...prevState];
      newState[index] = !newState[index];
      return newState;
    });
  };

  const showDrinkDetails = (id) => {
    navigate(`${id}`);
  };

  //when image is loaded, then set index to true so the image 'grows' using <Grow> UI
  const handleImageLoaded = (index) => {
    let newLoaded = [...loaded];
    newLoaded[index] = true;
    setloaded(newLoaded);
  };

  return drink.length >= 1 ? (
    drinks ? (
      <Grid
        container
        spacing={{ xs: 2, md: 3 }}
        columns={{ xs: 4, sm: 8, md: 12 }}
      >
        {drinks.map((drink, index) => (
          <Grid
            item
            xs={2}
            sm={4}
            md={4}
            className="card"
            //onClick={() => showDrinkDetails(drink.idDrink)}
            key={drink.idDrink}
          >
            <Grow in={true}>
              <Card
                onLoad={() => {
                  handleImageLoaded(index);
                }}
              >
                <CardMedia
                  component="img"
                  height={"194"}
                  image={drink.strDrinkThumb}
                />
                <CardContent>
                  <Typography variant="body1" color={"black"}>
                    {drink.strDrink}
                  </Typography>
                </CardContent>
                <CardActions disableSpacing>
                  <ExpandMore
                    expand={expanded[index]}
                    onClick={() => handleExpandClick(index)}
                    aria-expanded={expanded[index]}
                    aria-label="show more"
                  >
                    <ExpandMoreIcon />
                  </ExpandMore>
                </CardActions>
                <Collapse
                  in={expanded[index]}
                  timeout="auto"
                  unmountOnExit
                  //component={DrinkDetails}
                >
                  <CardContent>
                    <DrinkDetails id={drink.idDrink}></DrinkDetails>
                  </CardContent>
                </Collapse>
              </Card>
            </Grow>
            {/* <img src={drink.strDrinkThumb} alt="" />
          <h3>{drink.strDrink}</h3> */}
          </Grid>
        ))}
      </Grid>
    ) : (
      <div>No matches found</div>
    )
  ) : (
    <div></div>
  );
};

export default Drinks;
