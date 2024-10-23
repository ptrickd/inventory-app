/*
This component render a report. 
If the report status is 'Submitted' then it need to modified the structure of the
object to match the structure of a 'Not Submitted' report 
*/

//React
import { useState, useEffect, useContext } from "react";

//Context
import { CategoriesContext } from "../../contexts/CategoriesContext";
import { ProductsContext } from "../../contexts/ProductsContext";

//Component
import ListReports from "../../components/ListReports";

//GraphQL
import { useQuery } from "@apollo/client";

//Material UI
import Box from "@mui/material-pigment-css/Box";

//Types
import { ISubmittedProduct, IReport } from "../../types/reportId.types";
interface IProps {
  status: "Not Submitted" | "Submitted";
  reportId: string;
  submittedProductList: ISubmittedProduct[] | [];
}

//Function
import {
  organizeByCategories,
  getReportListSubmittedReport,
} from "../../utils/formatingList";

// Queries
import { GET_REPORT } from "../../queries/reportId.queries";

const RenderReport = ({ status, reportId, submittedProductList }: IProps) => {
  /***************************/

  //useState
  const [reportList, setReportList] = useState<[] | IReport[]>([]);
  //   const [submittedProductList, setSubmittedProductList] = useState<
  //     ISubmittedProduct[] | []
  //   >([]);

  //Context
  const { categories } = useContext(CategoriesContext);
  const { products } = useContext(ProductsContext);

  //GraphQL
  const { data, loading, error } = useQuery(GET_REPORT, {
    variables: { reportId: reportId },
    skip: !reportId,
  });

  /***************************/
  useEffect(() => {
    let newReportList: IReport[] | [] = [];

    const getReportListFromContext = () => {
      if (products) return organizeByCategories(categories, products);
      else return [];
    };

    //need to verify if report has been submitted
    if (status === "Submitted") {
      newReportList =
        getReportListSubmittedReport(
          data,
          categories,
          products,
          submittedProductList
        ) || [];
    } else if (status === "Not Submitted") {
      newReportList = getReportListFromContext() || [];
    }
    //if no, keep that method
    // if yes, use the values in the report fetched insteads

    if (newReportList !== undefined) setReportList(newReportList);
    else setReportList([]);
  }, [categories, products, setReportList, status, data, submittedProductList]);

  /***************************/

  const renderedReport = () => {
    return reportList.map((report: IReport) => {
      return <ListReports key={report.categoryName} report={report} />;
    });
  };

  /***************************/

  return <Box component="div">{renderedReport()}</Box>;
};

export default RenderReport;
