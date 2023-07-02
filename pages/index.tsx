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
import Footer from "../Layout/Footer";

//Function
import { redirectOnLogin } from "../utils/redirect";

export default function Home() {
  //Context
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
        <Divider sx={{ mt: 2, mb: 2 }} />
        <Typography variant="body1">Put dashboard explication here</Typography>
        <Image
          alt="photo of dashboard app"
          src="/dashboard_light.png"
          layout="responsive"
          width={414}
          height={533}
        />
        <Divider sx={{ mt: 2, mb: 2 }} />
        <Typography variant="body1">
          Put categories page explication here:
        </Typography>

        <Image
          alt="photo of categpries page"
          src="/categories_light.png"
          layout="responsive"
          width={414}
          height={533}
        />
        <Divider sx={{ mt: 2, mb: 2 }} />
        <Typography variant="body1">
          Put reports page explication here:
        </Typography>

        <Image
          alt="photo of reports page"
          src="/reports_light.png"
          layout="responsive"
          width={414}
          height={577}
        />
      </Main>
      <Footer />
    </Root>
  );
}
