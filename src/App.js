import "@rainbow-me/rainbowkit/styles.css"
import { getDefaultWallets, RainbowKitProvider } from "@rainbow-me/rainbowkit"
import { configureChains, createClient, goerli, WagmiConfig } from "wagmi"
import { mainnet, polygon, filecoin, filecoinHyperspace, polygonMumbai } from "wagmi/chains"
import { alchemyProvider } from "wagmi/providers/alchemy"
import { publicProvider } from "wagmi/providers/public"
import { FileBridge } from "./FileBridge"

function App() {
    const { chains, provider } = configureChains(
        [polygonMumbai, filecoinHyperspace, goerli],
        [alchemyProvider({ apiKey: 'ggKnk6luEblaBVmrztIM8XQeLaS7U3wr' }), publicProvider()]
    )

    const { connectors } = getDefaultWallets({
        appName: "My RainbowKit App",
        chains,
    })

    const wagmiClient = createClient({
        autoConnect: true,
        connectors,
        provider,
    })

    return (
        <WagmiConfig client={wagmiClient}>
            <RainbowKitProvider chains={chains}>
                <FileBridge />
            </RainbowKitProvider>
        </WagmiConfig>
    )
}

export default App
