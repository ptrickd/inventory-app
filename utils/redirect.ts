export const redirectOnLogin = (
  hasReport: boolean | null | undefined,
  hasCategory: boolean | null | undefined,
  hasProduct: boolean | null | undefined
) => {
  if (
    hasReport === undefined &&
    hasReport === null &&
    hasCategory === undefined &&
    hasCategory === null &&
    hasProduct === undefined &&
    hasProduct === null
  )
    return null;

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
