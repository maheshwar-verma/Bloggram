import React, { useEffect, useState } from "react";
import Img from "../../assets/Bloggram_placeholder.png";
import {
  Avatar as MuiAvatar,
  Button,
  Card,
  CardContent,
  IconButton,
  Modal,
  Typography,
  Box,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import LinesEllipsis from "react-lines-ellipsis";
import { apiUsers } from "../../services/models/UserModel";
import Avatar from "avataaars";
import IosShareIcon from "@mui/icons-material/IosShareRounded";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { ShareSocial } from "react-share-social";

const BlogCard = ({ blog }) => {
  const navigate = useNavigate();

  const [user, setUser] = useState({
    name: "",
    avatar: {
      // topType: "LongHairMiaWallace",
      // accessoriesType: "Prescription02",
      // hairColor: "BrownDark",
      // facialHairType: "Blank",
      // clotheType: "Hoodie",
      // clotheColor: "PastelBlue",
      // eyeType: "Happy",
      // eyebrowType: "Default",
      // mouthType: "Smile",
      // skinColor: "Light",
    },
    date: "",
  });

  useEffect(() => {
    const ac = new AbortController();
    apiUsers.getSingle(blog.userId, ac.signal).then((res) => {
      if (res.status === "200") {
        setUser(res.message);
      }
    });

    return () => {
      ac.abort();
    };
  }, [blog.userId]);

  return (
    <React.Fragment>
      <Card sx={{ height: "500px" }}>
        <img
          src={blog.image ? blog.image : Img}
          alt=""
          style={{ width: "100%", height: "200px", objectFit: "cover" }}
        />
        <CardContent className="mt-3">
          <div className="d-flex align-items-center">
            {user.avatar === undefined || user.avatar === {} ? (
              <MuiAvatar src="/broke.img" sx={{ width: 30, height: 30 }} />
            ) : (
              <Avatar
                style={{ width: 30, height: 30 }}
                avatarStyle="Circle"
                topType={user?.avatar?.topType}
                accessoriesType={user?.avatar?.accessoriesType}
                hairColor={user?.avatar?.hairColor}
                facialHairType={user?.avatar?.facialHairType}
                clotheType={user?.avatar?.clotheType}
                clotheColor={user?.avatar?.clotheColor}
                eyeType={user?.avatar?.eyeType}
                eyebrowType={user?.avatar?.eyebrowType}
                mouthType={user?.avatar?.mouthType}
                skinColor={user?.avatar?.skinColor}
              />
            )}
            <small className="mb-0 fst-italic text-muted ms-2">
              {user?.name}
            </small>{" "}
          </div>
          <Typography variant="h5" className="my-3">
            <LinesEllipsis
              text={blog?.title}
              maxLine="1"
              ellipsis="..."
              trimRight
              basedOn="letters"
            />
          </Typography>
          <Typography variant="h6" style={{ fontWeight: 400 }}>
            <LinesEllipsis
              text={blog?.desc}
              maxLine="3"
              ellipsis="..."
              trimRight
              basedOn="letters"
            />
          </Typography>
          <div className="text-end my-2">
            {blog.type === "PUBLISHED" && (
              <small className="mb-0 fw-light text-muted ms-2">
                Published on {user?.date}
              </small>
            )}
          </div>
          <div
            className="text-center"
            onClick={() => navigate(`/blog/${blog._id}`)}
          >
            <Button variant="outlined" size="small">
              Read More
            </Button>
          </div>
        </CardContent>
      </Card>
    </React.Fragment>
  );
};

const BlogList = ({ blog }) => {
  const navigate = useNavigate();

  const [user, setUser] = useState({
    name: "",
    avatar: {
      // topType: "LongHairMiaWallace",
      // accessoriesType: "Prescription02",
      // hairColor: "BrownDark",
      // facialHairType: "Blank",
      // clotheType: "Hoodie",
      // clotheColor: "PastelBlue",
      // eyeType: "Happy",
      // eyebrowType: "Default",
      // mouthType: "Smile",
      // skinColor: "Light",
    },
    date: "",
  });

  useEffect(() => {
    const ac = new AbortController();
    apiUsers.getSingle(blog.userId, ac.signal).then((res) => {
      if (res.status === "200") {
        setUser(res.message);
      }
    });

    return () => {
      ac.abort();
    };
  }, [blog.userId]);

  const [open, setOpen] = React.useState(false);

  const gotoBlog = () => navigate(`/blog/${blog._id}`);

  return (
    <React.Fragment>
      <Card
        sx={{
          boxShadow: "none",
          borderBottom: "1px solid rgb(148, 164, 196)",
          width: "100%",
          borderBottomRightRadius: 0,
          borderBottomLeftRadius: 0,
          cursor: "pointer",
        }}
      >
        <CardContent className="mt-3 d-flex align-items-center">
          <img
            src={blog.image ? blog.image : Img}
            alt=""
            style={{ width: 100, height: 100, objectFit: "cover" }}
            className="me-4"
            onClick={gotoBlog}
          />
          <div className="w-100">
            <Typography variant="h5" className="mt-3 mb-1" onClick={gotoBlog}>
              {blog?.title}
            </Typography>
            <Typography
              variant="h6"
              style={{ fontWeight: 400 }}
              className="mb-2"
              onClick={gotoBlog}
            >
              <LinesEllipsis
                text={blog?.desc}
                maxLine="3"
                ellipsis="..."
                trimRight
                basedOn="letters"
              />
            </Typography>
            <div className="d-flex justify-content-between w-100">
              <div className="d-flex align-items-center">
                {user.avatar === undefined || user.avatar === {} ? (
                  <MuiAvatar src="/broke.img" sx={{ width: 30, height: 30 }} />
                ) : (
                  <Avatar
                    style={{ width: 30, height: 30 }}
                    avatarStyle="Circle"
                    topType={user?.avatar?.topType}
                    accessoriesType={user?.avatar?.accessoriesType}
                    hairColor={user?.avatar?.hairColor}
                    facialHairType={user?.avatar?.facialHairType}
                    clotheType={user?.avatar?.clotheType}
                    clotheColor={user?.avatar?.clotheColor}
                    eyeType={user?.avatar?.eyeType}
                    eyebrowType={user?.avatar?.eyebrowType}
                    mouthType={user?.avatar?.mouthType}
                    skinColor={user?.avatar?.skinColor}
                  />
                )}
                <small className="mb-0 fst-italic text-muted ms-2">
                  {user?.name}
                </small>{" "}
                .
                {blog.type === "PUBLISHED" && (
                  <small className="mb-0 fw-light text-muted ms-2">
                    Published on {user?.date}
                  </small>
                )}
              </div>
              <div>
                <IconButton aria-label="share" onClick={() => setOpen(true)}>
                  <IosShareIcon />
                </IconButton>
                <IconButton aria-label="menu">
                  <MoreHorizIcon />
                </IconButton>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      <SocialModal
        open={open}
        setOpen={setOpen}
        url={`http://localhost:3001/blog/${blog._id}`}
        name={blog.title}
      />
    </React.Fragment>
  );
};

export { BlogCard, BlogList };

const SocialModal = ({ open, setOpen, url, name }) => {
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    maxWidth: 400,
    minWidth: "30%",
    bgcolor: "background.paper",
    boxShadow: 24,
  };

  const handleClose = () => setOpen(false);

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <ShareSocial
          title={`Hello folks I have published ${name}`}
          url={url}
          socialTypes={["facebook", "twitter", "reddit", "linkedin"]}
        />
      </Box>
    </Modal>
  );
};
