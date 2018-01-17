package com.cts.hackathon.finblockers.flow;

import com.cts.hackathon.finblockers.state.ETFCreationState;
import com.google.common.collect.ImmutableList;
import net.corda.core.concurrent.CordaFuture;
import net.corda.core.contracts.ContractState;
import net.corda.core.contracts.StateAndRef;
import net.corda.core.contracts.TransactionState;
import net.corda.core.contracts.TransactionVerificationException;
import net.corda.core.transactions.SignedTransaction;
import net.corda.node.internal.StartedNode;
import net.corda.testing.node.MockNetwork;
import net.corda.testing.node.MockNetwork.BasketOfNodes;
import net.corda.testing.node.MockNetwork.MockNode;
import org.junit.After;
import org.junit.Before;
import org.junit.Rule;
import org.junit.Test;
import org.junit.rules.ExpectedException;

import java.util.List;

import static net.corda.testing.CoreTestUtils.setCordappPackages;
import static net.corda.testing.CoreTestUtils.unsetCordappPackages;
import static org.hamcrest.CoreMatchers.instanceOf;
import static org.junit.Assert.assertEquals;

public class ETFCreationFlowTests {
    /*
    private MockNetwork network;
    private StartedNode<MockNode> a;
    private StartedNode<MockNode> b;

    @Before
    public void setup() {
        setCordappPackages("com.cts.hackathon.finblockers.contract");
        network = new MockNetwork();
        BasketOfNodes nodes = network.createSomeNodes(2);
        a = nodes.getPartyNodes().get(0);
        b = nodes.getPartyNodes().get(1);
        // For real nodes this happens automatically, but we have to manually register the flow for tests.
        for (StartedNode<MockNode> node : nodes.getPartyNodes()) {
            node.registerInitiatedFlow(ETFCreationFlow.Acceptor.class);
        }
        network.runNetwork();
    }

    @After
    public void tearDown() {
        unsetCordappPackages();
        network.stopNodes();
    }

    @Rule
    public final ExpectedException exception = ExpectedException.none();

    @Test
    public void flowRejectsInvalidIOUs() throws Exception {
        // The ETFCreationContract specifies that IOUs cannot have negative values.
        ETFCreationFlow.Initiator flow = new ETFCreationFlow.Initiator(-1, b.getInfo().getLegalIdentities().get(0));
        CordaFuture<SignedTransaction> future = a.getServices().startFlow(flow).getResultFuture();
        network.runNetwork();

        // The ETFCreationContract specifies that IOUs cannot have negative values.
        exception.expectCause(instanceOf(TransactionVerificationException.class));
        future.get();
    }

    @Test
    public void signedTransactionReturnedByTheFlowIsSignedByTheInitiator() throws Exception {
        ETFCreationFlow.Initiator flow = new ETFCreationFlow.Initiator(1, b.getInfo().getLegalIdentities().get(0));
        CordaFuture<SignedTransaction> future = a.getServices().startFlow(flow).getResultFuture();
        network.runNetwork();

        SignedTransaction signedTx = future.get();
        signedTx.verifySignaturesExcept(b.getInfo().getLegalIdentities().get(0).getOwningKey());
    }

    @Test
    public void signedTransactionReturnedByTheFlowIsSignedByTheAcceptor() throws Exception {
        ETFCreationFlow.Initiator flow = new ETFCreationFlow.Initiator(1, b.getInfo().getLegalIdentities().get(0));
        CordaFuture<SignedTransaction> future = a.getServices().startFlow(flow).getResultFuture();
        network.runNetwork();

        SignedTransaction signedTx = future.get();
        signedTx.verifySignaturesExcept(a.getInfo().getLegalIdentities().get(0).getOwningKey());
    }

    @Test
    public void flowRecordsATransactionInBothPartiesTransactionStorages() throws Exception {
        ETFCreationFlow.Initiator flow = new ETFCreationFlow.Initiator(1, b.getInfo().getLegalIdentities().get(0));
        CordaFuture<SignedTransaction> future = a.getServices().startFlow(flow).getResultFuture();
        network.runNetwork();
        SignedTransaction signedTx = future.get();

        // We check the recorded transaction in both vaults.
        for (StartedNode<MockNode> node : ImmutableList.of(a, b)) {
            assertEquals(signedTx, node.getServices().getValidatedTransactions().getTransaction(signedTx.getId()));
        }
    }

    @Test
    public void recordedTransactionHasNoInputsAndASingleOutputTheInputIOU() throws Exception {
        Integer iouValue = 1;
        ETFCreationFlow.Initiator flow = new ETFCreationFlow.Initiator(iouValue, b.getInfo().getLegalIdentities().get(0));
        CordaFuture<SignedTransaction> future = a.getServices().startFlow(flow).getResultFuture();
        network.runNetwork();
        SignedTransaction signedTx = future.get();

        // We check the recorded transaction in both vaults.
        for (StartedNode<MockNode> node : ImmutableList.of(a, b)) {
            SignedTransaction recordedTx = node.getServices().getValidatedTransactions().getTransaction(signedTx.getId());
            List<TransactionState<ContractState>> txOutputs = recordedTx.getTx().getOutputs();
            assert (txOutputs.size() == 1);

            ETFCreationState recordedState = (ETFCreationState) txOutputs.get(0).getData();
            assertEquals(recordedState.getValue(), iouValue);
            assertEquals(recordedState.getLender(), a.getInfo().getLegalIdentities().get(0));
            assertEquals(recordedState.getBorrower(), b.getInfo().getLegalIdentities().get(0));
        }
    }

    @Test
    public void flowRecordsTheCorrectIOUInBothPartiesVaults() throws Exception {
        Integer iouValue = 1;
        ETFCreationFlow.Initiator flow = new ETFCreationFlow.Initiator(1, b.getInfo().getLegalIdentities().get(0));
        CordaFuture<SignedTransaction> future = a.getServices().startFlow(flow).getResultFuture();
        network.runNetwork();
        future.get();

        // We check the recorded IOU in both vaults.
        for (StartedNode<MockNode> node : ImmutableList.of(a, b)) {
            node.getDatabase().transaction(it -> {
                    List<StateAndRef<ETFCreationState>> ious = node.getServices().getVaultService().queryBy(ETFCreationState.class).getStates();
                    assertEquals(1, ious.size());
                    ETFCreationState recordedState = ious.get(0).getState().getData();
                    assertEquals(recordedState.getValue(), iouValue);
                    assertEquals(recordedState.getLender(), a.getInfo().getLegalIdentities().get(0));
                    assertEquals(recordedState.getBorrower(), b.getInfo().getLegalIdentities().get(0));
                    return null;
            });
        }
    } */
}