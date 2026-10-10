/**
 * MenúYa LLM Router - Render entry point
 * Starts free-llm-api-provider proxy on Render's $PORT with API keys from env vars.
 */
const { startProxyServer } = require('free-llm-api-provider/src/proxy');

const port = parseInt(process.env.PORT || '4000', 10);

// Log configured providers (without revealing keys)
const providers = ['GOOGLE_API_KEY', 'GROQ_API_KEY', 'OPENROUTER_API_KEY', 'NVIDIA_API_KEY'];
const configured = providers.filter(k => process.env[k] && process.env[k].length > 10);
console.log(`[router] Providers configured: ${configured.length > 0 ? configured.join(', ') : 'NONE - add API keys as env vars'}`);

const server = startProxyServer(port);

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('[router] SIGTERM received, shutting down');
  server.close(() => process.exit(0));
});
