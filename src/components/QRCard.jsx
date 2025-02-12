import React from "react";
import { QRCode } from "react-qrcode-logo";
import coin from "../assets/coin1.png";

const QrCard = ({value}) => {
    return(
        <div>
            <QRCode 
                value={value}
                size={170}
                bgColor="#ffffff"
                fgColor="#000000"
                logoImage={coin}
                logoWidth={40}
                logoHeight={40}
                removeQrCodeBehindLogo={true}
                logoPadding={0}
                logoPaddingStyle="circle"
                ecLevel="L"
            />
        </div>
    );
}

export default QrCard;