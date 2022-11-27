//React
import { createContext, useEffect, useState } from "react";

//GraphQL
import { gql, useLazyQuery, useMutation } from "@apollo/client";

//Date
import { DateTime } from "luxon";

//Types
import { IProduct } from "../types/types";

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
  // createNewReport: (dateEndingCycle: Date) => Promise<number>
}

const ReportsContext = createContext<Partial<IContext>>({});

const ReportsProvider = ({ children }: IProps) => {
  const [reports, setReports] = useState<IReport[] | []>([]);
  const [createReport] = useMutation(CREATE_REPORT);
  //   const [getReports, { data, loading }] = useLazyQuery(GET_REPORTS, {
  //     fetchPolicy: "network-only",
  //     onCompleted: (data) => {
  //       setReports(data?.reports.reports); // multiple times
  //     },
  //   });

  //   useEffect(() => {
  //     getReports();
  //   }, [getReports]);
  useEffect(() => {
    console.log(`reports when reports array is updated${reports}`);
  }, [reports]);
  async function createNewReport(dateEndingCycle: Date) {
    try {
      const response = await createReport({ variables: { dateEndingCycle } });
      //   setReports([response.data.createReport, ...reports]);

      console.log(
        `in createNewReport function \nid ${response.data.createReport.id}\n`
      );
      for (let property in response.data.createReport) {
        console.log(`${property}=${response.data.createReport[property]}`);
      }
      //userId
      //dateCreated
      //dateEndingCycle
      return response;
      //   return report;
    } catch (err: any) {
      console.log(err?.message);
    }
  }

  // return valueToReturn

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
