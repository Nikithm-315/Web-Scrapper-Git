import { useParams } from "react-router-dom";
import {
  Box,
  Typography,
  Card,
  Stack,
  Divider,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Avatar,
  Link,
} from "@mui/material";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import data from "../data/dummy.json";
import RepoCard from "./RepoCard";

export default function RepoDetails() {
  const { repoId } = useParams();
  const repo = data.items.find((item) => item.id === Number(repoId));

  if (!repo) {
    return <Typography>Repository not found.</Typography>;
  }

  const calculatePluggabilityScore = () => {
    return 100;
  };

  const calculateExtensibilityScore = () => {
    return 100;
  };
  const dateStr = repo.updated_at;
  const date = new Date(dateStr);

  // Options for formatting the date
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    timeZoneName: "short",
  };

  // Convert to human-readable format
  const humanReadableDate = date.toLocaleString("en-US", options);
  console.log(humanReadableDate);

  return (
    <Box display="flex" flexDirection="row" p={2}>
      <Box flex={1} p={2}>
        <Box p={2}>
          <Typography variant="h5">{repo.name}</Typography>
          <Typography variant="body1">{repo.description}</Typography>
          <Stack spacing={1} direction="column" mt={2}>
            {/* use card instead of chip  */}
            <RepoCard
              heading="Pluggability"
              score={calculatePluggabilityScore()}
            />
            <RepoCard
              heading="Extensibility"
              score={calculateExtensibilityScore()}
            />
            <RepoCard
              heading="Support"
              content={"last_updated at :"+ humanReadableDate}
            />
            {/* access "html_url" of owner and make the content a Link component to that user */}
            <RepoCard
              heading="Origin and Pedigree"
              content={<Box><Avatar src={repo.owner.avatar_url} /> <Link href={repo.owner.url} >{repo.owner.login}</Link></Box>}
            />
            <RepoCard
              heading="License"
              content={repo.license?.name}
            />
          </Stack>
        </Box>
      </Box>
      <Box flex={2} p={2} maxHeight={"100vh"}>
        <Card>
          <Box p={2}>
            <Typography variant="h5">Dependency Tree</Typography>
            <Divider />
            <Box mt={2}>
              <Accordion>
                <AccordionSummary
                  expandIcon={<ArrowDropDownIcon />}
                  aria-controls="panel1-content"
                  id="panel1-header"
                >
                  <Typography>Dependency 1</Typography>
                </AccordionSummary>
              </Accordion>
              <Accordion>
                <AccordionSummary
                  expandIcon={<ArrowDropDownIcon />}
                  aria-controls="panel2-content"
                  id="panel2-header"
                >
                  <Typography>Dependency 2</Typography>
                </AccordionSummary>
              </Accordion>
              <Accordion>
                <AccordionSummary
                  expandIcon={<ArrowDropDownIcon />}
                  aria-controls="panel3-content"
                  id="panel3-header"
                >
                  <Typography>Dependency 3</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Accordion>
                    <AccordionSummary
                      expandIcon={<ArrowDropDownIcon />}
                      aria-controls="subpanel1-content"
                      id="subpanel1-header"
                    >
                      <Typography>Sub Dependency 3.1</Typography>
                    </AccordionSummary>
                  </Accordion>
                  <Accordion>
                    <AccordionSummary
                      expandIcon={<ArrowDropDownIcon />}
                      aria-controls="subpanel2-content"
                      id="subpanel2-header"
                    >
                      <Typography>Sub Dependency 3.2</Typography>
                    </AccordionSummary>
                  </Accordion>
                </AccordionDetails>
              </Accordion>
            </Box>
          </Box>
        </Card>
      </Box>
    </Box>
  );
}
