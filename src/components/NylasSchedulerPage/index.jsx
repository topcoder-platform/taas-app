/**
 * NylasSchedulerPage
 *
 * Renders iframe to show Nylas scheduler component along with other necessary page elements.
 */
import React from "react";
import PT from "prop-types";

const NylasSchedulerPage = ({ pageTitle, src, errorMessage, header, iframeTitle }) => {
    return (
        <Page title={pageTitle}>
            {!src ? (
            <LoadingIndicator error={errorMessage} />
            ) : (
            <>
                <PageHeader title={header} />
                <NylasSchedulerIframe
                    title={iframeTitle}
                    src={src}
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
    header: PT.string,
    iframeTitle: PT.iframeTitle
};
 
export default NylasSchedulerPage;
 