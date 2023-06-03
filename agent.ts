import { SocksProxyAgent } from "socks-proxy-agent";
import { JsonRpcProvider } from './packages/providers/lib/index';

const test = async () => {
  // Infura provider URL
  const infuraUrl = "https://goerli.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161";
  // Use Tor Browser User Agent
  const torBrowserAgent = 'Mozilla/5.0 (Windows NT 10.0; rv:91.0) Gecko/20100101 Firefox/91.0';
  // Default tor port for Tor Browser
  const torPort = 1080; // 改成你本的代理的 socks5 的监听端口

  const ethersOptions = {
    url: infuraUrl,
    headers: { 'User-Agent': torBrowserAgent },
    agent: { https: new SocksProxyAgent('socks5h://127.0.0.1:' + torPort) }
  }

  const provider = new JsonRpcProvider(ethersOptions);
  console.log(provider.connection.agent?.https);
  const [ blockNumber, block ] = await Promise.all([
    provider.getBlockNumber(),
    provider.getBlock('latest')
  ]);
  console.log(blockNumber);
  console.log(block);
}
test();

