//React
import { useState, useEffect, useContext } from "react";
import { useRouter } from "next/router";

//Material UI
import Typography from "@mui/material/Typography";

//GraphQL
import { useQuery, useMutation } from "@apollo/client";

//Date
import { DateTime } from "luxon";

//Context
import { UserContext } from "../../contexts/UserContext";
import { ProductsContext } from "../../contexts/ProductsContext";
import { ReportsContext } from "../../contexts/ReportsContext";

//Component
import Footer from "../../Layout/Footer";
import WaitingModal from "../../components/WaitingModal";
import MessageModal from "../../components/MessageModal";
import UserChoiceModal from "../../components/UserChoiceModal";
import SubmitReportButton from "../../components/SubmitReportButton";
import RenderReport from "../../components/RenderReport";

//Styles
import { classes, Root, Main, Status } from "../../styles/reportId.style";

//GraphQl Query
import {
  GET_REPORT,
  SUBMIT_REPORT,
  DELETE_REPORT,
} from "../../queries/reportId.queries";

// Types
import { ISubmittedProduct, IServerResponse } from "../../types/reportId.types";
//next task split
const Report: React.FC = () => {
  //Router
  const router = useRouter();
  const { reportId } = router.query;

  //useState
  const [submitting, setSubmitting] = useState(false);

  const [serverResponse, setServerResponse] = useState<IServerResponse>({
    message: null,
    isSuccess: false,
    isError: false,
  });
  const [status, setStatus] = useState<"Not Submitted" | "Submitted">(
    "Not Submitted"
  );
  const [openUserChoiceModal, setOpenUserChoiceModal] = useState(false);
  const [submittedProductList, setSubmittedProductList] = useState<
    ISubmittedProduct[] | []
  >([]);

  //Context
  const { loggedIn } = useContext(UserContext);
  const { products, updateProducts } = useContext(ProductsContext);
  const { deleteLocalReport } = useContext(ReportsContext);

  //GraphQL
  const { data, loading, error } = useQuery(GET_REPORT, {
    variables: { reportId: reportId },
    skip: !reportId,
  });

  const [submitReport] = useMutation(SUBMIT_REPORT);
  const [deleteReport] = useMutation(DELETE_REPORT, {
    variables: { reportId },
  });

  //Update status
  useEffect(() => {
    if (data && data.report.hasBeenSubmitted) {
      setStatus("Submitted");
      //format the data received from reports to be compatible with IProductByCategory
      //report data report.products

      setSubmittedProductList(data.report.products);
    }
  }, [data]);

  //block access to the page
  useEffect(() => {
    if (!loggedIn) router.push("/");
  }, [loggedIn, router]);

  //to do: add component to handle the following if's
  if (loading || !data) return <p>Loading...</p>;
  if (error) return <p>Error...</p>;
  if (typeof reportId !== "string") return <p>Error</p>;
  const date = DateTime.fromISO(data.report.dateEndingCycle);

  const handleCloseMessageModal = () => {
    const message = serverResponse.message;
    setServerResponse({
      message: null,
      isSuccess: false,
      isError: false,
    });
    if (message === "This report has been successfully deleted!") {
      // change page after clicking the message modal
      //only go that route if successfully delete
      router.push("/dashboard");
    }
  };
  const handleCloseUserChoiceModal = () => {
    setOpenUserChoiceModal(false);
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
          setSubmittedProductList(response.data.submitReport.products);
        } else {
          setServerResponse({
            ...serverResponse,
            isError: true,
            message: response.data.submitReport.error || "Something went wrong",
          });
        }
      }
    } catch (err: any) {
      //should show message to the user
      console.error(err.message);
    }
  };

  const updateProductsToContext = () => {
    if (products) {
      const newProductsList = products.map((product) => {
        const newCategories = product.categories.map((category) => {
          return {
            ...category,
            currentAmount: 0,
            previousAmount: category.currentAmount,
          };
        });
        return {
          ...product,
          categories: newCategories,
        };
      });

      if (updateProducts) updateProducts(newProductsList);
    }
  };
  const handleDeleteClick = async () => {
    setOpenUserChoiceModal(true);
  };

  const handleUserResponseOnDelete = async (choice: boolean) => {
    setSubmitting(true);
    if (choice) {
      try {
        const response = await deleteReport();

        if (response.data.deleteReport.success) {
          setServerResponse({
            ...serverResponse,
            isSuccess: true,
            message: "This report has been successfully deleted!",
          });
        } else {
          setServerResponse({
            ...serverResponse,
            isError: true,
            message: response.data.deleteReport.error || "Something went wrong",
          });
        }
        if (deleteLocalReport && typeof reportId === "string") {
          deleteLocalReport(reportId);
        }

        updateProductsToContext();
        setOpenUserChoiceModal(false);
      } catch (err: any) {
        //should show error to the user
        console.error(err.message);
      }
    } else {
      //close modal
      setOpenUserChoiceModal(false);
    }

    setSubmitting(false);
  };

  return (
    <Root className={classes.root} maxWidth="xs">
      <Main className={classes.main}>
        <Typography className={classes.title} variant="h3" align="center">
          Report
        </Typography>
        <Typography
          className={classes.date}
          variant="h6"
          align="center"
          data-testid={"date"}
        >
          {date.toFormat("dd MMMM, yyyy")}
        </Typography>
        <Status className={classes.status} variant="body1" align="center">
          Status: {status}
        </Status>

        <RenderReport
          status={status}
          reportId={reportId}
          submittedProductList={submittedProductList}
        />
        <SubmitReportButton
          status={status}
          handleSubmitClick={handleSubmitClick}
          handleDeleteClick={handleDeleteClick}
        />
        <WaitingModal open={submitting} />
        <MessageModal
          open={Boolean(typeof serverResponse.message === "string")}
          message={serverResponse.message || ""}
          isError={serverResponse.isError}
          handleClick={handleCloseMessageModal}
        />
        <UserChoiceModal
          open={openUserChoiceModal}
          message="Are you sure you want to delete that report?"
          handleCloseModal={handleCloseUserChoiceModal}
          handleUserResponse={handleUserResponseOnDelete}
        />
      </Main>
      <Footer />
    </Root>
  );
};

export default Report;

//Create list in useEffect to limit computation on rerender
//to transfer*********************************
// useEffect(() => {
//   let newReportList: IReport[] | [] = [];

//   const getReportListFromContext = () => {
//     if (products) return organizeByCategories(categories, products);
//     else return [];
//   };

//   //need to verify if report has been submitted
//   if (status === "Submitted") {
//     newReportList =
//       getReportListSubmittedReport(
//         data,
//         categories,
//         products,
//         submittedProductList
//       ) || [];
//   } else if (status === "Not Submitted") {
//     newReportList = getReportListFromContext() || [];
//   }
//   //if no, keep that method
//   // if yes, use the values in the report fetched insteads

//   if (newReportList !== undefined) setReportList(newReportList);
//   else setReportList([]);
// }, [categories, products, setReportList, status, data, submittedProductList]);

// const renderedReport = () => {
//   return reportList.map((report: IReport) => {
//     return <ListReports key={report.categoryName} report={report} />;
//   });
// };
