import Script from "next/script"

/**
 * Tracking — carrega o Google Tag Manager. O Consent Mode v2 (default `denied`)
 * já foi aplicado pelo script inline do layout ANTES daqui, então as tags GA4
 * dentro do GTM respeitam o consentimento. O GA4 e as conversões vivem DENTRO do
 * container GTM (ver gtm-container-ss-log.json). Meta Pixel segue opcional por env.
 * IDs vêm de env; vazios → nada carrega (tracking inerte).
 */
export function Tracking() {
  const gtmId = process.env.NEXT_PUBLIC_GTM_ID
  const pixelId = process.env.NEXT_PUBLIC_META_PIXEL_ID

  return (
    <>
      {gtmId ? (
        <Script id="gtm-init" strategy="afterInteractive">
          {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${gtmId}');`}
        </Script>
      ) : null}

      {pixelId ? (
        <Script id="meta-pixel" strategy="afterInteractive">
          {`!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');try{var c=JSON.parse(localStorage.getItem('sslog_consent_v1')||'null');fbq('consent',c&&c.status==='granted'?'grant':'revoke');}catch(e){fbq('consent','revoke');}fbq('init','${pixelId}');fbq('track','PageView');`}
        </Script>
      ) : null}
    </>
  )
}
