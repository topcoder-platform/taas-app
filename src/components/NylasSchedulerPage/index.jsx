/**
 * NylasSchedulerPage
 *
 * Renders iframe to show Nylas scheduler component along with other necessary page elements.
 */
import React from "react";
import PT from "prop-types";
import Page from "../Page";
import LoadingIndicator from "../LoadingIndicator";
import PageHeader from "../PageHeader";

const NylasSchedulerPage = ({ pageTitle, src, errorMessage, pageHeader, iframeTitle }) => {
    return (
        <Page title={pageTitle}>
            {!src ? (
            <LoadingIndicator error={errorMessage} />
            ) : (
            <>
                <PageHeader title={pageHeader} />
                <iframe
                    title={iframeTitle}
                    src={src}
                    width="1020"
                    height="900"
                />
            </>
            )}
        </Page>
    );
};
 
NylasSchedulerPage.propTypes = {
    pageTitle: PT.string,
    src: PT.string,
    errorMessage: PT.string,
    pageHeader: PT.string,
    iframeTitle: PT.iframeTitle
};
 
export default NylasSchedulerPage;
 