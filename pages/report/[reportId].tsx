//React
import { useState, useEffect, useContext } from "react";
import { useRouter } from "next/router";

//Material UI

import { styled } from "@mui/material/styles";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

//GraphQL
import { gql, useQuery, useMutation } from "@apollo/client";

//Date
import { DateTime } from "luxon";

//Context
import { UserContext } from "../../contexts/UserContext";
import { CategoriesContext } from "../../contexts/CategoriesContext";
import { ProductsContext } from "../../contexts/ProductsContext";

//Component
import Footer from "../../Layout/Footer";
import WaitingModal from "../../components/WaitingModal";
import MessageModal from "../../components/MessageModal";

const PREFIX = "Report";

const classes = {
  root: `${PREFIX}-root`,
  main: `${PREFIX}-main`,
  title: `${PREFIX}-title`,
  date: `${PREFIX}-date`,
  category: `${PREFIX}-category`,
  product: `${PREFIX}-product`,
  categoryDiv: `${PREFIX}-categoryDiv`,
  button: `${PREFIX}-button`,
  status: `${PREFIX}-status`,
};

const Root = styled(Container)(({ theme: Theme }) => ({
  [`&.${classes.root}`]: {
    display: "flex",
    minHeight: "calc(100vh - 120px)",
    flexDirection: "column",
    width: "100%",
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

const Main = styled(Box)(() => ({
  [`&.${classes.main}`]: {
    display: "flex",
    flexDirection: "column",
    marginTop: "15%",
    marginBottom: "10%",
    width: "100%",
    minHeight: "70vh",
    alignContent: "space-between",
  },
}));

const StyledButton = styled(Button)(() => ({
  [`&.${classes.button}`]: {
    width: "70%",
    alignSelf: "center",
    marginTop: 10,
  },
}));

const Status = styled(Typography)(() => ({
  [`&.${classes.status}`]: {
    marginBottom: 10,
  },
}));

//GraphQl Query
const GET_REPORT = gql`
  query Report($reportId: ID!) {
    report(reportId: $reportId) {
      id
      dateEndingCycle
      hasBeenSubmitted
    }
  }
`; //
const SUBMIT_REPORT = gql`
  mutation SubmitReport($reportId: ID!) {
    submitReport(reportId: $reportId) {
      success
      error
    }
  }
`;

// Types

interface IProduct {
  id: string;
  name: string;
  currentAmount: number;
  previousAmount: number;
  unit: string;
}
interface IReport {
  categoryName: string;
  productsList: IProduct[] | [];
}

interface IServerResponse {
  message: null | string;
  isSuccess: boolean;
  isError: boolean;
}

const Report: React.FC = () => {
  const router = useRouter();
  const [reportList, setReportList] = useState<[] | IReport[]>([]);
  const [submitting, setSubmitting] = useState(false);
  const [serverResponse, setServerResponse] = useState<IServerResponse>({
    message: null,
    isSuccess: false,
    isError: false,
  });
  const [status, setStatus] = useState<"Not Submitted" | "Submitted">(
    "Not Submitted"
  );
  const { reportId } = router.query;
  const { loggedIn } = useContext(UserContext);
  const { categories } = useContext(CategoriesContext);
  const { products } = useContext(ProductsContext);
  const { data, loading, error } = useQuery(GET_REPORT, {
    variables: { reportId: reportId },
    skip: !reportId,
  });
  const [submitReport, { data: dataSubmitReport }] = useMutation(SUBMIT_REPORT);

  //Update status
  useEffect(() => {
    if (data && data.report.hasBeenSubmitted) setStatus("Submitted");
  }, [data]);

  //Create list in useEffect to limit computation on rerender
  useEffect(() => {
    const newReportList = categories?.map((category) => {
      const listProductsByCategory: IProduct[] = [];

      products?.forEach((product) => {
        if (category.id === product.categoryId) {
          if (
            product.id !== undefined &&
            product.name !== undefined &&
            product.currentAmount !== undefined &&
            product.previousAmount !== undefined &&
            product.unit !== undefined
          ) {
            listProductsByCategory.push({
              id: product.id,
              name: product.name,
              currentAmount: product.currentAmount,
              previousAmount: product.previousAmount,
              unit: product.unit,
            });
          }
        }
      });
      return {
        categoryName: category.name,
        productsList: listProductsByCategory,
      };
    });

    if (newReportList !== undefined) setReportList(newReportList);
    else setReportList([]);
  }, [categories, products, setReportList]);

  useEffect(() => {
    if (!loggedIn) router.push("/");
  }, [loggedIn, router]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error...</p>;
  if (!data) return <p>No data...</p>;
  const date = DateTime.fromISO(data.report.dateEndingCycle);

  const handleCloseMessageModal = () => {
    setServerResponse({
      message: null,
      isSuccess: false,
      isError: false,
    });
  };

  const productsByCategory = (productList: IProduct[]) => {
    return productList.map((product: IProduct) => {
      return (
        <TableBody key={product.name}>
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
            <TableCell align="right">{product.previousAmount}</TableCell>

            <TableCell align="right">{product.unit}</TableCell>
          </TableRow>
        </TableBody>
      );
    });
  };
  const renderedReport = () => {
    return reportList.map((report: IReport) => {
      return (
        <Box
          component="div"
          key={report.categoryName}
          className={classes.categoryDiv}
        >
          <TableContainer component={Paper}>
            <Table aria-label="report table">
              <TableHead className={classes.category}>
                <TableRow>
                  <TableCell>{report.categoryName}</TableCell>
                  <TableCell align="right">Current </TableCell>
                  <TableCell align="right">Last</TableCell>
                  <TableCell align="right">Unit</TableCell>
                </TableRow>
              </TableHead>
              {productsByCategory(report.productsList)}
            </Table>
          </TableContainer>
        </Box>
      );
    });
  };

  return (
    <Root className={classes.root}>
      <Main component="div" className={classes.main}>
        <Typography className={classes.title} variant="h3" align="center">
          Report
        </Typography>
        <Typography className={classes.date} variant="h6" align="center">
          {date.toFormat("dd MMMM, yyyy")}
        </Typography>
        <Status className={classes.status} variant="body1" align="center">
          Status: {status}
        </Status>
        {renderedReport()}
        <StyledButton
          variant="contained"
          className={classes.button}
          onClick={async (event) => {
            setSubmitting(true);
            try {
              if (reportId) {
                let response = await submitReport({
                  variables: { reportId },
                });
                if (response.data.submitReport.success) {
                  setStatus("Submitted");
                  setServerResponse({
                    ...serverResponse,
                    isSuccess: true,
                    message: "This report has been successfully submit!",
                  });
                } else {
                  setServerResponse({
                    ...serverResponse,
                    isError: true,
                    message:
                      response.data.submitReport.error ||
                      "Something went wrong",
                  });
                }
              }
            } catch (err: any) {
              console.log(err.message);
            }
            setSubmitting(false);
          }}
        >
          Submit
        </StyledButton>
        <WaitingModal open={submitting} />
        <MessageModal
          open={Boolean(typeof serverResponse.message === "string")}
          message={serverResponse.message || ""}
          isError={serverResponse.isError}
          handleClick={handleCloseMessageModal}
        />
      </Main>
      <Footer />
    </Root>
  );
};

export default Report;
