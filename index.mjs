import { loadStdlib } from "@reach-sh/stdlib";
import * as backend from "./build/index.main.mjs";

(async () => {
  const stblib = await loadStdlib(process.env);

  const accountAlice = await stblib.newTestAccount(stblib.parseCurrency(5));
  const accountBob = await stblib.newTestAccount(stblib.parseCurrency(10));

  const contractAlice = accountAlice.deploy(backend);

  //attact contractAlice, The value contractAlice contains no secret information
  //and could easily be printed out and shared with Bob outside of the consensus network.
  const contractBob = accountBob.attach(backend, contractAlice.getInfo());

  await Promise.all([
    backend.Alice(contractAlice, {
      request: stblib.parseCurrency(5),
      info: "I will send you my code",
    }),
    backend.Bob(contractBob, {
      want: (amt) =>
        console.log(`Alice asked Bob for ${stblib.formatCurrency(amt)}`),
      got: (secret) => console.log(`Alice's secret is: ${secret}`),
    }),
  ]);
})();
