//React
import { createContext, useContext, useEffect, useState } from "react";

//GraphQL
import { gql, useLazyQuery, useMutation } from "@apollo/client";

//COntext
import { UserContext } from "./UserContext";

//Queries
const GET_REPORTS = gql`
  query Reports {
    reports {
      reports {
        id
        dateEndingCycle
      }
    }
  }
`;

//Mutation
const CREATE_REPORT = gql`
  mutation CreateReport($dateEndingCycle: Date) {
    createReport(dateEndingCycle: $dateEndingCycle) {
      id
      userId
      dateEndingCycle
      dateCreated
      error
    }
  }
`;

//Interface
interface IProps {
  children: React.ReactNode;
}

interface IProductInReport {
  productId: string;
  amount: number;
  name: string;
  categoryId: string;
}

interface IReport {
  id: string;
  userId: string;
  dateEndingCycle: Date;
  products?: IProductInReport[] | [];
  hasBeenSubmitted: boolean;
  dateCreated: Date;
  dateSubmitted: Date;
}
interface IContext {
  hasReport: boolean | null;
  reports: IReport[];
  createNewReport: (dateEndingCycle: Date) => any;
  deleteLocalReport: (reportId: string) => void;
}

const ReportsContext = createContext<Partial<IContext>>({});

const ReportsProvider = ({ children }: IProps) => {
  const { loggedIn } = useContext(UserContext);
  const [hasReport, setHasReport] = useState<boolean | null>(null);
  const [reports, setReports] = useState<IReport[] | []>([]);
  const [getReports, { data, loading, error }] = useLazyQuery(GET_REPORTS);
  const [createReport] = useMutation(CREATE_REPORT);

  useEffect(() => {
    if (data) {
      const currentsReports = data?.reports?.reports;
      setReports(currentsReports);
      if (currentsReports.length > 0) setHasReport(true);
      else setHasReport(false);
    }
  }, [data, loading]);

  useEffect(() => {
    if (loggedIn) getReports();
  }, [loggedIn, getReports]);

  async function createNewReport(dateEndingCycle: Date) {
    try {
      const response = await createReport({ variables: { dateEndingCycle } });

      setReports([...reports, response.data.createReport]);
      setHasReport(true);
      return response;
    } catch (err: any) {
      console.error(err?.message);
      return err.message;
    }
  }

  const deleteLocalReport = (reportId: string) => {
    const newReportList = reports.filter((report) => {
      if (report.id !== reportId) return report;
    });
    setReports(newReportList);
  };

  if (loading) return null;

  return (
    <ReportsContext.Provider
      value={{
        hasReport,
        reports,
        createNewReport,
        deleteLocalReport,
      }}
    >
      {children}
    </ReportsContext.Provider>
  );
};

export { ReportsProvider, ReportsContext };
