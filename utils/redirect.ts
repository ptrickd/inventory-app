export const redirectOnLogin = (
  hasReport: boolean,
  hasCategory: boolean,
  hasProduct: boolean
) => {
  if (!hasReport) {
    return { pathname: "/wiz", query: { l: "firstReport" } };
  } else if (hasReport && !hasCategory) {
    return { pathname: "/wiz", query: { l: "firstCategory" } };
  } else if (hasReport && hasCategory && !hasProduct) {
    return { pathname: "/wiz", query: { l: "firstProduct" } };
  } else {
    return {
      pathname: "/dashboard",
    };
  }
};
