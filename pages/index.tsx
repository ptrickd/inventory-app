/*
/components
/utils
/modals
/graphql
  /queries
  /mutations
*/
//React
import { useContext, useEffect } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import Divider from "@mui/material/Divider";

//Images
import mainPagePic from "../public/nathan-dumlao-g8gOnhMRckw-unsplash_working.jpg";
import dashboardLightPic from "../public/dashboard_light.jpg";

import categoriesLightPic from "../public/categories_light.jpg";
import reportsLightPic from "../public/reports_light.jpg";
//Material UI
import Container from "@mui/material/Container";
// import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

//Style
import {
  rootStyle,
  mainStyle,
  titleStyle,
  subtitleStyle,
  buttonStyle,
  dividerStyle,
  cardsSection,
} from "../styles/index.style";
// import "@mui/material-pigment-css/styles.css"; //Migrate to pigmentJs

//Context
import { UserContext } from "../contexts/UserContext";
import { ReportsContext } from "../contexts/ReportsContext";
import { CategoriesContext } from "../contexts/CategoriesContext";
import { ProductsContext } from "../contexts/ProductsContext";

//Component
import CardLandingPage from "../components/CardLandingPage";
import Footer from "../Layout/Footer";

//Function
import { redirectOnLogin } from "../utils/redirect";

//temporary constant #648dae #829baf
const Light_background_Color = "#c8e4fb";

export default function Home() {
  //Context
  /*
  Do I still need those??gedi
  */
  const { loggedIn } = useContext(UserContext);
  const { hasReport } = useContext(ReportsContext);
  const { hasCategory } = useContext(CategoriesContext);
  const { hasProduct } = useContext(ProductsContext);

  const router = useRouter();

  useEffect(() => {
    if (loggedIn) {
      const url = redirectOnLogin(hasReport, hasCategory, hasProduct);
      if (url) router.push(url);
    }
  }, [loggedIn, hasReport, hasCategory, hasProduct, router]);

  return (
    <Container className={rootStyle} maxWidth="md">
      <section className={mainStyle}>
        <Typography className={titleStyle} variant="h4" align="center">
          Gruyere
        </Typography>
        <Typography className={subtitleStyle} variant="h5" align="center">
          Your Kitchen Inventory App Management
        </Typography>

        <Image alt="stock photo" src={mainPagePic} width={500} height={300} />
        <Button
          className={buttonStyle}
          variant="contained"
          color="primary"
          size="large"
          onClick={() => {
            router.push("/login");
          }}
        >
          Start
        </Button>

        {/*****************    Dashboard    ****************/}
        <section className={cardsSection}>
          <Divider flexItem className={dividerStyle} />
          <CardLandingPage
            imgWidth={414}
            imgHeight={533}
            imageAlt="photo of dashboard app"
            imagePath={dashboardLightPic}
            text="Easy access to Settings, Categories, Products and Reports"
            title="A Clean Dashboard"
          />
          {/*****************    Categories    ****************/}
          <Divider className={dividerStyle} />
          <CardLandingPage
            imgWidth={414}
            imgHeight={533}
            imageAlt="photo of categories app"
            imagePath={categoriesLightPic}
            text="Easily travel between categories, creating new products or entering your inventory"
            title="Display products by categories"
          />
          {/*****************    Reports    ****************/}
          <Divider className={dividerStyle} />

          <CardLandingPage
            imgWidth={414}
            imgHeight={533}
            imageAlt="photo of reports page"
            imagePath={reportsLightPic}
            text="See your reports in a glance. Submit new report or erase old ones."
            title="See and print full reports"
          />
        </section>
      </section>
      {/* <Footer /> */}
    </Container>
  );
}
