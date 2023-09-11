import { Container, Text } from "@mantine/core";
import { useStyles } from "./styles";
import { useNavigate } from "react-router-dom";
import { routeNames } from "../../Routes/routeNames";

const Card = ({ data }) => {
  const { classes } = useStyles();
  const navigate = useNavigate();

  const handleClick = () => {
    if (data.label === "Services") navigate(routeNames.general.viewService);
    else if (data.label === "Projects")
      navigate(routeNames.general.viewProjects);
    else if (data.label === "Products")
      navigate(routeNames.general.viewProducts);
    else if (data.label === "Job Applications")
      navigate(routeNames.general.jobApplications);
    else if (data.label === "Jobs") navigate(routeNames.general.viewJobs);
    else if (data.label === "Testimonials")
      navigate(routeNames.general.viewTestimonial);
    else if (data.label === "Team Members")
      navigate(routeNames.general.viewTeams);
    else if (data.label === "Blogs") navigate(routeNames.general.viewBlogs);
    else return;
  };
  return (
    <Container className={classes.card} onClick={handleClick}>
      <Text fz="1.3rem" fw={"bold"} align="center">
        {data?.label}
      </Text>
      <Text fz="30px" fw={"bold"}>
        {data?.value}
      </Text>
    </Container>
  );
};
export default Card;
