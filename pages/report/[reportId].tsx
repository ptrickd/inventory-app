//React
import { useEffect, useContext } from "react";
import { styled } from "@mui/material/styles";
import { useRouter } from "next/router";

//Material UI
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";

//GraphQL
import { gql, useQuery } from "@apollo/client";

//Date
import { DateTime } from "luxon";

//Context
import { UserContext } from "../../contexts/UserContext";
import { CategoriesContext } from "../../contexts/CategoriesContext";
import { ProductsContext } from "../../contexts/ProductsContext";

const PREFIX = "Report";

const classes = {
  root: `${PREFIX}-root`,
  title: `${PREFIX}-title`,
  date: `${PREFIX}-date`,
  category: `${PREFIX}-category`,
  product: `${PREFIX}-product`,
  categoryDiv: `${PREFIX}-categoryDiv`,
};

const StyledContainer = styled(Container)(({ theme: Theme }) => ({
  [`&.${classes.root}`]: {
    width: "100%",
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
  },

  [`& .${classes.title}`]: {
    marginBottom: 15,
  },

  [`& .${classes.category}`]: {
    backgroundColor: Theme.palette.common.black,
  },

  [`& .${classes.product}`]: {
    width: "100%",
  },

  [`& .${classes.date}`]: {
    marginBottom: 15,
  },
}));

const GET_REPORT = gql`
  query Report($reportId: ID!) {
    report(reportId: $reportId) {
      id
      dateEndingCycle
    }
  }
`;

const Report: React.FC = () => {
  const router = useRouter();
  const { reportId } = router.query;
  const { loggedIn } = useContext(UserContext);
  const { categories } = useContext(CategoriesContext);
  const { products } = useContext(ProductsContext);
  const { data, loading, error } = useQuery(GET_REPORT, {
    variables: { reportId: reportId },
    skip: !reportId,
  });
  // const {
  //   //Aliases for useQuery
  //   data: dataCategories,
  //   loading: loadingCategories,
  //   error: errorCategories,
  // } = useQuery(GET_CATEGORIES);

  useEffect(() => {
    if (!loggedIn) router.push("/");
  }, [loggedIn, router]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error...</p>;
  if (!data) return <p>No data...</p>;
  const date = DateTime.fromISO(data.report.dateEndingCycle);

  const productsByCategory = (categoryId: string) => {
    if (products) {
      return products.map((product: any) => {
        if (categoryId === product.categoryId) {
          console.log(product);
          return (
            <TableBody key={product.id}>
              <TableRow
                key={product.id}
                sx={{
                  "&:last-child td, &:last-child th": { border: 0 },
                }}
              >
                <TableCell component="th" scope="row">
                  {product.name}
                </TableCell>
                <TableCell align="right">{product.currentAmount}</TableCell>
                <TableCell align="right">{product.unit}</TableCell>
              </TableRow>
            </TableBody>
          );
        }
      });
    } else return null;
  };
  const renderedReport = () => {
    if (categories) {
      return categories.map((category: any) => {
        return (
          <Box
            component="div"
            key={category.id}
            className={classes.categoryDiv}
          >
            <TableContainer component={Paper}>
              <Table aria-label="report table">
                <TableHead className={classes.category}>
                  <TableRow>
                    <TableCell>{category.name}</TableCell>
                    <TableCell align="right">Current Amount</TableCell>
                    <TableCell align="right">Unit</TableCell>
                  </TableRow>
                </TableHead>
                {productsByCategory(category.id)}
              </Table>
            </TableContainer>
          </Box>
        );
      });
    } else return null;
  };

  return (
    <StyledContainer className={classes.root}>
      <Typography className={classes.title} variant="h3" align="center">
        Report
      </Typography>
      <Typography className={classes.date} variant="h6" align="center">
        {date.toFormat("dd MMMM, yyyy")}
      </Typography>

      {renderedReport()}
    </StyledContainer>
  );
};

export default Report;
