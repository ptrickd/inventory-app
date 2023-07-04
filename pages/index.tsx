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
import Image from "next/legacy/image";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";

//Style
import {
  classes,
  Root,
  Main,
  StyledTypography,
  StyledButton,
} from "../styles/index.style";

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
  const { loggedIn } = useContext(UserContext);
  const { hasReport } = useContext(ReportsContext);
  const { hasCategory } = useContext(CategoriesContext);
  const { hasProduct } = useContext(ProductsContext);

  const router = useRouter();
  const DashboardText = "Easy view to settings Categories Products Reports";
  const CategoriesSectionText = "Dashboard Text Heere!";
  const ReportText = "Dashboard Text Heere!";

  useEffect(() => {
    if (loggedIn) {
      const url = redirectOnLogin(hasReport, hasCategory, hasProduct);
      if (url) router.push(url);
    }
  }, [loggedIn, hasReport, hasCategory, hasProduct, router]);
  return (
    <Root className={classes.root} maxWidth="md">
      <Main className={classes.main}>
        <StyledTypography className={classes.title} variant="h4" align="center">
          Gruyere
        </StyledTypography>
        <StyledTypography
          className={classes.subtitle}
          variant="h5"
          align="center"
          sx={{ marginTop: 10, marginBottom: 10 }}
        >
          Your Kitchen Inventory App Management
        </StyledTypography>
        <Image
          alt="stock photo"
          src="/nathan-dumlao-g8gOnhMRckw-unsplash_working.jpg"
          width={500}
          height={300}
        />
        <StyledButton
          className={classes.button}
          variant="contained"
          color="primary"
          size="large"
          onClick={() => {
            router.push("/login");
          }}
        >
          Start
        </StyledButton>

        {/*****************    Dashboard    ****************/}

        <Divider sx={{ mt: 10, mb: 2 }} />
        <CardLandingPage
          imgWidth={414}
          imgHeight={533}
          imageAlt="photo of dashboard app"
          imagePath="/dashboard_light.jpg"
          text="Easy view to settings Categories Products Reports"
          title="An Clean Dashboard"
        />

        {/*****************    Categories    ****************/}

        <Divider sx={{ mt: 2, mb: 2 }} />
        <CardLandingPage
          imgWidth={414}
          imgHeight={533}
          imageAlt="photo of categories app"
          imagePath="/categories_light.jpg"
          text="Put categories page explication here:"
          title="Categories"
        />

        {/*****************    Reports    ****************/}

        <Divider sx={{ mt: 2, mb: 2 }} />
        <CardLandingPage
          imgWidth={414}
          imgHeight={533}
          imageAlt="photo of reports page"
          imagePath="/reports_light.jpg"
          text="Put reports page explication here:"
          title="Reports"
        />
      </Main>
      <Footer />
    </Root>
  );
}
