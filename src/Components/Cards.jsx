import {
  Box,
  Button,
  CardContent,
  Typography,
  Card,
  Grid,
  IconButton,
} from "@mui/material";
import { useEffect, useState } from "react";
import axios from "axios";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";

const Cards = () => {
  const [loading, setLoading] = useState(true);
  const [posts, setPosts] = useState([]);
  const [CurrentPage, setCurrentpage] = useState(1);
  const itemsPerPage = 6;
  const [maxPage, setMaxPage] = useState(3);

  useEffect(() => {
    setTimeout(() => {
      axios
        .get("https://jsonplaceholder.typicode.com/posts")
        .then((response) => {
          console.log(response.data, "data collected");
          setPosts(response.data);
          setLoading(false);
        });
    }, 5000);
  }, []);

  const startIndex = (CurrentPage - 1) * itemsPerPage;
  const CurrentPost = posts.slice(startIndex, startIndex + itemsPerPage);

  const totalPages = Math.ceil(posts.length / itemsPerPage);

  const handlePageChange = (page) => {
    setCurrentpage(page);
    if (page > maxPage) {
      setMaxPage(maxPage + 3);
    }
  };
  console.log(CurrentPost, "post");

  const removeCard = (id) => {
    setPosts((prevPost) => prevPost.filter((post) => post.id !== id));
  };

  const formatToGMT = (dateString) => {
    return new Date(dateString).toUTCString();
  };

  return (
    <Box sx={{ padding: "2rem", textAlign: "center" }}>
      {loading ? (
        <Typography variant="h4">Loading...</Typography>
      ) : (
        <>
          <Grid container spacing={2}>
            {CurrentPost.map((post) => (
              <Grid item xs={12} sm={6} md={4} key={post.id}>
                <Card sx={{ position: "relative", padding: "1rem" }}>
                  <Button
                    onClick={() => removeCard(post.id)}
                    sx={{
                      position: "absolute",
                      top: "5px",
                      right: "5px",
                      backgroundColor: "white",
                      color: "red",
                      minWidth: "30px",
                      height: "30px",
                      borderRadius: "50px",
                      border: "1px red",
                    }}
                  >
                    X
                  </Button>
                  <CardContent>
                    <Typography
                      variant="h6"
                      gutterBottom
                      sx={{
                        color: "black",
                        fontSize: "26px",
                        fontWeight: "700",
                        textAlign: "justify",
                      }}
                    >
                      {post.title.length > 20
                        ? `${post.title.slice(0, 20)}...`
                        : post.title}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{
                        color: "black",
                        fontSize: "16px",
                        textAlign: "justify",
                      }}
                    >
                      {post.body.length > 50
                        ? `${post.body.slice(0, 50)}...`
                        : post.body}
                    </Typography>
                    <Typography
                      variant="caption"
                      display="block"
                      sx={{
                        marginTop: "1rem",
                        textAlign: "justify",
                        fontWeight: "600",
                        color: "grey",
                      }}
                    >
                      {/* {new Date().toDateString()} */}
                      {`${formatToGMT(new Date())}`}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>

          {/*Pagination*/}

          <Box
            sx={{
              marginTop: "2rem",
              display: "flex",
              justifyContent: "center",
              alignContent: "center",
            }}
          >
            {Array.from({
              length: Math.min(3, totalPages - CurrentPage + 1),
            }).map((_, index) => {
              const page = CurrentPage + index;
              return (
                <Button
                  key={page}
                  onClick={() => handlePageChange(page)}
                  sx={{
                    backgroundColor: page === CurrentPage ? "grey" : "white",
                    color: page === CurrentPage ? "white" : "black",
                    margin: "0 5px",
                    minWidth: "40px",
                    borderRadius: "50%",
                    border: "none",
                  }}
                >
                  {page}
                </Button>
              );
            })}

            {CurrentPage + 3 <= totalPages && (
              <IconButton
                onClick={() => handlePageChange(CurrentPage + 3)}
                sx={{ marginLeft: "5px" }}
              >
                <KeyboardDoubleArrowRightIcon />
              </IconButton>
            )}
          </Box>
        </>
      )}
    </Box>
  );
};

export default Cards;
