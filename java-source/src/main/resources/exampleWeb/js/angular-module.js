"use strict";

// --------
// WARNING:
// --------

// THIS CODE IS ONLY MADE AVAILABLE FOR DEMONSTRATION PURPOSES AND IS NOT SECURE!
// DO NOT USE IN PRODUCTION!

// FOR SECURITY REASONS, USING A JAVASCRIPT WEB APP HOSTED VIA THE CORDA NODE IS
// NOT THE RECOMMENDED WAY TO INTERFACE WITH CORDA NODES! HOWEVER, FOR THIS
// PRE-ALPHA RELEASE IT'S A USEFUL WAY TO EXPERIMENT WITH THE PLATFORM AS IT ALLOWS
// YOU TO QUICKLY BUILD A UI FOR DEMONSTRATION PURPOSES.

// GOING FORWARD WE RECOMMEND IMPLEMENTING A STANDALONE WEB SERVER THAT AUTHORISES
// VIA THE NODE'S RPC INTERFACE. IN THE COMING WEEKS WE'LL WRITE A TUTORIAL ON
// HOW BEST TO DO THIS.

const app = angular.module('demoAppModule', ['ui.bootstrap']);

// Fix for unhandled rejections bug.
app.config(['$qProvider', function ($qProvider) {
    $qProvider.errorOnUnhandledRejections(false);
}]);

app.controller('DemoAppController', function($http, $location, $uibModal) {
    const demoApp = this;

    // We identify the node.
    const apiBaseURL = "/api/example/";
    let peers = [];

    $http.get(apiBaseURL + "me").then((response) => demoApp.thisNode = response.data.me);

    $http.get(apiBaseURL + "peers").then((response) => peers = response.data.peers);

    demoApp.openModalForAP = () => {
        const modalInstanceAP = $uibModal.open({
            templateUrl: 'demoAppModalForAP.html',
            controller: 'ModalInstanceCtrlAP',
            controllerAs: 'modalInstanceAP',
            resolve: {
                demoApp: () => demoApp,
                apiBaseURL: () => apiBaseURL,
                peers: () => peers
            }
        });

        modalInstanceAP.result.then(() => {}, () => {});
    };

    demoApp.openModalForETF = () => {
        const modalInstanceETF = $uibModal.open({
            templateUrl: 'demoAppModalForETF.html',
            controller: 'ModalInstanceCtrlETF',
            controllerAs: 'modalInstanceETF',
            resolve: {
                demoApp: () => demoApp,
                apiBaseURL: () => apiBaseURL,
                peers: () => peers
            }
        });

        modalInstanceETF.result.then(() => {}, () => {});
    };

    demoApp.isAPNode = () => {
         if(demoApp.thisNode === "C=IN,L=Pune,O=AP"){
            return true;
         }
    };

    demoApp.isETFNode = () => {
        if(demoApp.thisNode === "C=IN,L=Pune,O=ETF"){
            return true;
        }
    };

    demoApp.getIOUs = () => $http.get(apiBaseURL + "ious")
        .then((response) => demoApp.ious = Object.keys(response.data)
            .map((key) => response.data[key].state.data)
            .reverse());

    demoApp.getIOUs();
});

app.controller('ModalInstanceCtrlAP', function ($http, $location, $uibModalInstance, $uibModal, demoApp, apiBaseURL, peers) {
    const modalInstanceAP = this;

    modalInstanceAP.peers = peers;
    modalInstanceAP.form = {};
    modalInstanceAP.formError = false;

    // Validate and create IOU.
    modalInstanceAP.create = () => {
        if (invalidFormInput()) {
            modalInstanceAP.formError = true;
        } else {
            modalInstanceAP.formError = false;

            $uibModalInstance.close();

            const createIOUEndpoint = `${apiBaseURL}create-iou?partyName=${modalInstanceAP.form.counterpartyap}&iouValue=${modalInstanceAP.form.valueap}`;

            // Create PO and handle success / fail responses.
            $http.put(createIOUEndpoint).then(
                (result) => {
                    modalInstanceAP.displayMessage(result);
                    demoApp.getIOUs();
                },
                (result) => {
                    modalInstanceAP.displayMessage(result);
                }
            );
        }
    };

    modalInstanceAP.displayMessage = (message) => {
        const modalInstanceTwo = $uibModal.open({
            templateUrl: 'messageContent.html',
            controller: 'messageCtrl',
            controllerAs: 'modalInstanceTwo',
            resolve: { message: () => message }
        });

        // No behaviour on close / dismiss.
        modalInstanceTwo.result.then(() => {}, () => {});
    };

    // Close create IOU modal dialogue.
    modalInstanceAP.cancel = () => $uibModalInstance.dismiss();

    // Validate the IOU.
    function invalidFormInput() {
        return isNaN(modalInstanceAP.form.valueap) || (modalInstanceAP.form.counterpartyap === undefined);
    }
});

app.controller('ModalInstanceCtrlETF', function ($http, $location, $uibModalInstance, $uibModal, demoApp, apiBaseURL, peers) {
    const modalInstanceETF = this;

    modalInstanceETF.peers = peers;
    modalInstanceETF.form = {};
    modalInstanceETF.formError = false;

    // Validate and create IOU.
    modalInstanceETF.create = () => {
        if (invalidFormInput()) {
            modalInstanceETF.formError = true;
        } else {
            modalInstanceETF.formError = false;

            $uibModalInstance.close();

            const createIOUEndpoint = `${apiBaseURL}create-iou?partyName=${modalInstanceETF.form.counterpartyetf}&iouValue=${modalInstanceETF.form.valueetf}`;

            // Create PO and handle success / fail responses.
            $http.put(createIOUEndpoint).then(
                (result) => {
                    modalInstanceETF.displayMessage(result);
                    demoApp.getIOUs();
                },
                (result) => {
                    modalInstanceETF.displayMessage(result);
                }
            );
        }
    };

    modalInstanceETF.displayMessage = (message) => {
        const modalInstanceTwo = $uibModal.open({
            templateUrl: 'messageContent.html',
            controller: 'messageCtrl',
            controllerAs: 'modalInstanceTwo',
            resolve: { message: () => message }
        });

        // No behaviour on close / dismiss.
        modalInstanceTwo.result.then(() => {}, () => {});
    };

    // Close create IOU modal dialogue.
    modalInstanceETF.cancel = () => $uibModalInstance.dismiss();

    // Validate the IOU.
    function invalidFormInput() {
        return isNaN(modalInstanceETF.form.valueetf) || (modalInstanceETF.form.counterpartyetf === undefined);
    }
});

// Controller for success/fail modal dialogue.
app.controller('messageCtrl', function ($uibModalInstance, message) {
    const modalInstanceTwo = this;
    modalInstanceTwo.message = message.data;
});