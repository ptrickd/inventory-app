import { gql } from "@apollo/client";

export const GET_REPORT = gql`
  query Report($reportId: ID!) {
    report(reportId: $reportId) {
      id
      dateEndingCycle
      hasBeenSubmitted
      products {
        productId
        categoryId
        amount
        unit
        position
      }
      error
    }
  }
`;

export const SUBMIT_REPORT = gql`
  mutation SubmitReport($reportId: ID!) {
    submitReport(reportId: $reportId) {
      success
      products {
        productId
        categoryId
        amount
        unit
        position
      }
      error
    }
  }
`;

export const DELETE_REPORT = gql`
  mutation DeleteReport($reportId: ID!) {
    deleteReport(reportId: $reportId) {
      success
      error
    }
  }
`;
