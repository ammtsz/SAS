import React from "react";
import { PageReport, CardReport } from "./report-page.styles";
import ReportHeader from "./components/card-header.report/card-header.report.component";
import ReportBody from "./components/card-body.report/card-body.report.component";

const Report = () => {
  const review = true;

  return (
    <PageReport>
      <CardReport>
        <ReportHeader review={review}/>
        <ReportBody/>
      </CardReport>
    </PageReport>
  );
};

export default Report;
