import React, { useContext } from "react";
import {
  Alert,
  Box,
  Button,
  Divider,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Modal,
  Select,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { getFullName } from "src/_helpers/getFullName";
import { employeeUpdate } from "src/api/employee api/employee";
import { getTeam, updateTeam } from "src/api/teams api/teams";
import { employeeContext } from "src/contexts/EmployeeContext";
import { teamContext } from "src/contexts/TeamsContext";
import { loginContext } from "src/contexts/LoginContext";
import { useSnackbar } from "notistack";
import { projectContext } from "src/contexts/ProjectsContext";
import { addProjectLeader } from "src/api/projects api/projects";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  minWidth: 600,
  bgcolor: "#fff",
  borderRadius: 2,
  border: "none",
  display: "flex",
  flexDirection: "column",
  overflow: "hidden",
  "@media (max-width: 600px)": {
    maxWidth: "80%",
  },
};

const ChangeModal = ({
  modal,
  handleModalClose,
  currMember,
  newRole,
  currTeam,
  prevRole,
}) => {
  const { dispatchEmployeeUpdate } = useContext(employeeContext);
  const { dispatchgetTeam, updatedMember } = useContext(teamContext);
  const { dispatchaddProjectLeader } = useContext(projectContext);
  const { loginC } = useContext(loginContext);
  const [newManager, setNewManager] = React.useState("");
  const [newProject, setNewProject] = React.useState("");
  const { enqueueSnackbar } = useSnackbar();

  const handleChange = (event) => {
    setNewManager(event.target.value);
  };
  const handleProjectChange = (event) => {
    setNewProject(event.target.value);
  };

  const memberRoleCHnage = async () => {
    try {
      const res = await employeeUpdate(
        currMember?._id,
        { role: newRole },
        dispatchEmployeeUpdate
      );
      await getTeam(dispatchgetTeam);
      if (!res.data) {
        throw new Error(res);
      }
      enqueueSnackbar("Role changed", { variant: "success" });
    } catch (err) {
      console.log(err);
      enqueueSnackbar(err.message, { variant: "error" });
    }
  };

  const changeManager = async () => {
    try {
      const data = {
        role: "manager",
      };
      //new manager
      await employeeUpdate(newManager, data, dispatchEmployeeUpdate);
      //changing role of the curr person
      await employeeUpdate(
        currMember._id,
        { role: newRole },
        dispatchEmployeeUpdate
      );

      //updating team
      await updateTeam({ teamId: currTeam._id, newManager: newManager });
      await getTeam(dispatchgetTeam);
    } catch (err) {
      console.log(err);
    }
    enqueueSnackbar(
      updatedMember.error ? updatedMember.error : "Updated Role",
      {
        variant: updatedMember.error ? "info" : "primary",
      }
    );
    handleModalClose();
  };

  const changeProjectLeader = async () => {
    try {
      //new projectLeader
      const data = [newProject, currMember.email];
      const res = await addProjectLeader(data, dispatchaddProjectLeader);
      console.log(res);
      //updating project
      if (!res.data) {
        throw new Error(res);
      }
      enqueueSnackbar(res.error ? res.error : "Updated Role", {
        variant: res.error ? "info" : "primary",
      });
      await getTeam(dispatchgetTeam);
    } catch (err) {
      console.log(err);
      enqueueSnackbar(err.message, { variant: "info" });
    }
    handleModalClose();
  };
  const changeManagerToProjectLeader = async () => {
    changeManager();
    changeProjectLeader();
  };
  console.log(currTeam);
  return (
    <Modal
      open={modal}
      onClose={handleModalClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      sx={{
        border: "none",
      }}
    >
      <Box sx={style}>
        {prevRole === "manager" &&
        newRole !== "projectLeader" &&
        currMember?._id === currTeam?.manager?._id ? (
          <>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                bgcolor: "primary",
                p: 2,
              }}
            >
              <Typography variant="h4" color="primary">
                Assign a new Manager to Team
              </Typography>
              <IconButton>
                <CloseIcon onClick={handleModalClose} />
              </IconButton>
            </Box>
            <Divider />
            <Box
              sx={{
                px: 2,
                py: 1,
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  mt: 1,
                }}
              >
                <FormControl variant="filled" sx={{ m: 1 }} fullWidth>
                  <InputLabel id="demo-simple-select-filled-label">
                    Manager
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-filled-label"
                    id="demo-simple-select-filled"
                    value={newManager}
                    onChange={handleChange}
                  >
                    {currTeam?.members.map((member) => {
                      if (member.role === "employee") {
                        return (
                          <MenuItem value={member._id}>
                            {getFullName(member.firstName, member.lastName)}
                          </MenuItem>
                        );
                      }
                    })}
                  </Select>
                </FormControl>
              </Box>
            </Box>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "end",
                bgcolor: "grey.200",
                p: 2,
              }}
            >
              <Button
                variant="contained"
                color="primary"
                sx={{
                  mr: 2,
                }}
                onClick={changeManager}
              >
                Change Manager
              </Button>
              <Button
                variant="outlined"
                color="primary"
                onClick={handleModalClose}
              >
                Cancel
              </Button>
            </Box>
          </>
        ) : prevRole !== "manager" && newRole === "projectLeader" ? (
          <>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                bgcolor: "primary.lighter",
                p: 2,
              }}
            >
              <Typography variant="h4" color="primary">
                Assign a project
              </Typography>
              <IconButton>
                <CloseIcon onClick={handleModalClose} />
              </IconButton>
            </Box>
            <Divider />
            <Box
              sx={{
                px: 2,
                py: 1,
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  mt: 1,
                }}
              >
                {currMember?.projects.length !== 0 ? (
                  <FormControl variant="filled" sx={{ m: 1 }} fullWidth>
                    <InputLabel id="demo-simple-select-filled-label">
                      Projects
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-filled-label"
                      id="demo-simple-select-filled"
                      value={newProject}
                      onChange={handleProjectChange}
                    >
                      {currMember?.projects.map((project) => {
                        if (
                          project.projectLeader === null ||
                          project.projectLeader === undefined
                        ) {
                          return (
                            <MenuItem value={project._id}>
                              {project.name}
                            </MenuItem>
                          );
                        }
                      })}
                    </Select>
                  </FormControl>
                ) : (
                  <Typography variant="h6" sx={{ color: "inherit" }}>
                    Add employee to a project first
                  </Typography>
                )}
              </Box>
            </Box>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "end",
                bgcolor: "grey.200",
                p: 2,
              }}
            >
              {currMember?.projects.length !== 0 && (
                <Button
                  disabled={newProject === ""}
                  variant="contained"
                  color="primary"
                  sx={{
                    mr: 2,
                  }}
                  onClick={changeProjectLeader}
                >
                  Choose a project
                </Button>
              )}
              <Button
                variant="outlined"
                color="primary"
                onClick={handleModalClose}
              >
                Cancel
              </Button>
            </Box>
          </>
        ) : prevRole === "manager" &&
          newRole === "projectLeader" &&
          currMember?._id === currTeam?.manager?._id ? (
          <>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                bgcolor: "primary.lighter",
                p: 2,
              }}
            >
              <Typography variant="h4" color="primary">
                Choose
              </Typography>
              <IconButton>
                <CloseIcon onClick={handleModalClose} />
              </IconButton>
            </Box>
            <Divider />
            <Box
              sx={{
                px: 2,
                py: 1,
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  mt: 1,
                }}
              >
                <FormControl variant="filled" sx={{ m: 1 }} fullWidth>
                  <InputLabel id="demo-simple-select-filled-label">
                    New Manager for Team
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-filled-label"
                    id="demo-simple-select-filled"
                    value={newManager}
                    onChange={handleChange}
                  >
                    {currTeam?.members.map((member) => {
                      if (member.role === "employee") {
                        return (
                          <MenuItem value={member._id}>
                            {getFullName(member.firstName, member.lastName)}
                          </MenuItem>
                        );
                      }
                    })}
                  </Select>
                </FormControl>
              </Box>
              <Box
                sx={{
                  ml: 2,
                }}
              >
                Select a Project for which you want to make him leader
              </Box>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  mt: 1,
                }}
              >
                <FormControl variant="filled" sx={{ m: 1 }} fullWidth>
                  <InputLabel id="demo-simple-select-filled-label">
                    Project
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-filled-label"
                    id="demo-simple-select-filled"
                    value={newProject}
                    onChange={handleProjectChange}
                  >
                    {currMember?.projects.map((project) => {
                      if (
                        project.projectLeader === null ||
                        project.projectLeader === undefined
                      ) {
                        return (
                          <MenuItem value={project._id}>
                            {project.name}
                          </MenuItem>
                        );
                      }
                    })}
                  </Select>
                </FormControl>
              </Box>
            </Box>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "end",
                bgcolor: "grey.200",
                p: 2,
              }}
            >
              <Button
                variant="contained"
                color="primary"
                sx={{
                  mr: 2,
                }}
                onClick={changeManagerToProjectLeader}
              >
                Continue
              </Button>
              <Button
                variant="outlined"
                color="primary"
                onClick={handleModalClose}
              >
                Cancel
              </Button>
            </Box>
          </>
        ) : (
          <Alert
            severity="warning"
            action={
              <Button color="inherit" size="small" onClick={memberRoleCHnage}>
                continue
              </Button>
            }
          >
            {" "}
            All the data for this role deleted
          </Alert>
        )}
      </Box>
    </Modal>
  );
};

export default ChangeModal;
