//Models
import dbConnect from "../utils/dbConnect";
import Report from "../models/report.model";
// import Category from "../models/category.model";
import Product from "../models/product.model";

//GraphQl
import { gql } from "apollo-server-micro";

//Time
import { DateTime } from "luxon";

//Types
import { TIds } from "../types/types";
import { convertLength } from "@mui/material/styles/cssUtils";

dbConnect();

interface IProductInReport {
  productId: string;
  amount: number;
  name: string;
  categoryId: string;
}

interface ISubmitReport {
  reportId: string;
}

interface ICreateReport {
  dateEndingCycle: Date;
}

export const typeDef = gql`
  scalar Date

  input InputReportProduct {
    productId: String
    amount: Int
    name: String
    categoryId: String
  }

  type ReportProduct {
    productId: String
    amount: Int
    name: String
    categoryId: String
  }

  type createdReportResponse {
    id: ID
    userId: String
    dateEndingCycle: Date
    dateCreated: Date
    error: String
  }

  type ReportResponse {
    id: ID
    dateEndingCycle: Date
    error: String
  }

  type ReportsResponse {
    id: ID
    reports: [ReportResponse]
    error: String
  }

  type Report {
    id: ID
    userId: String
    dateCreated: Date
    dateEndingCycle: Date
    hasBeenSubmitted: Boolean
    error: String
  }

  type SubmittedReportResponse {
    success: Boolean
    error: String
  }

  type DeletedReportResponse {
    success: Boolean
    error: String
  }

  extend type Query {
    report(reportId: ID): Report
    reports: ReportsResponse
    numOfReports: Int
  }

  extend type Mutation {
    createReport(dateEndingCycle: Date): createdReportResponse
    submitReport(reportId: ID): SubmittedReportResponse
    deleteReport(reportId: ID): DeletedReportResponse
  }
`;
export const resolvers = {
  Query: {
    report: async (_: any, { reportId }: TIds, { user }: any) => {
      try {
        if (!user) throw new Error("Not Authenticated");
        const report = await Report.findById(reportId);

        if (!report) throw new Error("No report found");
        return report;
      } catch (err: any) {
        console.log(err.message);
        return { error: err.message };
      }
    },
    reports: async (_: any, _1: any, { user }: any) => {
      try {
        if (!user) throw new Error("Not Authenticated");
        let reports = await Report.find({ userId: user.id });
        return { reports };
      } catch (err: any) {
        return { error: err.message };
      }
    },
    numOfReports: async (_: any, _1: any, { user }: any) => {
      try {
        if (!user) throw new Error("Not Authenticated");
        return await Report.countDocuments({ userId: user.id });
      } catch (err: any) {
        console.log("Printing error: ", err.message);
        return { error: err.message };
      }
    },
  },
  Mutation: {
    createReport: async (
      _: any,
      { dateEndingCycle }: ICreateReport,
      { user }: any
    ) => {
      try {
        if (!user) throw new Error("Not Authenticated");

        const truncatedDateEndingCycle = dateEndingCycle
          .toString()
          .substring(0, 10); //year-month-day format
        const sameDateEndingCycleReport = await Report.findOne({
          userId: user.id,
          dateEndingCycle: truncatedDateEndingCycle,
        });

        if (sameDateEndingCycleReport)
          throw new Error(
            "Can't create more than one report with the same ending cycle date!"
          );

        let report = await Report.create({
          userId: user.id,
          dateEndingCycle: dateEndingCycle.toString().substring(0, 10),
          dateCreated: DateTime.now().toISO(),
        });

        if (!report) throw new Error("Can't create report");

        return report;
      } catch (err: any) {
        console.log(err.message);
        let report = { error: err.message };
        return report;
      }
    },
    submitReport: async (
      _: any,
      { reportId }: ISubmitReport,
      { user }: any
    ) => {
      try {
        if (!user) throw new Error("Not Authenticated");
        let report = await Report.findOne({ _id: reportId, userId: user.id });
        if (!report) throw new Error("This report do not exist!");
        if (report.hasBeenSubmitted)
          throw new Error("This report has already been submitted");

        //when submitting
        const allProducts = await Product.find({ userId: user.id });
        let listOfProductsForReport = allProducts.map((product) => {
          //create a routine get currentAmount
          const productObj = {
            productId: product.id,
            amount: product.currentAmount,
            unit: product.unit,
          };
          return productObj;
        });

        //dateSubmitted
        const dateSubmitted = DateTime.now().toISO();
        report.dateSubmitted = dateSubmitted;

        //Modify products, writing previousAmount, resetting currentAmount

        //add products to report
        report.products = listOfProductsForReport;

        //hasBeenSubmitting
        report.hasBeenSubmitted = true;

        //Save products new amounts

        Product.find({ userId: user.id })
          .cursor()
          .map((product) => product)
          .on("data", (product) => {
            const newPreviousAmount = product.currentAmount;
            product.currentAmount = 0;
            product.previousAmount = newPreviousAmount;
            product.save();
          });
        //Save report
        report.save();

        return { success: true };
      } catch (err: any) {
        console.log(err.message);
        return { error: err.message };
      }
    },
    deleteReport: async (
      _: any,
      { reportId }: ISubmitReport,
      { user }: any
    ) => {
      try {
        if (!user) throw new Error("Not Authenticated");
        const deletedReport = await Report.deleteOne({ _id: reportId });
        if (!deletedReport.deletedCount)
          throw new Error("This report do not exist!");
        return { success: true };
      } catch (err: any) {
        console.log(err.message);
        return { error: err.message };
      }
    },
  },
};
