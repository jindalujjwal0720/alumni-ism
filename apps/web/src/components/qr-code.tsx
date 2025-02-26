import { useIsMobile } from '@/hooks/useIsMobile';
import QRCodeStyling, { Options } from 'qr-code-styling';
import { useEffect, useMemo, useRef } from 'react';

export const QRCode = ({ value }: { value: string }) => {
  const isMobile = useIsMobile();
  const qrCodeRef = useRef<HTMLDivElement>(null);
  const qrCodeOptions = useMemo<Options>(
    () => ({
      width: isMobile ? 160 : 300,
      height: isMobile ? 160 : 300,
      data: value,
      // image: '/centenary/logo.png',
      dotsOptions: {
        // color: '#a00026',
        // type: 'dots',
      },
      cornersSquareOptions: {
        // color: '#193357',
        // type: 'extra-rounded',
      },
      cornersDotOptions: {
        // color: '#193357',
        // type: 'extra-rounded',
      },
    }),
    [value, isMobile],
  );
  const qrCode = useMemo(
    () => new QRCodeStyling(qrCodeOptions),
    [qrCodeOptions],
  );

  useEffect(() => {
    if (qrCodeRef.current) {
      qrCodeRef.current.innerHTML = '';
      qrCode.append(qrCodeRef.current);
    }
  }, [qrCode, qrCodeOptions]);

  return <div ref={qrCodeRef} />;
};
