//React
import { createContext, useEffect, useState } from "react";

//GraphQL
import { gql, useQuery, useMutation } from "@apollo/client";

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
  reports: IReport[];
  createNewReport: (dateEndingCycle: Date) => any;
}

const ReportsContext = createContext<Partial<IContext>>({});

const ReportsProvider = ({ children }: IProps) => {
  const [reports, setReports] = useState<IReport[] | []>([]);
  const { data } = useQuery(GET_REPORTS);
  const [createReport] = useMutation(CREATE_REPORT);

  useEffect(() => {
    setReports(data?.reports?.reports);
  }, [data]);
  // useEffect(() => {}, [reports]);

  async function createNewReport(dateEndingCycle: Date) {
    try {
      const response = await createReport({ variables: { dateEndingCycle } });
      setReports([
        ...reports,
        response.data.createReport.createdReportResponse,
      ]);

      return response;
    } catch (err: any) {
      console.log(err?.message);
    }
  }

  // if (loading) null

  return (
    <ReportsContext.Provider
      value={{
        reports,
        createNewReport,
      }}
    >
      {children}
    </ReportsContext.Provider>
  );
};

export { ReportsProvider, ReportsContext };
