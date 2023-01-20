//React
import { useState, useEffect, useContext } from "react";
import { useRouter } from "next/router";

//Material UI
import Typography from "@mui/material/Typography";

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
import ListReports from "../../components/ListReports";

//Styles
import {
  classes,
  Root,
  Main,
  StyledButton,
  Status,
} from "../../styles/reportId.style";

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
  //Router
  const router = useRouter();
  const { reportId } = router.query;

  //useState
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

  //Context
  const { loggedIn } = useContext(UserContext);
  const { categories } = useContext(CategoriesContext);
  const { products, updateProducts } = useContext(ProductsContext);

  //GraphQL
  const { data, loading, error } = useQuery(GET_REPORT, {
    variables: { reportId: reportId },
    skip: !reportId,
  });
  const [submitReport] = useMutation(SUBMIT_REPORT);

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

  const renderedReport = () => {
    return reportList.map((report: IReport) => {
      return <ListReports key={report.categoryName} report={report} />;
    });
  };

  const handleSubmitClick = async () => {
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
            message: response.data.submitReport.error || "Something went wrong",
          });
        }
      }
    } catch (err: any) {
      console.log(err.message);
    }
  };

  const updateProductsToContext = () => {
    if (products) {
      const newProductsList = products.map((product) => {
        return {
          ...product,
          currentAmount: 0,
          previousAmount: product.currentAmount,
        };
      });

      if (updateProducts) updateProducts(newProductsList);
    }
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
        {Boolean(status === "Not Submitted") ? (
          <StyledButton
            variant="contained"
            className={classes.button}
            onClick={() => {
              setSubmitting(true);
              handleSubmitClick();
              updateProductsToContext();
              setSubmitting(false);
            }}
          >
            Submit
          </StyledButton>
        ) : (
          <StyledButton variant="contained" className={classes.button} disabled>
            Submit
          </StyledButton>
        )}
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
