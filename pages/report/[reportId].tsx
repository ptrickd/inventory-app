//React
import { useEffect, useContext } from "react";
import { styled } from '@mui/material/styles';
import { useRouter } from "next/router";

import { Theme } from "@mui/styles";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";

//GraphQL
import { gql, useQuery } from "@apollo/client";

//Date
import { DateTime } from "luxon";

//Context
import { UserContext } from "../../contexts/UserContext";

const PREFIX = 'Report';

const classes = {
  root: `${PREFIX}-root`,
  title: `${PREFIX}-title`,
  date: `${PREFIX}-date`,
  subTitle: `${PREFIX}-subTitle`,
  dataFormat: `${PREFIX}-dataFormat`
};

const StyledContainer = styled(Container)((
  {
    theme: Theme
  }
) => ({
  [`&.${classes.root}`]: {
    width: "100%",
    marginLeft: 10,
    marginRight: 10,
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
  },

  [`& .${classes.title}`]: {
    marginBottom: 15,
  },

  [`& .${classes.date}`]: {
    marginBottom: 15,
  },

  [`& .${classes.subTitle}`]: {
    marginTop: 10,
    marginBottom: 10,
  },

  [`& .${classes.dataFormat}`]: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  }
}));

const GET_REPORT = gql`
  query Report($reportId: ID!) {
    report(reportId: $reportId) {
      id
      date
      products {
        productId
        name
        amount
        categoryId
      }
    }
  }
`;

const GET_CATEGORIES = gql`
  query Categories {
    categories {
      id
      name
    }
  }
`;

const Report: React.FC = () => {

  const router = useRouter();
  const { reportId } = router.query;
  const { loggedIn } = useContext(UserContext);
  const { data, loading, error } = useQuery(GET_REPORT, {
    variables: { reportId: reportId },
    skip: !reportId,
  });
  const {
    //Aliases for useQuery
    data: dataCategories,
    loading: loadingCategories,
    error: errorCategories,
  } = useQuery(GET_CATEGORIES);

  useEffect(() => {
    if (!loggedIn) router.push("/");
  }, [loggedIn, router]);

  if (loading || loadingCategories) return <p>Loading...</p>;
  if (error || errorCategories) return <p>Error...</p>;
  if (!data) return <p>No data...</p>;
  const date = DateTime.fromISO(data.report.date);
  const productsByCategory = (categoryId: string) => {
    return data.report.products.map((product: any) => {
      if (categoryId === product.categoryId) {
        return (
          <div key={product.productId} className={classes.dataFormat}>
            <Typography variant="body2">{product.name}</Typography>
            <Typography variant="body2">{product.amount}</Typography>
          </div>
        );
      }
    });
  };
  const renderedReport = () => {
    console.log("dataCategories", dataCategories);
    return dataCategories.categories.map((category: any) => {
      return (
        <div key={category.id}>
          <Typography variant="h5">{category.name}</Typography>
          {productsByCategory(category.id)}
          <hr />
        </div>
      );
    });
  };

  return (
    <StyledContainer className={classes.root}>
      <Typography className={classes.title} variant="h3" align="center">
        Report
      </Typography>
      <Typography className={classes.date} variant="h6" align="center">
        {date.toFormat("dd MMMM, yyyy")}
      </Typography>
      {renderedReport()}
    </StyledContainer>
  );
};

export default Report;
