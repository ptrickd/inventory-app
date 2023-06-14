//Testing library
import { screen, cleanup, waitFor } from "@testing-library/react";
import { MockedProvider } from "@apollo/client/testing";
import userEvent from "@testing-library/user-event";

//Graphql
import { gql } from "@apollo/client";

//Mocked router
const useRouter = jest.spyOn(require("next/router"), "useRouter");

// CustomRender
import CustomRender from "../functions/CustomRender";

//Mocked context
import {
  REPORT_ID,
  CARROT_PRODUCT_ID,
  PRODUCE_CATEGORY_ID,
} from "../functions/mockedContexts";

//Page to test
import ReportId from "../../pages/report/[reportId]";

//Mocked Query
const GET_REPORT = gql`
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

const SUBMIT_REPORT = gql`
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

const DELETE_REPORT = gql`
  mutation DeleteReport($reportId: ID!) {
    deleteReport(reportId: $reportId) {
      success
      error
    }
  }
`;

const mocksQuery: any = [
  {
    request: {
      query: GET_REPORT,
      variables: {
        reportId: REPORT_ID,
      },
    },
    result: {
      data: {
        report: {
          id: REPORT_ID,
          dateEndingCycle: "2023-04-06T00:00:00.000Z",
          hasBeenSubmitted: false,
          products: [
            {
              productId: CARROT_PRODUCT_ID,
              categoryId: PRODUCE_CATEGORY_ID,
              amount: 6,
              unit: "ea",
              position: 0,
            },
          ],
          error: null,
        },
      },
    },
  },
];

/*
TESTS
render as intended
match the snapshot
status: Not Submitted
status: Submitted
*/

describe("<reportId />", () => {
  afterEach(() => {
    cleanup();
  });

  it("render as intended", async () => {
    //mock router
    const router = { push: jest.fn(), query: { reportId: "789456" } };
    useRouter.mockReturnValue(router);

    CustomRender(
      <MockedProvider mocks={mocksQuery} addTypename={false}>
        <ReportId />
      </MockedProvider>
    );

    // has a title
    const Title = await screen.findByRole("heading", { name: /report/i });
    expect(Title).toBeInTheDocument();

    //has a date
    const Date = await screen.findByTestId(/date/i);
    expect(Date).toBeInTheDocument();

    //display a status
    const Status = screen.getByText(/status/i);
    expect(Status).toBeInTheDocument();

    //display 'Produce' row in table
    const ProduceTable = screen.getByText(/produce/i);
    expect(ProduceTable).toBeInTheDocument();

    //display product : carrots 6 0 ea
    const CarrotsName = screen.getByText(/carrots/i);
    expect(CarrotsName).toBeInTheDocument();

    const CurrentAmount = screen.getByText(/6/i);
    expect(CurrentAmount).toBeInTheDocument();

    const PreviousAmount = screen.getByTestId(/product-previous-amount/i);
    expect(PreviousAmount).toBeInTheDocument();

    const Unit = screen.getByText(/ea/i);
    expect(Unit).toBeInTheDocument();

    //button 'submit'
    const ButtonSubmit = screen.getByRole("button", { name: /submit/i });
    expect(ButtonSubmit).toBeInTheDocument();
  });

  it("match the snapshot", () => {
    const tree = CustomRender(
      <MockedProvider mocks={mocksQuery} addTypename={false}>
        <ReportId />
      </MockedProvider>
    );
    expect(tree).toMatchSnapshot();
  });
});
