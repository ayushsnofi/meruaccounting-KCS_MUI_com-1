/* eslint-disable consistent-return */
import React, { useContext, useEffect, useState } from "react";
import { Paper, Typography, Button } from "@mui/material";
import { TreeItem, TreeView } from "@mui/lab";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { makeStyles } from "@mui/styles";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { ClientsContext } from "../../contexts/ClientsContext";
import { projectContext } from "../../contexts/ProjectsContext";
import SearchBar from "../SearchBar";
import { getClientProjects, getClient } from "../../api/clients api/clients";
import { createProject } from "../../api/projects api/projects";
import Header from "./Header";
//-------------------------------------------------------------------------------------------------------------------
const useStyles = makeStyles((theme) => ({
  root: {},
}));

export default function Sidebar() {
  const classes = useStyles();
  // state variable for input box to pass in as the new client value.
  const [newClientValue, setnewClientValue] = useState();
  const [newClientError, setnewClientError] = useState(false);
  const [newProjectValue, setnewProjectValue] = useState();
  // contexts
  const {
    clients,
    currentClient,
    changeClient,
    addClient,
    currentProject,
    changeProject,
    client,
    clientDetails,
    dispatchClientDetails,
    clientProjectDetails,
    dispatchClientProjectDetails,
  } = useContext(ClientsContext);
  // const [currentClient, changeClient] = useState("");
  // const [currentProject, changeProject] = useState("");
  const { dispatchCreateProject } = useContext(projectContext);
  const [expanded, setExpanded] = React.useState([]);
  const [selected, setSelected] = React.useState([]);

  useEffect(async () => {
    await getClient(dispatchClientDetails);
  }, []);
  let clientsList = [];

  if (clientDetails.loader === false) {
    clientsList = clientDetails?.client?.data;
  }
  // useEffect(() => {
  //   try {
  //     if (clientDetails !== null) {
  //       changeClient(clientDetails?.client?.data[0]);
  //       changeProject(clientDetails?.client?.data[0].projects[0]);
  //     }
  //     changeClient(
  //       clientDetails?.client?.data[
  //         clientDetails.client.data.indexOf(currentClient)
  //       ]
  //     );
  //     changeProject(
  //       clientDetails?.client?.data[
  //         clientDetails.client.data.indexOf(currentClient)
  //       ].projects[currentClient.projects.indexOf(currentProject)]
  //     );
  //   } catch (error) {
  //     console.log(error.message);
  //   }
  // }, [clientDetails]);
  const projectList = [];
  useEffect(() => {
    if (clientDetails.loader === false) {
      clientDetails?.client?.data.map((client) => {
        client.projects.map((pro) => {
          projectList.push(client.name + ":" + pro.name);
        });
      });
    }
  }, [clientDetails, currentClient, currentProject]);
  // useEffect(() => {
  //   getClientProjects(
  //     { clientId: currentClient._id },
  //     dispatchClientProjectDetails
  //   );
  // }, [checkclientDetails]);
  // change currentclient on search
  // console.log(currentClient, currentProject);
  const differentiateFunction = (str) => {
    if (str !== null) {
      return str.split(":");
    }

    // return arr;
  };

  const handleSearch = (e, value) => {
    try {
      const val = differentiateFunction(value);
      if (val !== null) {
        const client = clientsList?.filter((client) =>
          client.name === val[0] ? client : ""
        );
        setExpanded((oldExpanded) => [`${client[0]._id}`]);
        const project = client[0].projects?.filter((pro) =>
          pro.name == val[1] ? pro : ""
        );
        if (client.length === 0) {
          // eslint-disable-next-line no-useless-return
          return;
        }
        setnewProjectValue(project[0]);

        changeProject(project[0]);
        setSelected((oldSelected) => [`${project[0]._id + client[0]._id}`]);
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  // change currenclient on projects name click
  const handleClick = (e) => {
    const client = clientsList.filter((client) =>
      client.name === e.target.textContent ? client : ""
    );
    setnewClientValue(client[0]);

    changeClient(client[0]);
  };
  const handleProjectClick = (e) => {
    const client = clientsList.filter((client) =>
      client.name === e.target.dataset.client ? client : ""
    );
    changeClient(client[0]);
    setnewClientValue(client[0]);
    const project = client[0].projects.filter((project) =>
      project.name === e.target.dataset.project ? project : ""
    );
    setnewProjectValue(project[0]);
    changeProject(project[0]);
  };
  // add client in submit
  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      setnewClientError(false);
      if (newProjectValue === "" || currentClient === null) {
        setnewClientError(true);
        return;
      }
      if (currentClient !== null) {
        const data = { name: newProjectValue, clientId: currentClient._id };
        await createProject(data, dispatchCreateProject);
        await getClient(dispatchClientDetails);
      }
    } catch (error) {
      console.log("Choose A client ,to be display in popup");
    }
  };

  return (
    <Box
      component="div"
      sx={{
        margin: "10px",
        // height: "70vh",
        flexGrow: "1",
        display: "flex",
        flexDirection: "row",
      }}
    >
      <Paper
        component="div"
        elevation={3}
        sx={{
          overflow: "hidden",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          // position: "relative",
        }}
      >
        {/* search box */}
        <Box
          sx={{ display: "flex", flexDirection: "row", alignItems: "center" }}
        >
          <SearchBar
            handleSearch={handleSearch}
            label="Search Project"
            options={projectList}
          />
        </Box>

        {/* clients and project tree view flex container */}
        <Box
          component="div"
          sx={{
            display: "flex",
            flexDirection: "column",
            flexGrow: "1",
            alignItems: "flex-start",
            overflowY: "auto",
          }}
        >
          <TreeView
            aria-label="file system navigator"
            defaultCollapseIcon={<ExpandMoreIcon />}
            defaultExpandIcon={<ChevronRightIcon />}
            sx={{
              height: 240,
              flexGrow: 1,
              // maxWidth: 400,
              overflowY: "auto",
              width: "100%",
            }}
            className={classes.root}
            expanded={expanded}
            selected={selected}
          >
            {clientsList?.length > 0 &&
              clientsList.map((client) => (
                <TreeItem
                  nodeId={client._id.toString()}
                  label={<Typography variant="h6">{client.name}</Typography>}
                  key={client._id}
                  onClick={handleClick}
                  id={client._id}
                >
                  {client.projects.map((project) => {
                    return (
                      <TreeItem
                        nodeId={(project._id + client._id).toString()}
                        id={project._id}
                        key={project._id}
                        label={
                          <Typography
                            data-client={client.name}
                            data-project={project.name}
                            onClick={handleProjectClick}
                            variant="body1"
                          >
                            {project.name}
                          </Typography>
                        }
                        id={project._id}
                      />
                    );
                  })}
                </TreeItem>
              ))}
          </TreeView>
        </Box>

        <Box
          sx={{
            boxSizing: "border-box",
            width: "95%",
            "& > :not(style)": { m: 1 },
          }}
        >
          <form
            onSubmit={handleSubmit}
            noValidate
            autoComplete="off"
            style={{ width: "100%" }}
          >
            <TextField
              onChange={(e) => setnewProjectValue(e.target.value)}
              required
              fullWidth
              label="Add new project"
              error={newClientError}
              sx={{}}
            />

            <Button fullWidth type="submit" variant="contained" sx={{ mt: 1 }}>
              Add
            </Button>
          </form>
        </Box>
      </Paper>
      <Header
        clientsList={clientsList}
        currentClient={newClientValue}
        currentProject={newProjectValue}
        setcurrClient={changeClient}
        setCurrProjct={changeProject}
      />
    </Box>
  );
}
