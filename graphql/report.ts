//`Models
import dbConnect from "../utils/dbConnect";
import Report from "../models/report.model";
import Product from "../models/product.model";

//GraphQl
import { gql } from "@apollo/client";

//Time
import { DateTime } from "luxon";

dbConnect();

//comes from the products db
interface IProductInCategories {
  currentAmount: Number;
  previousAmount: Number;
  categoryId: String;
  position: Number;
}
//to be saved in the reports db
interface IProductInReport {
  productId: String;
  amount: Number;
  categoryId: String;
  position: Number;
  unit: String;
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
    categoryId: String
    position: Int
    unit: String
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
    products: [ReportProduct]
    error: String
  }

  type SubmittedReportResponse {
    success: Boolean
    products: [ReportProduct]
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
        console.log("user server reports");
        console.log(user);
        let reports = await Report.find({ userId: user.id });
        console.log("**reports from db**");
        console.log(reports);

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
        console.log(user.id);
        console.log(sameDateEndingCycleReport);
        console.log(truncatedDateEndingCycle);

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
        //get all the product from that user
        const allProducts = await Product.find({ userId: user.id });

        //loop through the products, format them to be save on the report
        let listOfProductsForReport: IProductInReport[] = [];
        allProducts.map((product) => {
          //create a routine get currentAmount
          //changed product
          //now currenAmount is in categories[]
          //loop through categories
          // find the product and the category corresponding
          console.log("report.ts line 203");
          console.log(product);
          //array of the categories field of the products from the database
          product.categories.map((category: IProductInCategories) => {
            console.log("in line 208");
            console.log(product);
            const { currentAmount, categoryId, position } = category;
            listOfProductsForReport.push({
              productId: product.id,
              amount: currentAmount,
              categoryId,
              unit: product.unit,
              position,
            });
          });

          //final array to be ready to be save to the db
        });

        //dateSubmitted
        const dateSubmitted = DateTime.now().toISO();
        report.dateSubmitted = dateSubmitted;

        //Modify products, writing previousAmount, resetting currentAmount
        console.log("report.ts line  229");
        console.log(listOfProductsForReport);
        //add products to report
        report.products = listOfProductsForReport;

        //hasBeenSubmitting
        report.hasBeenSubmitted = true;

        //Save products new amounts

        Product.find({ userId: user.id })
          .cursor()
          .map((product) => product)
          .on("data", (product) => {
            console.log("report.ts line  248");
            console.log(product);
            const newPreviousAmount = product.currentAmount;
            product.currentAmount = 0;
            product.previousAmount = newPreviousAmount;
            product.save();
          });
        console.log("report.ts line  255");
        console.log(Product);
        //Save report
        await report.save();
        return { success: true, products: report.products };
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
