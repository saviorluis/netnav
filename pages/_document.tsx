import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        {/* Preconnect to critical domains */}
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        
        {/* Add critical CSS inline */}
        <style dangerouslySetInnerHTML={{ __html: `
          /* Critical CSS for initial render */
          body {
            display: block;
            margin: 0;
            padding: 0;
            font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
            -webkit-font-smoothing: antialiased;
            -moz-osx-font-smoothing: grayscale;
            background-color: #ffffff;
            color: #171717;
          }
          
          /* Loading indicator */
          #app-loading {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            display: flex;
            align-items: center;
            justify-content: center;
            background: #ffffff;
            z-index: 9999;
          }
          
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
          
          #app-loading-spinner {
            width: 40px;
            height: 40px;
            border: 3px solid #f3f3f3;
            border-top: 3px solid #2563eb;
            border-radius: 50%;
            animation: spin 1s linear infinite;
          }
          
          @media (prefers-color-scheme: dark) {
            body {
              background-color: #0a0a0a;
              color: #ededed;
            }
            
            #app-loading {
              background: #0a0a0a;
            }
            
            #app-loading-spinner {
              border: 3px solid #333;
              border-top: 3px solid #3b82f6;
            }
          }
        ` }} />
      </Head>
      <body>
        {/* Initial loading indicator */}
        <div id="app-loading">
          <div id="app-loading-spinner"></div>
        </div>
        
        <Main />
        
        {/* Optimize script loading */}
        <NextScript />
        
        {/* Inline script to remove loading indicator */}
        <script dangerouslySetInnerHTML={{ __html: `
          document.addEventListener('DOMContentLoaded', function() {
            setTimeout(function() {
              var loadingEl = document.getElementById('app-loading');
              if (loadingEl) {
                loadingEl.style.opacity = '0';
                loadingEl.style.transition = 'opacity 0.3s ease';
                setTimeout(function() {
                  if (loadingEl && loadingEl.parentNode) {
                    loadingEl.parentNode.removeChild(loadingEl);
                  }
                }, 300);
              }
            }, 300);
          });
        ` }} />
      </body>
    </Html>
  );
} 